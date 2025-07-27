import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = '' //Ejemplo: +573218138672
global.confirmCode = ''

// Aquí defines los LID owners (IDs con sufijo @lid):
 

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.owner = [
  ['573001533523', '👑 𝗢𝗪𝗠𝗘𝗥 𝗕𝗥𝗔𝗬𝗔𝗡', true],
  ['50248019799', '🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲', true],
  ['35855125204999@lid', 'Fantom', true],
  ['236391074132098@lid', '🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲', true],
];
//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.mods = ['573001533523', '50248019799']
global.suittag = ['573001533523', '50248019799'] 
global.prems = ['573001533523', '50248019799']

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.libreria = 'Baileys'
global.baileys = 'V 6.7.9' 
global.languaje = 'Español'
global.vs = '2.2.0'
global.vsJB = '5.0'
global.nameqr = 'NagiBot'
global.namebot = 'TheNagi'
global.sessions = 'sessions'
global.jadi = 'jadibts' 
global.NakanoJadibts = true

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.packname = 'Eʟ Mᴇᴊᴏʀ Bᴏᴛ ᴅᴇ WʜᴀᴛsAᴘᴘ'
global.botname = '⚽◌*̥₊ NᴀɢɪBᴏᴛ-ᴍᴅ ◌❐🎋༉'
global.wm = '© ᗷᖇᗩYᗩᑎ ᑕᖇᗴᗩᗪOᖇ'
global.wm3 = '⫹⫺  ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ'
global.author = 'Made By DevBrayan'
global.dev = '© 𝚙𝚘𝚠𝚎𝚛𝚎𝚍 𝙱𝚢 𝙱𝚛𝚊𝚢𝚊𝚗'
global.textbot = 'Nᴀɢɪ Sᴇsʜɪʀᴏ V4'
global.etiqueta = '@DevBrayan'
global.titulowm = 'Whatsapp Multi Device';
global.titulowm2 = 'ᑎᗩᘜI ᗷY ᗪᗴᐯᗷᖇᗩYᗩᑎ'
global.igfg = '@DevBrayan'
global.gt = '© ᥴrᥱᥲ𝗍ᥱძ ᑲᥡ ძᥱvᏰrᥲყᥲᥒ';
global.me = 'Ᏸrᥲყᥲᥒ 𝗍ᥙ ⍴ᥲ⍴ᥲі 🫵😒';
global.listo = '*⚽️ Aqui tienes xD*'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.namabot = '⫹⫺  ᴍᴅ'
global.v = '-'   
global.eror = "_ubo un error _"
global.lopr = "🅟"
global.lolm = "Ⓛ"
global.dmenut = "✦ ───『"
global.dmenub = "│➭" 
global.dmenub2 = "│乂"
global.dmenuf = "╰━━━━━━━━┈─◂"
global.cmenut = "⫹⫺ ───『"
global.cmenuh = "』─── ⬟"
global.cmenub = "│〆"
global.cmenuf = "╰━━━━━━━━┈─◂"
global.cmenua = "\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     "
global.dashmenu = "✧────···[ *Dashboard* ]···────✧"
global.htki = '––––––『'
global.htka = '』––––––'
global.htjava = "⫹⫺"
global.comienzo = "• • ◕◕════"
global.fin = " • •"

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.moneda = 'Motoko Points'
global.banner = 'https://qu.ax/HPDvl.jpg'
global.avatar = 'https://files.cloudkuimages.guru/images/PbmZRkdU.jpg'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

let catalogo2;
try {
  catalogo2 = fs.readFileSync('./src/catalogo.jpg');
} catch (error) {
  console.log('Warning: ./src/catalogo.jpg not found, using catalogo as fallback');
  catalogo2 = catalogo; // Using the existing 'catalogo' variable as fallback
}
global.photoSity = [catalogo2]

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.gp1 = 'https://chat.whatsapp.com/GDUv1z6UG0k2xe8zAEUnFf';
global.comunidad1 = 'https://chat.whatsapp.com/GDUv1z6UG0k2xe8zAEUnFf';
global.channel = 'https://chat.whatsapp.com/GDUv1z6UG0k2xe8zAEUnFf';
global.channel2 = 'https://chat.whatsapp.com/GDUv1z6UG0k2xe8zAEUnFf';
global.md = 'https://chat.whatsapp.com/GDUv1z6UG0k2xe8zAEUnFf';
global.correo = 'davi.zuni.17@gmail.com';
global.cn = 'https://chat.whatsapp.com/GDUv1z6UG0k2xe8zAEUnFf';
global.instagram = 'https://chat.whatsapp.com/GDUv1z6UG0k2xe8zAEUnFf';
global.whatsApp = 'https://chat.whatsapp.com/GDUv1z6UG0k2xe8zAEUnFf';
global.correo = 'davi.zuni.17@gmail.com';

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.pdoc = ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/msword", "application/pdf", "text/rtf"]

global.ch = {
  ch1: '120363400595401085@newsletter',
  ch2: '120363400595401085@newsletter',
  ch3: '120363400595401085@newsletter',
  ch4: '120363400595401085@newsletter',
  ch5: '120363400595401085@newsletter',
  ch6: '120363400595401085@newsletter',
  ch7: '120363400595401085@newsletter'
}

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.BASE_API_DELIRIUS = "https://delirius-apiofc.vercel.app";
global.BASE_API_SKYNEX = "https://skynex.boxmine.xyz";

global.shizokeys = 'shizo';
global.MyApiRestBaseUrl = 'https://api.cafirexos.com';
global.MyApiRestApikey = 'BrunoSobrino';
global.fgkeysapi = "elrebelde21";
global.openai_org_id = 'org-3';
global.openai_key = 'sk-0';
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f'];
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())];
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())];
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())];
global.lolkeysapi = ['kurumi']; // ['BrunoSobrino_2']
global.itsrose = ['4b146102c4d500809da9d1ff'];

global.apis = 'https://delirius-apiofc.vercel.app';

global.APIs = {
  ryzen: 'https://api.ryzendesu.vip',
  ApiEmpire: 'https://api-brunosobrino.zipponodes.xyz',
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  neoxr: 'https://api.neoxr.my.id',
  delirius: 'https://delirius-apiofc.vercel.app',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs',
  rose: 'https://api.itsrose.site',
  popcat: 'https://api.popcat.xyz',
  xcoders: 'https://api-xcoders.site',
  vihangayt: 'https://vihangayt.me',
  erdwpe: 'https://api.erdwpe.com',
  xyroinee: 'https://api.xyroinee.xyz',
  nekobot: 'https://nekobot.xyz'
},
global.APIKeys = {
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': 'GataDios',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.fgmods.xyz': `${fgkeysapi}`,
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren',
  'https://api.xyroinee.xyz': 'uwgflzFEh6'
};

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   


global.multiplier = 69
global.maxwarn = '3'

//✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
export default {
  owner: global.owner,
  mods: global.mods,
  suittag: global.suittag,
  prems: global.prems,
  libreria: global.libreria,
  baileys: global.baileys,
  languaje: global.languaje,
  vs: global.vs,
  vsJB: global.vsJB,
  nameqr: global.nameqr,
  namebot: global.namebot,
  sessions: global.sessions,
  jadi: global.jadi,
  NakanoJadibts: global.NakanoJadibts,
  packname: global.packname,
  botname: global.botname,
  wm: global.wm,
    wm3: global.wm3
  }
