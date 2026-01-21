/* =========================================================
  3) SMOOTH SCROLL FOR INTERNAL ANCHORS (#section)
========================================================= */
(() => {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = document.querySelector(id);

      // If section doesn't exist, allow default behavior
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();

/* =========================================================
  4) IMPACT COUNT-UP (Runs once when section is visible)
========================================================= */
(() => {
  const section = document.querySelector("#impact");
  const counters = document.querySelectorAll("#impact .impact-count");
  if (!section || counters.length === 0) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count || "0", 10);
    const duration = 3000;
    const start = performance.now();

    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased);
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  };

  let done = false;

  const io = new IntersectionObserver(
    (entries) => {
      if (done) return;
      if (entries.some((e) => e.isIntersecting)) {
        done = true;
        counters.forEach(animate);
        io.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  io.observe(section);
})();

/* =========================================================
  5) ABOUT SECTION REVEAL
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const about = document.querySelector(".about");
  if (!about) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    about.classList.add("is-visible");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          about.classList.add("is-visible");
          io.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  io.observe(about);
});

/* =========================================================
  6) TIMELINE CARD REVEAL ON SCROLL
========================================================= */
(() => {
  const cards = document.querySelectorAll(".timeline__card");
  if (!cards.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    cards.forEach((c) => c.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );

  cards.forEach((card) => io.observe(card));
})();

/* =========================================================
  7) "WHAT WE DO" CARD REVEAL ON SCROLL (with stagger)
========================================================= */
(() => {
  const cards = document.querySelectorAll(".wedo__card");
  if (!cards.length) return;

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.22 }
  );

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 90}ms`;
    io.observe(card);
  });
})();

/* =========================================================
  8) WHATSAPP CTA REVEAL ON SCROLL (no flash/jump)
========================================================= */
(() => {
  const cta = document.querySelector(".cta__wrap");
  if (!cta) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    cta.classList.add("is-visible");
    return;
  }

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        cta.classList.add("is-visible");
        io.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  io.observe(cta);
})();