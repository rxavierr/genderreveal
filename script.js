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

// 👤 Nome via URL
const params = new URLSearchParams(window.location.search);
const guest = params.get("guest") || "Você";

let votoUsuario = null;

// 🗳️ Voto
window.votar = async function(escolha) {
  votoUsuario = escolha;

  document.getElementById("choice").style.display = "none";
  document.getElementById("revealBtn").style.display = "block";

  await addDoc(collection(db, "votos"), {
    escolha,
    convidado: guest,
    data: new Date()
  });
};

// 🎬 Reveal (CLICK — compatível iPhone)
document.getElementById("revealBtn").addEventListener("click", () => {
  suspenseThenReveal();
});

function suspenseThenReveal() {
  document.body.style.background = "black";

  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }

  setTimeout(reveal, 1500);
}

// 💥 REVEAL FINAL
function reveal() {
  document.getElementById("screen1").classList.add("hidden");
  document.getElementById("screen2").classList.remove("hidden");

  const sexo = "menina"; // 👶 DEFINIDO

  const result = document.getElementById("result");
  const resultadoFinal = document.getElementById("resultadoFinal");

  document.getElementById("boom").play();

  if (sexo === "menina") {
    document.body.style.background = "#d7b49e";
    result.innerText = "É UMA GURIA 💖";
  } else {
    document.body.style.background = "#90a4ae";
    result.innerText = "É UM GURI 💙";
  }

  confetti({
    particleCount: 350,
    spread: 140,
    origin: { y: 0.6 }
  });

  let acertou = false;

  if (sexo === "menina" && votoUsuario === "guria") acertou = true;
  if (sexo === "menino" && votoUsuario === "guri") acertou = true;

  resultadoFinal.innerText = acertou
    ? "🎉 Você acertou!"
    : "😅 Quase! Mas o importante é comemorar!";
}

// 📲 Compartilhar
window.share = function() {
  const url = window.location.href;
  const text = "Descubra o bebê da família Dorneles Xavier 👶✨";

  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`);
};