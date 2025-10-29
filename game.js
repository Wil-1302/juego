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
    mensaje.innerText = "¡Game Over! 😢 Inténtalo otra vez";

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
  "💖 5 puntos 😊\nEstaba pensando un rato y me di cuenta que tu buena vibra siempre me calma.",
"🌸 10 puntos ✨\nHoy andaba medio estresado, pero pensar en ti me sacó una sonrisa.",
"🌈 15 puntos 💭\nA veces uno solo necesita recordar a gente buena... y pensé en ti.",
"💫 20 puntos 🌿\nCuando todo se complica, me acuerdo de las personas que me hacen sentir tranquilo, como tú.",
"💗 25 puntos 🌼\nNo sé por qué, pero tu forma de ser siempre me da buena energía.",
"🌺 30 puntos ☕\nEntre tanto caos, pensar en alguien con buena onda como tú fue un respiro.",
"✨ 35 puntos 🌙\nSolo quería decir que tu forma de ver la vida me inspira bastante.",
"🌹 40 puntos 🌤️\nTu amistad tiene ese efecto raro de hacer que el día se sienta más liviano.",
"💞 45 puntos 📖\nMe puse a pensar en todo lo que valoro, y sí, tú estabas en esa lista.",
"💖 50 puntos 🌟\nA veces no lo digo, pero te aprecio mucho. Gracias por existir y por ser tan tú."
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


