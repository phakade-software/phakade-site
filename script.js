const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const lottieTarget = document.getElementById("lottie-animation");
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

if (window.lottie && lottieTarget) {
  fetch(encodeURI("code dark.json"))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load animation: ${response.status}`);
      }
      return response.json();
    })
    .then((animationData) => {
      window.lottie.loadAnimation({
        container: lottieTarget,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet",
        },
      });
    })
    .catch(() => {
      lottieTarget.innerHTML = `
        <div style="height:100%;display:grid;place-items:center;color:#8b96a5;text-align:center;padding:1.5rem;">
          <div>
            <strong style="display:block;color:#e6eaf0;margin-bottom:0.4rem;">Animation unavailable</strong>
            <span>Check that <code>code dark.json</code> is served from the same folder.</span>
          </div>
        </div>
      `;
    });
}
