document.documentElement.classList.add("js");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const backToTopButton = document.querySelector(".back-to-top");
const navLinks = nav ? Array.from(nav.querySelectorAll("a")) : [];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = (activeId) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries.filter((entry) => entry.isIntersecting);
      if (!visibleSections.length) {
        return;
      }

      visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      setActiveLink(visibleSections[0].target.id);
    },
    {
      root: null,
      threshold: [0.25, 0.4, 0.6],
      rootMargin: "-20% 0px -55% 0px",
    }
  );

  sections.forEach((section) => observer.observe(section));

  setActiveLink(sections[0].id);
}

const revealElements = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!("IntersectionObserver" in window) || reducedMotion) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -40px" });
  revealElements.forEach((element) => revealObserver.observe(element));
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const updateBackToTopVisibility = () => {
  backToTopButton?.classList.toggle("is-visible", window.scrollY > 240);
};

updateBackToTopVisibility();
window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});
