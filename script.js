let votoUsuario = null;

const btnGuri = document.getElementById("btnGuri");
const btnGuria = document.getElementById("btnGuria");

function votar(escolha) {
  votoUsuario = escolha;

  if (escolha === "guri") {
    btnGuri.classList.add("selected");
    btnGuria.classList.add("dimmed");
  } else {
    btnGuria.classList.add("selected");
    btnGuri.classList.add("dimmed");
  }

  if (navigator.vibrate) navigator.vibrate(50);

  document.getElementById("revealBtn").style.display = "block";
}

document.getElementById("revealBtn").addEventListener("click", () => {
  if (!votoUsuario) return alert("Escolha uma opção 👀");

  const sexo = "menina";

  document.querySelector(".card").innerHTML = `
    <h1>${sexo === "menina" ? "💖 É UMA GURIA!" : "💙 É UM GURI!"}</h1>
  `;

  confetti();
});