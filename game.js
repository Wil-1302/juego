let puntuacion = 0; // contador de puntos
const kitty = document.getElementById("kitty");
const hitbox = document.getElementById("hitbox");
const obstaculo = document.getElementById("obstaculo");
const mensaje = document.getElementById("mensaje-final");
const startBtn = document.getElementById("start-btn");

let juegoIniciado = false;
let intervaloCambioObstaculo;

function saltar() {
  if (!kitty.classList.contains("saltar") && juegoIniciado) {
    kitty.classList.add("saltar");

    setTimeout(() => {
      kitty.classList.remove("saltar");
    }, 900); // Igual que la duración del salto en CSS
  }
}
// --- Controles por teclado (PC) ---
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    saltar();
  }
});

// --- Controles táctiles (móvil) --- 
const contenedorJuego = document.getElementById("juego");

contenedorJuego.addEventListener("touchstart", function(e) {
  saltar();
});

// Opcional: también clic para PC
contenedorJuego.addEventListener("click", function(e) {
  saltar();
});
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    saltar();
  }
});

startBtn.addEventListener("click", iniciarJuego);

function iniciarJuego() {
  kitty.src = "img/kitty-corriendo.gif";
  kitty.classList.remove("kitty-llorando");
  kitty.classList.add("kitty-corriendo"); // Kitty grande al iniciar


  mensaje.innerText = "";
  startBtn.style.display = "none";
  obstaculo.style.display = "block";
  obstaculo.style.animation = "mover 2s infinite linear";
  juegoIniciado = true;

  cambiarObstaculo(); // Iniciar con uno

  intervaloCambioObstaculo = setInterval(() => {
    cambiarObstaculo();
  }, 2000);
}


function cambiarObstaculo() {
  const obstaculos = ["fresa.png", "arbol.png", "hongo.png"];
  const random = Math.floor(Math.random() * obstaculos.length);
  const obstaculoActual = obstaculos[random];

  obstaculo.src = "img/" + obstaculoActual;

  // Ajuste de tamaños
  if (obstaculoActual === "arbol.png") {
    obstaculo.style.width = "70px";
    obstaculo.style.height = "80px";
  } else if (obstaculoActual === "hongo.png") {
    obstaculo.style.width = "70px";
    obstaculo.style.height = "80px";
  } else {
    obstaculo.style.width = "70px";
    obstaculo.style.height = "80px";
  }
  puntuacion++;           // suma 1 punto
  mostrarPuntuacion();    // actualiza la pantalla

}

setInterval(() => {
  if (!juegoIniciado) return;

  const kittyRect = kitty.getBoundingClientRect(); // Cambiado de hitbox
  const obstaculoRect = obstaculo.getBoundingClientRect();

  // Ajuste para dar margen en el salto
  const colision =
  obstaculoRect.left < kittyRect.right - 60 &&  // margen horizontal grande
  obstaculoRect.right > kittyRect.left + 60 &&
  obstaculoRect.top < kittyRect.bottom - 30 &&  // margen vertical
  obstaculoRect.bottom > kittyRect.top + 30;

  if (colision) {
    mensaje.innerText = "¡Game Over, mi amor! 😢 Inténtalo otra vez";

    obstaculo.style.animation = "none";
    obstaculo.style.display = "none";
    kitty.src = "img/kitty-llorando.gif";
    kitty.classList.remove("kitty-corriendo");
    kitty.classList.add("kitty-llorando");

    startBtn.style.display = "inline-block";
    juegoIniciado = false;
    puntuacion = 0; // reinicia la puntuación
    document.getElementById("puntuacion").innerText = "Puntos: 0";

    clearInterval(intervaloCambioObstaculo);
  }
}, 10);
// --- Mensajes románticos cada 5 puntos ---
const mensajesBonitos = [
  "💖 5 puntos 😘✨\nJas, tus ojitos iluminan mi día y mi corazón.",
  "🌸 10 puntos 😍\nPrincesa, cada momento contigo se siente mágico.",
  "🌈 15 puntos 💕\nOjitos de arroz, mi alegría crece cuando sonríes.",
  "💫 20 puntos 🌹\nMi cielo, tu ternura hace mi mundo más bonito.",
  "💗 25 puntos 🌟\nBonita, gracias por llenar mi vida de amor.",
  "🌺 30 puntos 💖\nMi sol, cada latido mío susurra tu nombre.",
  "✨ 35 puntos 😘\nMi princesa, contigo todo es más brillante y dulce.",
  "🌹 40 puntos 💕\nOjitos bonitos, tus abrazos son mi refugio.",
  "💞 45 puntos 🌈\nMi amor, mi corazón late más fuerte por ti.",
  "💖 50 puntos 🌟\nPrincesa hermosa, gracias por hacer mi mundo perfecto."
];

function mostrarPuntuacion() {
  const puntuacionElemento = document.getElementById("puntuacion");
  const mensajePuntuacion = document.getElementById("mensaje-puntuacion");

  puntuacionElemento.innerText = "Puntos: " + puntuacion;

  // Cada 5 puntos, mostrar mensaje bonito
  if (puntuacion % 5 === 0 && puntuacion !== 0) {
    const index = (puntuacion / 5) - 1;
    if (mensajesBonitos[index]) {
      mensajePuntuacion.innerText = mensajesBonitos[index];

      // Opcional: desaparecer el mensaje después de 3 segundos
      setTimeout(() => {
        mensajePuntuacion.innerText = "";
      }, 3000);
    }
  }
}


