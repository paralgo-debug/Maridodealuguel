// Palavras que se alternam no título
const problems = ["torneira pingando","tomada sem energia","vazamento","calha entupida","chuveiro queimado","lâmpada queimada","portão travado","prateleira solta"];
const swap = document.getElementById("swap");
let i = 0;
setInterval(() => {
  swap.classList.add("out");
  setTimeout(() => {
    i = (i + 1) % problems.length;
    swap.textContent = problems[i];
    swap.classList.remove("out");
  }, 350);
}, 2400);

// Menu mobile
const burger = document.querySelector(".burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

// Esconde o topo ao rolar para baixo
const top_ = document.getElementById("top");
let lastY = 0;
addEventListener("scroll", () => {
  const y = scrollY;
  top_.classList.toggle("hide", y > lastY && y > 300 && !nav.classList.contains("open"));
  lastY = y;
}, { passive: true });

// Abas de serviços
const tabs = document.querySelectorAll(".tabs button");
tabs.forEach(t => t.addEventListener("click", () => {
  tabs.forEach(b => b.setAttribute("aria-selected", b === t));
  document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === t.dataset.tab));
}));

// Galeria com ampliação
const lb = document.getElementById("lb");
const lbImg = lb.querySelector("img");
document.querySelectorAll(".grid img").forEach(img => img.addEventListener("click", () => {
  lbImg.src = img.src; lbImg.alt = img.alt; lb.hidden = false;
}));
lb.addEventListener("click", () => lb.hidden = true);
addEventListener("keydown", e => { if (e.key === "Escape") lb.hidden = true; });

// Carrossel de avaliações
const track = document.querySelector(".track");
const cards = [...track.children];
const dots = document.getElementById("dots");
cards.forEach(() => dots.appendChild(document.createElement("i")));
const step = () => cards[0].offsetWidth + 20;
const current = () => Math.round(track.scrollLeft / step());
const paint = () => [...dots.children].forEach((d, n) => d.classList.toggle("on", n === current()));
const go = n => track.scrollTo({ left: Math.max(0, Math.min(cards.length - 1, n)) * step(), behavior: "smooth" });
document.getElementById("prev").onclick = () => go(current() - 1);
document.getElementById("next").onclick = () => go(current() + 1);
track.addEventListener("scroll", paint, { passive: true });
paint();
