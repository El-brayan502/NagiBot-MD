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
  `[ 𝗢 𝗪 𝗡 𝗘 𝗥 - U S E R ]`  
> 𖥔 ︳*Hola: ${taguser}*
> 𖥔 ︳*ɴɪᴠᴇʟ: %level*
> 𖥔 ︳ *ᴇxᴘ: %exp*
> 𖥔 ︳ *ᴇɴ ᴇsᴛᴇ ᴄʜᴀᴛ: ${groupUserCount}*
> 𖥔 ︳ *ʀᴇɢɪsᴛʀᴀᴅᴏ: ${registered ? '✅' : '❌'}*

 `[ 𝗜 𝗡 𝗙 𝗢 - 𝗕 𝗢 𝗧 ]`=
> ║◦ɴᴏᴍʙʀᴇ ᴅᴇʟ ʙᴏᴛ: *ɴᴀɢɪ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ*  
> ║◦ʀᴜɴᴛɪᴍᴇ: *${uptime}*
> ║◦ᴏᴡɴᴇʀ: *ʙʀᴀʏᴀɴ*  
> ║◦ᴍᴏᴅᴏ: *ᴘᴜʙʟɪᴄ*  
> ║◦ᴛᴏᴛᴀʟ ᴜsᴇʀs:  *%totalreg*
> ║◦ᴛᴏᴛᴀʟ ᴘᴇɴɢɢᴜɴᴀ: *519*  

*【𝕷 𝖎 𝖘 𝖙 𝖆 - 𝕯𝖊 - 𝕮 𝖔 𝖒 𝖆 𝖓 𝖉 𝖔 𝖘】*

╭──── `ᴍᴇɴᴜ ᴘʀɪɴᴄɪᴘᴀʟ` ────╮  
├ ${usedPrefix}afk [alasan] 
├ ${usedPrefix}menu  
├ ${usedPrefix}runtime  
├ ${usedPrefix}blocklist  
├ ${usedPrefix}clima <ciudad>  
├ ${usedPrefix}hd  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ɪɴғᴏ` ────╮  
├ ${usedPrefix}editautoresponder  
├ ${usedPrefix}owner  
├ ${usedPrefix}dash  
├ ${usedPrefix}dashboard  
├ ${usedPrefix}views  
├ ${usedPrefix}database  
├ ${usedPrefix}usuarios  
├ ${usedPrefix}user  
├ ${usedPrefix}ds  
├ ${usedPrefix}fixmsgespera  
├ ${usedPrefix}estado  
├ ${usedPrefix}grupos  
├ ${usedPrefix}newcommand  
├ ${usedPrefix}ping  
├ ${usedPrefix}reportar  
├ ${usedPrefix}sistema  
├ ${usedPrefix}speed  
├ ${usedPrefix}speedtest  
├ ${usedPrefix}horario  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ɢʀᴜᴘᴏ 2` ────╮  
├ ${usedPrefix}lid  
├ ${usedPrefix}invite *<521>*  
├ ${usedPrefix}setemoji *<emoji>*  
├ ${usedPrefix}todos *<mensaje opcional>*  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ᴊáᴅɪʙᴏᴛ` ────╮  
├ ${usedPrefix}qr  
├ ${usedPrefix}code  
├ ${usedPrefix}token  
├ ${usedPrefix}sockets  
├ ${usedPrefix}deletesesion  
├ ${usedPrefix}pausarai  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ғᴜɴ` ────╮  
├ ${usedPrefix}simi  
├ ${usedPrefix}bot  
├ ${usedPrefix}amistad  
├ ${usedPrefix}gay <@tag> | <nombre>  
├ ${usedPrefix}lesbiana <@tag> | <nombre>  
├ ${usedPrefix}pajero <@tag> | <nombre>  
├ ${usedPrefix}pajera <@tag> | <nombre>  
├ ${usedPrefix}puto <@tag> | <nombre>  
├ ${usedPrefix}puta <@tag> | <nombre>  
├ ${usedPrefix}manco <@tag> | <nombre>  
├ ${usedPrefix}manca <@tag> | <nombre>  
├ ${usedPrefix}rata <@tag> | <nombre>  
├ ${usedPrefix}prostituta <@tag> | <nombre>  
├ ${usedPrefix}prostituto <@tag> | <nombre>  
├ ${usedPrefix}chiste  
├ ${usedPrefix}consejo  
├ ${usedPrefix}doxear  
├ ${usedPrefix}doxxing <nombre> | <@tag>  
├ ${usedPrefix}facto  
├ ${usedPrefix}formarpareja  
├ ${usedPrefix}formarpareja5  
├ ${usedPrefix}frase  
├ ${usedPrefix}iqtest  
├ ${usedPrefix}meme  
├ ${usedPrefix}morse *<encode|decode>*  
├ ${usedPrefix}nombreninja *<texto>*  
├ ${usedPrefix}pajeame  
├ ${usedPrefix}personalidad  
├ ${usedPrefix}piropo  
├ ${usedPrefix}pregunta  
├ ${usedPrefix}ship  
├ ${usedPrefix}love  
├ ${usedPrefix}sorteo  
├ ${usedPrefix}top *<texto>*  
├ ${usedPrefix}formartrio @usuario1 @usuario2  
├ ${usedPrefix}zodiac *2002 02 25*  
├ ${usedPrefix}letra *<texto>*  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ᴅʟ` ────╮  
├ ${usedPrefix}pinterest  
├ ${usedPrefix}tiktokmp3 <url>  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `+18` ────╮  
├ ${usedPrefix}pornhubsearch  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ᴛʀᴀɴsғᴏʀᴍᴀᴅᴏʀ` ────╮  
├ ${usedPrefix}tourl2  
├ ${usedPrefix}togifaud  
├ ${usedPrefix}tovideo  
├ ${usedPrefix}tts <lang> <texto>  
┗━━━━━━━━━━━━━━━━━⪩
╭──── `ᴅᴏᴡɴʟᴏᴀᴅᴇʀ` ────╮  
├ ${usedPrefix}spotify  
├ ${usedPrefix}music  
├ ${usedPrefix}tiktokdl <url>  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ɢᴀᴍᴇ` ────╮  
├ ${usedPrefix}ahorcado  
├ ${usedPrefix}ppt  
├ ${usedPrefix}delttt  
├ ${usedPrefix}math <modo>  
├ ${usedPrefix}sopa  
├ ${usedPrefix}buscarpalabras  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ᴍᴇᴍᴜ ɢʀᴜᴘᴏ` ────╮  
├ ${usedPrefix}admins <texto>  
├ ${usedPrefix}group open / close  
├ ${usedPrefix}grupo abrir / cerrar  
├ ${usedPrefix}delete  
├ ${usedPrefix}demote  
├ ${usedPrefix}encuesta <texto|opción>  
├ ${usedPrefix}groupdesc <texto>  
├ ${usedPrefix}gruponame <texto>  
├ ${usedPrefix}hidetag  
├ ${usedPrefix}infogrupo  
├ ${usedPrefix}kick  
├ ${usedPrefix}link  
├ ${usedPrefix}listadv  
├ ${usedPrefix}promote  
├ ${usedPrefix}revoke  
├ ${usedPrefix}bot  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ᴏᴡɴᴇʀ` ────╮  
├ ${usedPrefix}listonline  
├ ${usedPrefix}addcoins @usuario  
├ ${usedPrefix}addprem  
├ ${usedPrefix}delprem  
├ ${usedPrefix}autoadmin  
├ ${usedPrefix}copia  
├ ${usedPrefix}broadcastgroup  
├ ${usedPrefix}bcgc  
├ ${usedPrefix}chetar @usuario  
├ ${usedPrefix}chetar <número>  
├ ${usedPrefix}cleanfiles  
├ ${usedPrefix}cleartmp  
├ ${usedPrefix}deletefile  
├ ${usedPrefix}deschetar @usuario  
├ ${usedPrefix}deschetar <número>  
├ ${usedPrefix}dsowner  
├ >  
├ =>  
├ $  
├ ${usedPrefix}getplugin  
├ ${usedPrefix}groups  
├ ${usedPrefix}grouplist  
├ ${usedPrefix}invite  
├ ${usedPrefix}prefix [prefijo]  
├ ${usedPrefix}quitarcoin @usuario  
├ ${usedPrefix}quitarcoin all  
├ ${usedPrefix}quitarxp @usuario  
├ ${usedPrefix}resetprefix  
├ ${usedPrefix}restart  
├ ${usedPrefix}reunion  
├ ${usedPrefix}meeting  
├ ${usedPrefix}savefile ruta/nombre  
├ ${usedPrefix}saveplugin  
├ ${usedPrefix}setcmd <texto>  
├ ${usedPrefix}setimage  
├ ${usedPrefix}setstatus <texto>  
├ ${usedPrefix}spam2  
├ ${usedPrefix}update  
├ ${usedPrefix}actualizar  
├ ${usedPrefix}codigo <coins>  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ᴍᴏᴅs` ────╮  
├ ${usedPrefix}banuser @usuario razón  
├ ${usedPrefix}grupocrear <nombre>  
├ ${usedPrefix}unbanuser @usuario  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ʀɢ` ────╮  
├ ${usedPrefix}confesar <número>  
├ ${usedPrefix}delbirth  
├ ${usedPrefix}deldescription  
├ ${usedPrefix}delgenre  
├ ${usedPrefix}marry @usuario  
├ ${usedPrefix}divorce  
├ ${usedPrefix}profile  
├ ${usedPrefix}respuesta <id mensaje>  
├ ${usedPrefix}premium  
├ ${usedPrefix}setdescription  
├ ${usedPrefix}setgenre  
├ ${usedPrefix}unreg  
├ ${usedPrefix}reg  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ʀɢᴘ` ────╮  
├ ${usedPrefix}lb  
├ ${usedPrefix}levelup  
├ ${usedPrefix}lvl @usuario  
├ ${usedPrefix}aventura  
├ ${usedPrefix}adventure  
├ ${usedPrefix}baltop  
├ ${usedPrefix}bal  
├ ${usedPrefix}berburu  
├ ${usedPrefix}cofre  
├ ${usedPrefix}daily  
├ ${usedPrefix}claim  
├ ${usedPrefix}depositar  
├ ${usedPrefix}explorar  
├ ${usedPrefix}gremio  
├ ${usedPrefix}halloween  
├ ${usedPrefix}heal  
├ ${usedPrefix}inventario  
├ ${usedPrefix}inv  
├ ${usedPrefix}monthly  
├ ${usedPrefix}navidad  
├ ${usedPrefix}christmas  
├ ${usedPrefix}retirar  
├ ${usedPrefix}rob  
├ ${usedPrefix}slut  
├ ${usedPrefix}pay  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ᴇᴄᴏɴᴏᴍɪᴀ` ────╮  
├ ${usedPrefix}canjear <código>  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `ᴇᴄᴏɴᴏᴍʏ` ────╮  
├ ${usedPrefix}wallet  
├ ${usedPrefix}apostar <cantidad>  
├ ${usedPrefix}cf  
├ ${usedPrefix}crimen  
├ ${usedPrefix}minar  
├ ${usedPrefix}rob  
├ ${usedPrefix}ruleta <cantidad> <color>  
├ ${usedPrefix}buy  
├ ${usedPrefix}buyall  
├ ${usedPrefix}trabajar  
╰─❒━━━━━━━━━━━❒─╯ 

╭──── `sᴛɪᴄᴋᴇʀ` ────╮  
├ ${usedPrefix}brat <texto>  
├ ${usedPrefix}emojimix 😎+🥶  
├ ${usedPrefix}pfp @usuario  
├ ${usedPrefix}qc  
├ ${usedPrefix}stiker <imagen>  
├ ${usedPrefix}sticker <url>  
├ ${usedPrefix}toimg  
╰─❒━━━━━━━━━━━❒─╯ 
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
