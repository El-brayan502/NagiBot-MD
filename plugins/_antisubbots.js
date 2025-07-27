import { areJidsSameUser } from '@whiskeysockets/baileys'

export async function before(m, { participants, conn }) {
  if (!m.isGroup) return

  const chat = global.db.data.chats[m.chat]
  if (!chat.antiBot2) return

  const botJid = global.conn.user.jid // JID del bot principal
  if (botJid === conn.user.jid) return

  const isBotPrincipal = participants.some(p => areJidsSameUser(botJid, p.id))
  if (!isBotPrincipal) return

  setTimeout(async () => {
    await conn.reply(m.chat, 
      `💫 Oye, aquí ya está mi hermanito, el bot principal. No voy a hacerles spam, así que me largo. ¡Nos vemos luego! 👋`, 
      m
    )
    await conn.groupLeave(m.chat)
  }, 5000) // Espera 5 segundos para que lean el mensaje
}
