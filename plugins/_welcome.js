import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  // Solo grupos y stub events
  if (!m.messageStubType || !m.isGroup) return true

  // Constantes de stub
  const ADDED   = 27
  const REMOVED = 28
  const DEMOTED = 32

  const stub = m.messageStubType
  // El JID real del usuario que entra/sale
  const jidParam = m.messageStubParameters[0]
  const numParam = jidParam.split('@')[0]

  // Preparamos el contacto para quotear
  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        vcard:
          `BEGIN:VCARD\n` +
          `VERSION:3.0\n` +
          `N:Sy;Bot;;;\n` +
          `FN:y\n` +
          `item1.TEL;waid=${numParam}:${numParam}\n` +
          `item1.X-ABLabel:Ponsel\n` +
          `END:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  }

  // Foto de perfil del que entra/sale
  let pp = await conn.profilePictureUrl(jidParam, 'image')
    .catch(_ => 'https://loli-roxy.neocities.org/nagi-subs.jpg')
  let img = await (await fetch(pp)).buffer()

  // Recalculamos tamaño de grupo
  let groupSize = participants.length
  if (stub === ADDED)   groupSize++
  if (stub === REMOVED || stub === DEMOTED) groupSize--

  // Solo si está activada la bienvenida
  let chat = global.db.data.chats[m.chat]
  if (!chat.welcome) return true

  // Bienvenida
  if (stub === ADDED) {
    const title = 'ゲ◜៹ New Member ៹◞ゲ'
    const text  =
      `👋 Hasta pronto, no te extrañaremos XD!!*\n*━━━━━━━━━━━━━━━━*\n\n🐢 *• Nombre:* @${numParam}\n🎋 *• Bio:* https://loli-roxy.neocities.org/\n🕒 *• Grupo:* _${groupMetadata.subject}_ \n🗓️ *• Fecha:* ${fecha}\n\n- *Salúdame a Maradona bro* -`
    await conn.sendMini(
      m.chat,
      title,
      dev,
      text,
      img,
      img,
      redes,
      fkontak
    )
  }

  // Despedida
  if (stub === REMOVED || stub === DEMOTED) {
    const title = 'ゲ◜៹ Bye Member ៹◞ゲ'
    const text  =
      `❀ *Adiós* de _${groupMetadata.subject}_\n` +
      `✰ @${numParam}\n` +
      `${global.welcom2}\n` +
      `✦ Ahora somos *${groupSize}* miembros.\n` +
      `•(=^●ω●^=)• ¡Te esperamos pronto!\n` +
      `> ✐ Usa *#help* para ver los comandos.`
    await conn.sendMini(
      m.chat,
      title,
      dev,
      text,
      img,
      img,
      redes,
      fkontak
    )
  }

  return true
}
