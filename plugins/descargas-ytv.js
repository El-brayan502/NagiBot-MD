import fetch from "node-fetch";
import yts from "yt-search";
import axios from 'axios';

const VIDEO_THRESHOLD = 70 * 1024 * 1024;
const HEAVY_FILE_THRESHOLD = 100 * 1024 * 1024;
const REQUEST_LIMIT = 3;
const REQUEST_WINDOW_MS = 10000;
const COOLDOWN_MS = 120000;

const requestTimestamps = [];
let isCooldown = false;
let isProcessingHeavy = false;

const isValidYouTubeUrl = (url) => 
  /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(url);

function formatSize(bytes) {
  if (!bytes || isNaN(bytes)) return 'Desconocido';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  bytes = Number(bytes);
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
}

async function getSize(url) {
  try {
    const response = await axios.head(url, { timeout: 10000 });
    const size = parseInt(response.headers['content-length'], 10);
    if (!size) throw new Error('Tamaño no disponible');
    return size;
  } catch (e) {
    throw new Error('No se pudo obtener el tamaño del archivo');
  }
}

async function ytdl(url) {
  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'sec-ch-ua': '"Chromium";v="132", "Not A(Brand";v="8"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    referer: 'https://id.ytmp3.mobi/',
    'referrer-policy': 'strict-origin-when-cross-origin'
  };

  try {
    const initRes = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Date.now()}`, { headers });
    if (!initRes.ok) throw new Error('Fallo al inicializar la solicitud');
    const init = await initRes.json();

    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];
    if (!videoId) throw new Error('ID de video no encontrado');

    const convertRes = await fetch(`${init.convertURL}&v=${videoId}&f=mp4&_=${Date.now()}`, { headers });
    if (!convertRes.ok) throw new Error('Fallo al convertir el video');
    const convert = await convertRes.json();

    let info;
    for (let i = 0; i < 3; i++) {
      const progressRes = await fetch(convert.progressURL, { headers });
      if (!progressRes.ok) throw new Error('Fallo al obtener el progreso');
      info = await progressRes.json();
      if (info.progress === 3) break;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    if (!info || !convert.downloadURL) throw new Error('No se pudo obtener la URL de descarga');
    return { url: convert.downloadURL, title: info.title || 'Video sin título' };
  } catch (e) {
    throw new Error(`Error en la descarga: ${e.message}`);
  }
}

const checkRequestLimit = () => {
  const now = Date.now();
  requestTimestamps.push(now);
  while (requestTimestamps.length > 0 && now - requestTimestamps[0] > REQUEST_WINDOW_MS) {
    requestTimestamps.shift();
  }
  if (requestTimestamps.length >= REQUEST_LIMIT) {
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
      requestTimestamps.length = 0;
    }, COOLDOWN_MS);
    return false;
  }
  return true;
};

const getVideoInfo = async (url) => {
  try {
    const searchByUrl = await yts({ videoId: url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1] });
    if (searchByUrl) return searchByUrl;
    
    const searchGeneral = await yts({ query: url });
    if (searchGeneral.videos.length > 0) return searchGeneral.videos[0];
    
    const searchAdvanced = await yts({ 
      query: url,
      pageStart: 1,
      pageEnd: 3,
      type: 'video'
    });
    if (searchAdvanced.videos.length > 0) return searchAdvanced.videos[0];
    
    throw new Error('No se encontró información del video');
  } catch (e) {
    throw new Error(`Error al buscar el video: ${e.message}`);
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text?.trim()) {
      return conn.reply(m.chat, `🍬 Uso: ${usedPrefix}${command} https://youtu.be/ejemplo`, m, rcanal);
    }

    if (!isValidYouTubeUrl(text)) {
      await m.react('🍬');
      return m.reply('🚫 Enlace de YouTube inválido');
    }

    if (isCooldown || !checkRequestLimit()) {
      await m.react('🍬');
      return conn.reply(m.chat, '⏳ Demasiadas solicitudes rápidas. Por favor, espera 2 minutos.', m, rcanal);
    }
    if (isProcessingHeavy) {
      await m.react('🍬');
      return conn.reply(m.chat, '⏳ Espera, estoy procesando un archivo pesado.', m, rcanal);
    }

    await m.react('📀');
    
    const videoInfo = await getVideoInfo(text);
    if (!videoInfo) throw new Error('No se pudo obtener información del video');
    
    const { title, duration, views, url, thumbnail } = videoInfo;
    const thumb = (await conn.getFile(thumbnail))?.data;

    const infoMessage = `╭─⬣「 *YouTube mp4* 」⬣\n│  ≡◦ *🍭 Título* : ${title}\n│  ≡◦ *📅 Duración* : ${duration}\n│  ≡◦ *🪴 Visitas* : ${formatViews(views)}\n╰─⬣`;

    const sources = [
      async () => {
        try {
          const { url: dlUrl } = await ytdl(text);
          const size = await getSize(dlUrl);
          return { url: dlUrl, size };
        } catch { return null; }
      },
      async () => {
        try {
          const res = await fetch(`https://www.velyn.biz.id/api/downloader/ytmp4?url=${url}`);
          const json = await res.json();
          if (json.data?.dl) return { url: json.data.dl };
        } catch { return null; }
      },
      async () => {
        try {
          const res = await fetch(`https://api.nekorinn.my.id/downloader/savetube?url=${encodeURIComponent(url)}&format=720`);
          const json = await res.json();
          if (json.result?.download?.url) return { url: json.result.download.url };
        } catch { return null; }
      },
      async () => {
        try {
          const res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
          const json = await res.json();
          if (json.downloads?.url) return { url: json.downloads.url };
        } catch { return null; }
      },
      async () => {
        try {
          const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`);
          const json = await res.json();
          if (json.data?.download?.url) return { url: json.data.download.url };
        } catch { return null; }
      }
    ];

    let downloadInfo = null;
    for (const source of sources) {
      downloadInfo = await source();
      if (downloadInfo?.url) break;
    }

    if (!downloadInfo?.url) throw new Error('Todas las fuentes de descarga fallaron');

    const size = downloadInfo.size || await getSize(downloadInfo.url).catch(() => null);
    if (size > HEAVY_FILE_THRESHOLD) {
      isProcessingHeavy = true;
      await conn.reply(m.chat, '😐 Espera, estoy lidiando con un archivo pesado', m, rcanal);
    }

    await m.react('✅️');
    const isSmallVideo = size && size < VIDEO_THRESHOLD;

    await conn.sendMessage(
      m.chat,
      {
        video: { url: downloadInfo.url },
        fileName: `${title}.mp4`,
        mimetype: 'video/mp4',
        caption: infoMessage,
        thumbnail: thumb
      },
      { quoted: m }
    );

    await m.react('⚘️');
    isProcessingHeavy = false;
  } catch (e) {
    await m.react('🍬');
    await m.reply(`❌ Error: ${e.message || 'No se pudo procesar la solicitud'}`);
    isProcessingHeavy = false;
  }
};

function formatViews(views) {
  if (!views) return 'Desconocido';
  if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
  if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
  return views.toString();
}

handler.help = ['ytmp4 <URL>'];
handler.command = ['ytmp4', 'ytv', 'play2'];
handler.tags = ['downloader'];
handler.diamond = true;

export default handler;