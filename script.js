const body = document.body;
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const currentYear = document.getElementById("currentYear");

function setTheme(theme) {
  body.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);

  const isDark = theme === "dark";

  themeIcon.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Aktifkan light mode" : "Aktifkan dark mode"
  );
}

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

setTheme(savedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
  );
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Buka menu navigasi");
  });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

function updateActiveNavigation() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
}

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();

currentYear.textContent = new Date().getFullYear();