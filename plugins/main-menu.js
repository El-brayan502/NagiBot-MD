import { xpRange} from '../lib/levelling.js'
import fetch from 'node-fetch'

const channelRD = {
const channelRD = { 
      id: '120363312092804854@newsletter', 
      name: 'Oficial channel Roxy-MD'
    }

const textFancyCaps = text => {
  const charset = {
    a:'ᴀ', b:'ʙ', c:'ᴄ', d:'ᴅ', e:'ᴇ', f:'ꜰ', g:'ɢ',
    h:'ʜ', i:'ɪ', j:'ᴊ', k:'ᴋ', l:'ʟ', m:'ᴍ', n:'ɴ',
    o:'ᴏ', p:'ᴘ', q:'ǫ', r:'ʀ', s:'ꜱ', t:'ᴛ', u:'ᴜ',
    v:'ᴠ', w:'ᴡ', x:'ˣ', y:'ʏ', z:'ᴢ'
}
  return text.toLowerCase().split('').map(c => charset[c] || c).join('')
}

const welcomeBanner = `
╭───⋆｡˚ ❃ ༘ ──╮
┃ sᴜᴋɪ_ʙᴏᴛ⋆.ᴍᴅ ᯓ★┃
╰───⋆｡˚ ❃ ༘ ──╯

💫 ᴅᴏɴᴅᴇ ʟᴀ ᴛᴇʀɴᴜʀᴀ sᴇ ᴄᴏᴍᴀɴᴅᴀ ꒰ෆ꒱
`.trim()

let tags = {
  main: '🌷 ᴍᴇɴᴜ́ ᴘʀɪɴᴄɪᴘᴀʟ',
  group: '🎀 ɢʀᴜᴘᴏ ᴀᴅᴏʀᴀʙʟᴇ',
  serbot: '✨ ᴇɴᴇʀɢɪ́ᴀ ꜱᴜᴋɪ',
  util: '🧃 ꜰᴜɴᴄɪᴏɴᴇꜱ ᴜ́ᴛɪʟᴇꜱ',
  fun: '🎠 ᴅɪᴠᴇʀꜱɪᴏ́ɴ ᴍᴀ́ɢɪᴄᴀ',
  power: '⛩️ ᴘᴏᴅᴇʀ ᴏᴄᴜʟᴛᴏ'
}

const defaultMenu = {
  before: `
${welcomeBanner}

╭── ♡ ɪɴꜰᴏ ᴅᴇ ᴜꜱᴜᴀʀɪᴏ ♡ ──╮
꒰ 💖 Nombre: \`%name\`
꒰ 🌟 Nivel: %level
꒰ ✨ EXP: %exp / %maxexp
꒰ 🔐 Modo: %mode
꒰ 📋 Registros: %totalreg
꒰ ⏳ Activo: %muptime
╰─────────────────────╯
> *🎀 úɴᴇᴛᴇ ᴀʟ ɢʀᴜᴘᴏ ᴏꜰɪᴄɪᴀʟ:* https://chat.whatsapp.com/FoVnxJ64gYV6EZcfNVQUfJ

🍧 ¡Suki está lista para acompañarte, %name!
%readmore`.trimStart(),

  header: '\n🌸 𝒞ᵃᵗᵉᵍᵒʳᶦᵃ: %category\n',
  body: '💮 ⋆ %cmd %iscorazones %isPremium',
  footer: '\n𓆩⟡𓆪',
  after: ''
}

let handler = async (m, { conn, usedPrefix: _p}) => {
  try {
    const { exp = 0, level = 0} = global.db.data.users[m.sender]
    const { min, xp} = xpRange(level, global.multiplier)
    const name = await conn.getName(m.sender)
    const _uptime = process.uptime() * 1000
    const muptime = clockString(_uptime)
    const totalreg = Object.keys(global.db.data.users).length
    const mode = global.opts['self']? '🔒 Privado': '🌍 Público'

    let help = Object.values(global.plugins)
.filter(p =>!p.disabled)
.map(p => ({
        help: Array.isArray(p.help)? p.help: [p.help],
        tags: Array.isArray(p.tags)? p.tags: [p.tags],
        prefix: 'customPrefix' in p,
        limit: p.limit,
        premium: p.premium,
        enabled:!p.disabled
}))

    for (const plugin of help) {
      if (plugin.tags) {
        for (const t of plugin.tags) {
          if (!(t in tags) && t) tags[t] = textFancyCaps(t)
}
}
}

    const { before, header, body, footer, after} = defaultMenu

    const _text = [
      before,
...Object.keys(tags).map(tag => {
        const cmds = help
.filter(menu => menu.tags.includes(tag))
.map(menu =>
            menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix? cmd: _p + cmd)).join('\n')
).join('\n')
        return `${header.replace(/%category/g, tags[tag])}${cmds}${footer}`
}),
      after
    ].join('\n')

    const replace = {
      '%': '%',
      name,
      level,
      exp: exp - min,
      maxexp: xp,
      totalreg,
      mode,
      muptime,
      readmore: String.fromCharCode(8206).repeat(4001)
}

    const text = _text.replace(/%(\w+)/g, (_, key) => replace[key] || '')

    await conn.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/tqtw3t.mp4'},
      caption: text,
      mimetype: 'video/mp4',
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
},
        externalAdReply: {
          title: 'sᴜᴋɪ_ʙᴏᴛ⋆.ᴍᴅ',
          body: '✨ Canal oficial para soñar en código',
          thumbnailUrl: 'https://files.catbox.moe/rkvuzb.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VajUPbECxoB0cYovo60W',
          mediaType: 1,
          renderLargerThumbnail: true
}
}
}, { quoted: m})

} catch (e) {
    console.error('[⚠️] Error en menú Suki:', e)
    conn.reply(m.chat, '🍄 Suki se tropezó en el bosque mágico... ¿probamos de nuevo? 🌷', m)
}
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'suki', 'suki_bot_md']
handler.register = false
export default handler

function clockString(ms) {
  let h = isNaN(ms)? '--': Math.floor(ms / 3600000)
  let m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60
  let s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}