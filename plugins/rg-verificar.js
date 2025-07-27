//💥 Código cochino creado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲
//📛 Creador oficial del bot: 👑 Brayan

import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch((_) => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  
  if (user.registered === true) return m.reply(`✘ Ya estás registrado, perr@...\n\n¿Quieres eliminar tu registro y volver a hacerlo?\nUsa *${usedPrefix}unreg*`)

  if (!Reg.test(text)) return m.reply(`❌ Formato incorrecto.\n\nUsa así:\n*${usedPrefix + command} Nombre.edad*\nEjemplo:\n*${usedPrefix + command} ${name2}.20*`)

  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply(`⚠️ El nombre no puede estar vacío.`)
  if (!age) return m.reply(`⚠️ La edad no puede estar vacía.`)
  if (name.length >= 100) return m.reply(`🤨 Nombre muy largo, ¿quieres romperme el sistema?`)
  age = parseInt(age)
  if (age > 1000) return m.reply(`🧓🏼 El bot no admite fantasmas de 1000 años.`)
  if (age < 5) return m.reply(`👶 El bot no es para bebés con pañal.`)

  user.name = name.trim() + '✓'
  user.age = age
  user.regTime = + new Date
  user.registered = true
  user.coin += 40
  user.exp += 300
  user.joincount += 20

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)
  
  let regbot = `╭━〔 *✔ REGISTRO COMPLETADO* 〕━⬣
┃👤 *Nombre:* ${name}
┃🎂 *Edad:* ${age} años
┃🆔 *ID:* ${sn}
┃
┃🎁 *Recompensas:*
┃💰 Coins: +40
┃⭐ XP: +300
┃🎟️ Tokens: +20
╰━━━━━━━━━━━━━━━━━━⬣

👑 *Creador:* Brayan
💻 *Código por:* NeoTokyo Beats
📦 *Sistema Verificado.*`

  await m.react('✅')

  await conn.sendMessage(m.chat, {
    text: regbot,
    contextInfo: {
      externalAdReply: {
        title: '🔥 REGISTRO COMPLETADO 🔥',
        body: 'Bienvenido a la jungla, perr@',
        thumbnailUrl: pp,
        sourceUrl: channel,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler
