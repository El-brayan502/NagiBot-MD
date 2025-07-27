//codigos creado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 para Nagi bot 

const handler = async (m, { isPrems, conn }) => {
  const user = global.db.data.users[m.sender]
  if (!user) throw `${emoji4} Usuario no encontrado.`;

  const permitidos = ['50248019799@s.whatsapp.net', '573001533523@s.whatsapp.net'] // ← Cambia a los 2 números que quieras sin espera

  const sinEspera = permitidos.includes(m.sender)

  if (!sinEspera) {
    const lastCofreTime = user.lastcofre || 0
    const timeToNextCofre = lastCofreTime + 86400000

    if (Date.now() < timeToNextCofre) {
      const tiempoRestante = timeToNextCofre - Date.now()
      const mensajeEspera = `${emoji3} Ya reclamaste tu cofre\n⏰️ Regresa en: *${msToTime(tiempoRestante)}* para volver a reclamar.`
      await conn.sendMessage(m.chat, { text: mensajeEspera }, { quoted: m })
      return
    }
  }

  const img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557947304.jpeg'
  const dia = Math.floor(Math.random() * 100)
  const tok = Math.floor(Math.random() * 10)
  const ai = Math.floor(Math.random() * 40)
  const expp = Math.floor(Math.random() * 5000)

  user.coin += dia
  user.diamonds += ai
  user.joincount += tok
  user.exp += expp
  user.lastcofre = Date.now()

  const texto = `
╭─「 *📦 Cofre Aleatorio* 」─⬣
│🥂 ¡Felicidades guapo(a)!
│🤑 Ganaste recursos calientes:
╰──────────────⬣

💸 *${dia} ${moneda}*
⚜️ *${tok} Tokens*
💎 *${ai} Diamantes*
✨ *${expp} Exp*

🍀 Recolecta cada día para subir de nivel.

👑 Desarrollado por 🐉𝙉𝙚𝙤𝙏𝙤𝙆𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲  
💻 Código creado por Brayan 🔥
`

  try {
    await conn.sendFile(m.chat, img, 'cofre.jpg', texto, fkontak)
  } catch (error) {
    throw `${msm} Ocurrió un error al enviar el cofre.`
  }
}

handler.help = ['cofre']
handler.tags = ['rpg']
handler.command = ['cofre']
handler.level = 5
handler.group = true
handler.register = true

export default handler

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60)
  let minutes = Math.floor((duration / (1000 * 60)) % 60)
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? '0' + hours : hours
  minutes = (minutes < 10) ? '0' + minutes : minutes
  seconds = (seconds < 10) ? '0' + seconds : seconds

  return `${hours} Horas ${minutes} Minutos`
    }
