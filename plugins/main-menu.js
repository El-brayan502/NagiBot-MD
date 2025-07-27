import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises as fsPromises } from 'fs'
import { join } from 'path'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
  try {
    await m.react('⚽️')

    let { exp, bank, registered } = global.db.data.users[m.sender]
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let groupUserCount = m.isGroup ? participants.length : '-'

    let perfil = await conn.profilePictureUrl(conn.user.jid, 'image')
      .catch(() => 'https://qu.ax/eBrxs.jpg')

    // Preparar el tag del usuario
    const userId = m.sender.split('@')[0]
    let taguser = `@${userId}`
    let phone = PhoneNumber('+' + userId)
    let pais = phone.getRegionCode() || 'Desconocido 🌐'

    const vids = [
        'https://n.uguu.se/hyMwbxeR.mp4',
      'https://n.uguu.se/hyMwbxeR.mp4',
      'https://n.uguu.se/hyMwbxeR.mp4'
    ]
    let videoUrl = vids[Math.floor(Math.random() * vids.length)]

    const header = [
      `╔═━★•°*"'*°•★━═╗`,
      `    ✦ ꧁𝐖𝐞𝐥𝐜𝐨𝐦𝐞꧂ ✦`,
      `╚═━★•°*"'*°•★━═╝`
    ].join('\n')

    const user = global.db.data.users[m.sender] || {};
    const country = user.country || '';
    const isPremium = user.premium || false;


    const channelRD = { 
      id: '120363312092804854@newsletter', 
      name: 'NagiBot Oficial channel'
    }


    const metaMsg = {
      quoted: global.fakeMetaMsg,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '𝑵𝑨𝑮𝑰𝑩𝑶𝑻 𝑶𝑭𝑭𝑰𝑪𝑰𝑨𝑳',
          body: '© 𝑃𝑜𝑤𝑒𝑟𝑒𝑑 𝐵𝑦 𝐹𝑎𝑛𝑡𝑜𝑚!',
          mediaUrl: null,
          description: null,
          previewType: "PHOTO",
          thumbnailUrl: 'https://qu.ax/eBrxs.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VbA877dDDmFSafT2xI42',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }

    const body = `
  *👤 Hola* 
  ${taguser}

  *⏱️ Uptime:*
  > ${uptime}

  *👥 En este chat:*
  > ${groupUserCount}

  *🔐 Registrado:* 
  > ${registered ? '✅' : '❌'}

  *【𝕷 𝖎 𝖘 𝖙 𝖆 - 𝕯𝖊 - 𝕮 𝖔 𝖒 𝖆 𝖓 𝖉 𝖔 𝖘】*

┏━━⪩「  ᴍᴇɴᴜ́ ᴘʀɪɴᴄɪᴘᴀʟ 」⪨
┃☆ ${usedPrefix}afk [alasan]  
┃☆ ${usedPrefix}menu  
┃☆ ${usedPrefix}runtime  
┃☆ ${usedPrefix}blocklist  
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「  ɢʀᴜᴘᴏ ᴀᴅᴏʀᴀʙʟᴇ 」⪨
┃☆ ${usedPrefix}lid  
┃☆ ${usedPrefix}invite *<521>*  
┃☆ ${usedPrefix}setemoji *<emoji>*  
┃☆ ${usedPrefix}todos *<mensaje opcional>*  
┗━━━━━━━━━━━━━━━━━⪩
┏━━⪩「  ᴇɴᴇʀɢɪ́ᴀ ꜱᴜᴋɪ 」⪨
┃☆ ${usedPrefix}qr  
┃☆ ${usedPrefix}code  
┃☆ ${usedPrefix}token  
┃☆ ${usedPrefix}sockets  
┃☆ ${usedPrefix}deletesesion  
┃☆ ${usedPrefix}pausarai  
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「  ᴅɪᴠᴇʀꜱɪᴏ́ɴ ᴍᴀ́ɢɪᴄᴀ 」⪨
┃☆ ${usedPrefix}simi  
┃☆ ${usedPrefix}bot  
┃☆ ${usedPrefix}amistad  
┃☆ ${usedPrefix}gay <@tag> | <nombre>  
┃☆ ${usedPrefix}lesbiana <@tag> | <nombre>  
┃☆ ${usedPrefix}pajero <@tag> | <nombre>  
┃☆ ${usedPrefix}pajera <@tag> | <nombre>  
┃☆ ${usedPrefix}puto <@tag> | <nombre>  
┃☆ ${usedPrefix}puta <@tag> | <nombre>  
┃☆ ${usedPrefix}manco <@tag> | <nombre>  
┃☆ ${usedPrefix}manca <@tag> | <nombre>  
┃☆ ${usedPrefix}rata <@tag> | <nombre>  
┃☆ ${usedPrefix}prostituta <@tag> | <nombre>  
┃☆ ${usedPrefix}prostituto <@tag> | <nombre>  
┃☆ ${usedPrefix}chiste  
┃☆ ${usedPrefix}consejo  
┃☆ ${usedPrefix}doxear  
┃☆ ${usedPrefix}doxxing <nombre> | <@tag>  
┃☆ ${usedPrefix}facto  
┃☆ ${usedPrefix}formarpareja  
┃☆ ${usedPrefix}formarpareja5  
┃☆ ${usedPrefix}frase  
┃☆ ${usedPrefix}iqtest  
┃☆ ${usedPrefix}meme  
┃☆ ${usedPrefix}morse *<encode|decode>*  
┃☆ ${usedPrefix}nombreninja *<texto>*  
┃☆ ${usedPrefix}pajeame  
┃☆ ${usedPrefix}personalidad  
┃☆ ${usedPrefix}piropo  
┃☆ ${usedPrefix}pregunta  
┃☆ ${usedPrefix}ship  
┃☆ ${usedPrefix}love  
┃☆ ${usedPrefix}sorteo  
┃☆ ${usedPrefix}top *<texto>*  
┃☆ ${usedPrefix}formartrio @usuario1 @usuario2  
┃☆ ${usedPrefix}zodiac *2002 02 25*  
┃☆ ${usedPrefix}letra *<texto>*  
┗━━━━━━━━━━━━━━━━━⪩


  `.trim()

    // Unir header + body
    const menu = `${header}\n${body}`

    // Configurar datos para el mensaje
    const botname = 'NagiBot Oficial channel'
    const textbot = 'NagiBot Oficial channel'
    const banner = perfil
    const redes = 'https://whatsapp.com/channel/0029VbA877dDDmFSafT2xI42'

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: body,
      gifPlayback: true,
      mentions: [m.sender],  // Agregamos el array de menciones
      ...metaMsg
    })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { 
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender]  // También incluimos menciones en el mensaje de error
    }, { 
      quoted: metaMsg 
    })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú','allmenu','menucompleto']
handler.register = true
export default handler

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}