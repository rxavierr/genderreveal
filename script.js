// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 🔑 COLE SUA CONFIG AQUI
const firebaseConfig = {
  apiKey: "AIzaSyBDOPPqnCCdkdS6iz4LDFHY0CpnfXPyU_0",
  authDomain: "gender-reveal-5671e.firebaseapp.com",
  projectId: "gender-reveal-5671e"
};

// 🚀 Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 👤 Nome do convidado via URL
const params = new URLSearchParams(window.location.search);
const guest = params.get("guest") || "Você";

document.getElementById("title").innerText =
  `${guest}, você foi escolhido para descobrir primeiro 👀`;

let votoUsuario = null;

// 🗳️ Função de voto
window.votar = async function(escolha) {
  votoUsuario = escolha;

  document.getElementById("choice").style.display = "none";
  document.getElementById("holdBtn").style.display = "block";

  await addDoc(collection(db, "votos"), {
    escolha: escolha,
    convidado: guest,
    data: new Date()
  });
};

// 🎯 Botão hold
const btn = document.getElementById("holdBtn");
let pressTimer;

btn.addEventListener("mousedown", startHold);
btn.addEventListener("touchstart", startHold);

btn.addEventListener("mouseup", cancelHold);
btn.addEventListener("mouseleave", cancelHold);
btn.addEventListener("touchend", cancelHold);

function startHold() {
  pressTimer = setTimeout(() => {
    suspenseThenReveal();
  }, 1800);
}

function cancelHold() {
  clearTimeout(pressTimer);
}

// 🎬 Suspense
function suspenseThenReveal() {
  document.body.style.background = "black";

  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }

  setTimeout(reveal, 1200);
}

// 💥 Reveal
function reveal() {
  document.getElementById("screen1").classList.add("hidden");
  document.getElementById("screen2").classList.remove("hidden");

  const sexo = "menino"; // 🔥 ALTERE AQUI

  const result = document.getElementById("result");
  const resultadoFinal = document.getElementById("resultadoFinal");

  document.getElementById("boom").play();

  if (sexo === "menino") {
    document.body.style.background = "#2196F3";
    result.innerText = "É MENINO 💙";
  } else {
    document.body.style.background = "#E91E63";
    result.innerText = "É MENINA 💖";
  }

  confetti({
    particleCount: 350,
    spread: 140,
    origin: { y: 0.6 }
  });

  // 🎯 Verifica acerto
  let acertou = false;

  if (sexo === "menino" && votoUsuario === "guri") acertou = true;
  if (sexo === "menina" && votoUsuario === "guria") acertou = true;

  resultadoFinal.innerText = acertou
    ? "🎉 Você acertou!"
    : "😅 Quase! Mas o importante é comemorar!";
}

// 📲 Compartilhar
window.share = function() {
  const url = window.location.href;
  const text = "Karen & Rodrigo têm uma surpresa 👶✨ Descubra:";

  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`);
};