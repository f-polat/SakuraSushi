// Navigation: baggrund ved scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobilmenu
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("is-open");
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", false);
  })
);

// Menu-faner
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".menu-panel");
tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
    panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === tab.dataset.tab));
  })
);

// Booking-formular
const form = document.getElementById("bookingForm");
const msg = document.getElementById("formMsg");
const dato = document.getElementById("dato");
dato.min = new Date().toISOString().split("T")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const ok = field.checkValidity() && field.value.trim() !== "";
    field.classList.toggle("is-invalid", !ok);
    if (!ok) valid = false;
  });

  if (dato.value && new Date(dato.value).getDay() === 1) {
    dato.classList.add("is-invalid");
    msg.textContent = "Vi har lukket om mandagen – vælg venligst en anden dag.";
    msg.className = "form__msg err";
    return;
  }

  if (!valid) {
    msg.textContent = "Udfyld venligst alle påkrævede felter.";
    msg.className = "form__msg err";
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  msg.textContent = `Tak, ${data.navn}! Vi har modtaget din reservation for ${data.antal} pers. d. ${data.dato} kl. ${data.tid}.`;
  msg.className = "form__msg ok";
  form.reset();
});

// Åben/lukket status (0 = søndag)
const hours = { 0: [16, 21], 1: null, 2: [16, 21.5], 3: [16, 21.5], 4: [16, 21.5], 5: [16, 22.5], 6: [16, 22.5] };
const status = document.getElementById("openStatus");
const now = new Date();
const today = hours[now.getDay()];
const t = now.getHours() + now.getMinutes() / 60;
const isOpen = today && t >= today[0] && t < today[1];
status.textContent = isOpen ? "● Vi har åbent nu" : "● Vi har lukket lige nu";
status.classList.add(isOpen ? "open" : "closed");

// Årstal i footer
document.getElementById("year").textContent = now.getFullYear();

// Fade-in ved scroll
const revealEls = document.querySelectorAll(".section__head, .about > *, .menu-item, .gallery img, .reviews blockquote, .booking > *, .contact > *");
revealEls.forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));
