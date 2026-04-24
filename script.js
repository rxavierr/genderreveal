import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 🔑 COLE SUA CONFIG AQUI
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJECT.firebaseapp.com",
  projectId: "SEU_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Nome do convidado
const params = new URLSearchParams(window.location.search);
const guest = params.get("guest") || "Convidado";

let votoUsuario = null;

// 🗳️ VOTO
window.votar = async function(escolha) {
  votoUsuario = escolha;

  document.getElementById("revealBtn").style.display = "block";

  try {
    await addDoc(collection(db, "votos"), {
      escolha,
      convidado: guest,
      data: new Date()
    });
  } catch (e) {
    console.error("Erro Firebase:", e);
  }
};

// CLICK REVEAL
document.getElementById("revealBtn").addEventListener("click", () => {
  if (!votoUsuario) {
    alert("Escolha uma opção primeiro 👀");
    return;
  }

  suspenseThenReveal();
});

// 🎬 SUSPENSE
function suspenseThenReveal() {
  document.body.style.background = "black";

  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }

  setTimeout(reveal, 1200);
}

// 💥 REVEAL
function reveal() {
  const sexo = "menina"; // DEFINIDO

  const card = document.querySelector(".card");

  document.body.style.background =
    sexo === "menina" ? "#d7b49e" : "#90a4ae";

  const acertou =
    (sexo === "menina" && votoUsuario === "guria") ||
    (sexo === "menino" && votoUsuario === "guri");

  card.innerHTML = `
    <h1>${sexo === "menina" ? "💖 É UMA GURIA!" : "💙 É UM GURI!"}</h1>
    <p>${acertou ? "🎉 Você acertou!" : "😅 Quase!"}</p>
    <button onclick="share()">Compartilhar</button>
  `;

  confetti({
    particleCount: 300,
    spread: 120,
    origin: { y: 0.6 }
  });

  new Audio("assets/boom.mp3").play();
}

// 📲 SHARE
window.share = function() {
  const url = window.location.href;
  const text = "Descubra o bebê da família Dorneles Xavier 👶✨";

  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`);
};