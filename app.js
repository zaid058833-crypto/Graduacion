const alumnos = [
  { nombre: "Camila Andrea Soto", curso: "4° Medio A", foto: "fotos/01.jfif" },
  { nombre: "Martín Ignacio Rojas", curso: "4° Medio A", foto: "fotos/02.jfif" },
  { nombre: "Valentina Paz Muñoz", curso: "4° Medio A", foto: "fotos/03.jfif" },
  { nombre: "Benjamín Alonso Díaz", curso: "4° Medio A", foto: "fotos/04.jfif" },
  { nombre: "Sofía Belén Contreras", curso: "4° Medio A", foto: "fotos/05.jfif" },
  { nombre: "Lucas Mateo Silva", curso: "4° Medio A", foto: "fotos/06.jfif" },
  { nombre: "Isidora Antonia Morales", curso: "4° Medio A", foto: "fotos/07.jfif" },
  { nombre: "Vicente Gabriel Torres", curso: "4° Medio A", foto: "fotos/08.jfif" },
  { nombre: "Emilia Josefa Fuentes", curso: "4° Medio A", foto: "fotos/09.jfif" },
  { nombre: "Tomás Eduardo Castro", curso: "4° Medio A", foto: "fotos/10.jfif" }
];

const slides = [{ tipo: "portada" }];
for (let i = 0; i < alumnos.length; i += 10) {
  const grupo = alumnos.slice(i, i + 10);
  grupo.forEach(a => slides.push({ tipo: "ind", data: a }));
  slides.push({ tipo: "grp", data: grupo, num: Math.floor(i / 10) + 1 });
}

let pos = 0;
let timer = null;
const box = document.getElementById("escenario");

function pintar() {
  const s = slides[pos];
  if (s.tipo === "portada") {
    box.innerHTML = `<div class="portada"><h1>Licenciatura 4° Medio</h1><h3>Generación 2026</h3></div>`;
  } else if (s.tipo === "ind") {
    box.innerHTML = `<div class="individual"><img src="${s.data.foto}"><h2>${s.data.nombre}</h2><p>${s.data.curso}</p></div>`;
  } else {
    const cards = s.data.map((a, idx) => `<div class="tarjeta" style="animation-delay:${idx * 0.15}s"><img src="${a.foto}"><span>${a.nombre}</span></div>`).join("");
    box.innerHTML = `<h3 class="titulo-grupo">Generación 2026 • Grupo ${s.num}</h3><div class="mosaico">${cards}</div>`;
  }
}

function mover(dir) {
  const sig = pos + dir;
  if (sig < 0 || sig >= slides.length) return;
  box.className = "oculto";
  setTimeout(() => {
    pos = sig;
    pintar();
    box.className = "visible";
  }, 450);
}

document.getElementById("btnPrev").onclick = () => mover(-1);
document.getElementById("btnNext").onclick = () => mover(1);
document.getElementById("btnFull").onclick = () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
};
document.getElementById("btnAuto").onclick = (e) => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    e.target.textContent = "Auto: OFF";
  } else {
    e.target.textContent = "Auto: ON";
    timer = setInterval(() => mover(1), 3500);
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " ") mover(1);
  if (e.key === "ArrowLeft") mover(-1);
});

pintar();

