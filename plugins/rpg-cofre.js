//codigos creado por 🐉𝙉𝙚𝙤𝙏𝙤𝙠𝙮𝙤 𝘽𝙚𝙖𝙩𝙨🐲 para Nagi Bot 

const handler = async (m, { isPrems, conn }) => {
  const ownerJids = [
    '50248019799@s.whatsapp.net', // Tu número
    '573001533523@s.whatsapp.net' // Brayan (creador del bot)
  ];

  if (!global.db.data.users[m.sender]) {
    throw `⚠️ Usuario no encontrado.`;
  }

  const user = global.db.data.users[m.sender];
  const now = Date.now();
  const cooldown = 86400000; // 24 horas
  const last = user.lastcofre || 0;

  // Si NO es owner, aplicar cooldown
  if (!ownerJids.includes(m.sender) && (now - last < cooldown)) {
    const restante = cooldown - (now - last);
    return conn.sendMessage(m.chat, {
      text: `🐈 Ya reclamaste tu cofre\n⏰️ Regresa en: *${msToTime(restante)}* para volver a reclamar.`,
      quoted: m
    });
  }

  // Recompensas aleatorias
  const img = 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745557947304.jpeg';
  const yenes = Math.floor(Math.random() * 30);
  const tokens = Math.floor(Math.random() * 10);
  const coins = Math.floor(Math.random() * 4000);
  const exp = Math.floor(Math.random() * 5000);

  user.dragones = (user.dragones || 0) + yenes;
  user.money = (user.money || 0) + coins;
  user.joincount = (user.joincount || 0) + tokens;
  user.exp = (user.exp || 0) + exp;
  user.lastcofre = now;

  const texto = `
╭━〔 ${global.botname} 〕⬣
┃🧰 *Obtienes Un Cofre* 🎁
┃ ¡Felicidades!
╰━━━━━━━━━━━━⬣

*💴 ${yenes} yenes*
*⚜️ ${tokens} Tokens*
*🪙 ${coins} Coins*
*✨ ${exp} Exp*`;

  try {
    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: texto
    }, { quoted: m });
  } catch (e) {
    console.error('❌ Error al enviar imagen:', e);
    throw '⚠️ Ocurrió un error al enviar el cofre.';
  }
};

handler.help = ['cofre'];
handler.tags = ['rpg'];
handler.command = ['cofre'];
handler.level = 5;
handler.group = false;
handler.register = true;

export default handler;

function msToTime(duration) {
  const hours = Math.floor(duration / 3600000);
  const minutes = Math.floor((duration % 3600000) / 60000);
  return `${hours} Horas ${minutes} Minutos`;
}
