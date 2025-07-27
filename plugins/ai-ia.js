import axios from 'axios'
import fetch from 'node-fetch'

const delay = ms => new Promise(res => setTimeout(res, ms))

const handler = async (m, { conn, usedPrefix, command, text }) => {
  const emoji = '🧠'
  const emoji2 = '⌛'
  const rwait = '⌛'
  const done = '✅'
  const error = '❌'
  const msm = '🦾 NagiBot:'

  const botname = global.botname || 'NagiBot'
  const etiqueta = 'Brayan, mi creador'
  const vs = global.vs || '1.0'
  const username = conn.getName(m.sender)

  const isQuotedImage = m.quoted && (m.quoted.msg || m.quoted).mimetype?.startsWith('image/')

  const basePrompt = `Mi nombre es ${botname}, fui creado por ${etiqueta}. Estoy en la versión ${vs}. Hablo Español. Siempre te llamo por tu nombre: ${username}. Me gusta mantener la onda relajada, soy directo, inteligente, con sentido del humor, y siempre listo para ayudarte.`

  if (isQuotedImage) {
    try {
      const q = m.quoted
      const img = await q.download?.()
      if (!img) {
        console.error(`${msm} No pude descargar la imagen.`)
        return conn.reply(m.chat, `${error} Ey, no pude bajar esa imagen. ¿Me la mandás otra vez?`, m)
      }

      const content = `${emoji} A ver... ¿Qué hay en esta imagen?`
      const imageAnalysis = await fetchImageBuffer(content, img)

      const query = `${emoji} Describí la imagen, explicá por qué actúan así y recordame quién sos vos.`
      const prompt = `${basePrompt} Esta es la descripción de la imagen: ${imageAnalysis.result}`

      const description = await luminsesi(query, username, prompt)
      await conn.reply(m.chat, description, m)
    } catch (e) {
      await m.react(error)
      await conn.reply(m.chat, `${error} No pude analizar la imagen, pero tranqui, no soy perfecto.`, m)
      console.error(`${msm} Error analizando imagen:`, e)
    }
  } else {
    if (!text) {
      return conn.reply(m.chat, `${emoji} Decime qué querés saber, no leo mentes... todavía.`, m)
    }

    await m.react(rwait)

    try {
      const { key } = await conn.sendMessage(
        m.chat,
        { text: `${emoji2} Estoy pensando, dame un toquecito...` },
        { quoted: m }
      )

      const query = text
      const prompt = `${basePrompt} Respondé con toda la actitud esta pregunta: ${query}`
      const response = await luminsesi(query, username, prompt)

      await conn.sendMessage(m.chat, { text: response, edit: key })
      await m.react(done)
    } catch (e) {
      await m.react(error)
      await conn.reply(m.chat, `${error} Uy, esa me dejó en blanco... No la pude responder.`, m)
      console.error(`${msm} Error respondiendo pregunta:`, e)
    }
  }
}

handler.help = ['ia', 'chatgpt', 'luminai']
handler.tags = ['ai']
handler.register = true
handler.command = ['ia', 'chatgpt', 'luminai']
handler.group = true

export default handler

// Función para enviar la imagen y obtener análisis
async function fetchImageBuffer(content, imageBuffer) {
  try {
    const response = await axios.post(
      'https://Luminai.my.id',
      {
        content,
        imageBuffer: imageBuffer.toString('base64'),
      },
      { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data
  } catch (error) {
    console.error('Error fetchImageBuffer:', error)
    throw error
  }
}

// Función para interactuar con la IA usando prompts
async function luminsesi(q, username, prompt) {
  try {
    const response = await axios.post('https://Luminai.my.id', {
      content: q,
      user: username,
      prompt: prompt,
      webSearchMode: false,
    })
    return response.data.result
  } catch (error) {
    console.error('Error luminsesi:', error)
    throw error
  }
        }
