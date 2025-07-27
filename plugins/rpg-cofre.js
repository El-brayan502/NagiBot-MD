//codigos creado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 para Nagi Bot 

const handler = async (m, { conn }) => {
  const userId = m.sender;
  const isOwner = [ // Lista de owners
    '573001533523@s.whatsapp.net', // Brayan
    '50248019799@s.whatsapp.net',  // Tú
  ].includes(userId);

  if (!global.db.data.users[userId]) {
    throw `❌ No estás registrado aún en el sistema. Usa *#reg nombre.edad* para comenzar.`;
  }

  const user = global.db.data.users[userId];
  const ahora = Date.now();
  const esperaFija = 23 * 60 * 60 * 1000 + 59 * 60 * 1000; // 23h 59min
  const tiempoUltimo = user.lastcofre || 0;

  if (!isOwner && ahora - tiempoUltimo < esperaFija) {
    const tiempoRestante = esperaFija - (ahora - tiempoUltimo);
    const mensajeEspera = `✨️ Ya reclamaste tu cofre\n⏰️ Regresa en: *${msToTime(tiempoRestante)}* para volver a reclamar.`;
    return await conn.reply(m.chat, mensajeEspera, m);
  }

  const coins = getRandom(100, 300);
  const tokens = getRandom(1, 15);
  const diamantes = getRandom(5, 50);
  const exp = getRandom(300, 9000);

  user.coin += coins;
  user.joincount += tokens;
  user.diamonds += diamantes;
  user.exp += exp;
  if (!isOwner) user.lastcofre = ahora;

  const mensaje = `
╭━〔 🧧 Cσϝɾҽ Aʅҽαƚσɾισ 〕━⬣
┃📦 *¡Cofre abierto con éxito!*
┃✨ ¡Premios reclamados!  
╰━━━━━━━━━━━━⬣

💸 *Monedas:* ${coins}
⚜️ *Tokens:* ${tokens}
💎 *Diamantes:* ${diamantes}
📈 *EXP:* ${exp}

${isOwner ? '👑 Eres owner, puedes reclamar sin límites.' : '🔄 Disponible nuevamente en *23h 59min*'}
`;

  const imagen = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557947304.jpeg';
  await conn.sendFile(m.chat, imagen, 'cofre.jpg', mensaje, m);
};

handler.help = ['cofre'];
handler.tags = ['rpg'];
handler.command = ['cofre'];
handler.group = true;
handler.register = true;

export default handler;

// Funciones auxiliares
function msToTime(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h} Horas ${m} Minutos`;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
