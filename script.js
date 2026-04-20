const params = new URLSearchParams(window.location.search);
const guest = params.get("guest") || "Você";

document.getElementById("title").innerText =
  `${guest}, você foi escolhido para descobrir primeiro 👀`;

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

function suspenseThenReveal() {
  document.body.style.background = "black";

  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }

  setTimeout(reveal, 1200);
}

function reveal() {
  document.getElementById("screen1").classList.add("hidden");
  document.getElementById("screen2").classList.remove("hidden");

  const sexo = "menino"; // 🔥 ALTERAR AQUI

  const result = document.getElementById("result");

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
}

function share() {
  const url = window.location.href;
  const text = "Karen & Rodrigo têm uma surpresa 👶✨ Descubra:";

  window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`);
}