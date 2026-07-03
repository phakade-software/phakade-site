const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const lottieTarget = document.getElementById("lottie-animation");

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
