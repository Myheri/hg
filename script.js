// public/script.js
document.getElementById('form-agendamento').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;

  const resposta = await fetch('/agendar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, data, hora })
  });

  const resultado = await resposta.json();
  
  if (resultado.ok) {
    const msg = `Olá, meu nome é ${nome} e gostaria de confirmar meu agendamento para ${data} às ${hora}.`;
    const whatsappURL = `https://wa.me/55SEUNUMERO?text=${encodeURIComponent(msg)}`;
    window.location.href = whatsappURL;
  } else {
    document.getElementById('mensagem').innerText = resultado.mensagem;
  }
});
