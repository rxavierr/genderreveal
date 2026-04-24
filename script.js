import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 🔑 COLE SUA CONFIG DO FIREBASE AQUI
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJECT.firebaseapp.com",
  projectId: "SEU_PROJECT_ID"
};

// 🚀 Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 👤 Nome do convidado via URL
const params = new URLSearchParams(window.location.search);
const guest = params.get("guest") || "Convidado";

// 🧠 Estado do usuário
let votoUsuario = null;

// 🗳️ FUNÇÃO DE VOTO
window.votar = async function (escolha) {
  votoUsuario = escolha;

  // Mostra botão de reveal
  document.getElementById("revealBtn").style.display = "block";

  try {
    await addDoc(collection(db, "votos"), {
      escolha: escolha,
      convidado: guest,
      data: new Date()
    });

    console.log("Voto registrado:", escolha);
  } catch (e) {
    console.error("Erro ao salvar voto:", e);
  }
};

// 🎬 CLICK DO BOTÃO (compatível iPhone)
document.getElementById("revealBtn").addEventListener("click", () => {
  if (!votoUsuario) {
    alert("Escolha Guri ou Guria primeiro 👀");
    return;
  }

  suspenseThenReveal();
});

// 🎯 SUSPENSE
function suspenseThenReveal() {
  document.body.style.background = "black";

  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }

  setTimeout(reveal, 1500);
}

// 💥 REVEAL FINAL
function reveal() {
  const sexo = "menina"; // 👶 DEFINIDO

  const card = document.querySelector(".card");

  // 🎨 Troca cor do fundo
  if (sexo === "menina") {
    document.body.style.background = "#d7b49e";
    card.innerHTML = `
      <h1>💖 É UMA GURIA! 💖</h1>
      <p>${resultadoUsuario(sexo)}</p>
      <button onclick="share()">Compartilhar</button>
    `;
  } else {
    document.body.style.background = "#90a4ae";
    card.innerHTML = `
      <h1>💙 É UM GURI! 💙</h1>
      <p>${resultadoUsuario(sexo)}</p>
      <button onclick="share()">Compartilhar</button>
    `;
  }

  // 🎉 Confetti
  confetti({
    particleCount: 300,
    spread: 120,
    origin: { y: 0.6 }
  });

  // 🔊 Som
  const audio = new Audio("assets/boom.mp3");
  audio.play();
}

// 🧠 RESULTADO DO USUÁRIO
function resultadoUsuario(sexo) {
  let acertou = false;

  if (sexo === "menina" && votoUsuario === "guria") acertou = true;
  if (sexo === "menino" && votoUsuario === "guri") acertou = true;

  return acertou
    ? "🎉 Você acertou!"
    : "😅 Quase! Mas o importante é comemorar!";
}

// 📲 COMPARTILHAR
window.share = function () {
  const url = window.location.href;
  const text = "Descubra o bebê da família Dorneles Xavier 👶✨";

  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`);
};