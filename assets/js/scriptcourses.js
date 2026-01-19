/* Prevent reload jolt: allow animations only after full load */
window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

/* =========================================================
  1) FOOTER YEAR
========================================================= */
(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* =========================================================
  2) MOBILE NAV DRAWER (Burger Open/Close)
========================================================= */
(() => {
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  // If any element is missing, do nothing (prevents console errors)
  if (!burger || !mobileMenu || !closeMenu) return;

  function openDrawer() {
    mobileMenu.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  // Toggle on burger click
  burger.addEventListener("click", () => {
    mobileMenu.classList.contains("open") ? closeDrawer() : openDrawer();
  });

  // Close icon
  closeMenu.addEventListener("click", closeDrawer);

  // Close when clicking backdrop (not the menu card)
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeDrawer();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // Close after clicking any link inside mobile menu
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
})();


/* =========================================================
  COURSES SECTION (Render + Filters)
  - Add more courses in the "courses" array anytime.
========================================================= */

(() => {
  const courses = [
  {
    title: "Proactive Me",
    days: 5,
    age: "7-14",
    tags: ["7-9", "10-12", "13-15"],
    desc: "Improve your confidence and decision-making through the wisdom of the Quran and the wonders of its teachings.",
    img: "assets/images/PME.png",
    portal: "file:///C:/Users/madha/OneDrive/Desktop/Al-Ala%20Pathfinders%20Website/proactiveme.html"
  },
  {
    title: "The Enlightened Heart",
    days: 6,
    age: "11+",
    tags: ["13-15", "16-18"],
    desc: "Illuminate your faith and character by understanding the qualities of ideal Muslims and gaining wisdom from inspiring Islamic stories.",
    img: "assets/images/TEH.png",
    portal: "https://example.com/enlightened-heart"
  },
  {
    title: "The Little Seekers",
    days: 6,
    age: "6-10",
    tags: ["4-6", "7-9", "10-12"],
    desc: "Grow closer to Allah while learning His names, exploring Islamic heroes, and enjoying engaging, hands-on faith adventures.",
    img: "assets/images/LSK.png",
    portal: "https://example.com/little-seekers"
  },
  {
    title: "The Little Quest",
    days: 5,
    age: "4-10",
    tags: ["4-6", "7-9", "10-12"],
    desc: "Embark on a fun-filled journey to discover faith, build confidence, and express your creativity through stories and activities.",
    img: "assets/images/TLQ.png",
    portal: "file:///C:/Users/madha/OneDrive/Desktop/Al-Ala%20Pathfinders%20Website/littlequest.html"
  },
  {
    title: "Realign: Real Faith, Real Struggles",
    days: 4,
    age: "11-18",
    tags: ["13-15", "16-18"],
    desc: "Reflect, reconnect, and strengthen your values while navigating challenges of social media, mental health, and life’s choices.",
    img: "assets/images/RLN.png",
    portal: "https://example.com/realign"
  },
];

  const grid = document.getElementById("coursesGrid");
  if (!grid) return;

  const filterButtons = document.querySelectorAll("[data-filter]");
  const ageButtons = document.querySelectorAll(".age__btn[data-filter]");

function courseCardHTML(c) {
  return `
    <article class="course-card">
      <div class="course-card__media">
        <img src="${c.img}" alt="${c.title} course image" loading="lazy" />
      </div>

      <h3 class="course-card__title">${c.title}</h3>

      <div class="course-card__meta">
        <span class="course-pill"><i class="fa-solid fa-users"></i> Ages ${c.age}</span>
        <span class="course-pill course-pill--orange"><i class="fa-solid fa-calendar-days"></i> ${c.days}-day</span>
      </div>

      <p class="course-card__desc">${c.desc}</p>

      <div class="course-card__actions">
        <a class="course-card__btn" href="${c.portal}" target="_blank" rel="noopener">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          Open Portal
        </a>
      </div>
    </article>
  `;
}

  function render(filter) {
    const selected = filter === "all"
      ? courses
      : courses.filter(c => c.tags.includes(filter));

    grid.innerHTML = selected.map(courseCardHTML).join("");

    // active state (only for the filter buttons row)
    document.querySelectorAll(".courses-filter").forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.filter === filter);
    });
  }

  // Default
  render("all");

  // Filter row buttons
  document.querySelectorAll(".courses-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      render(btn.dataset.filter);
      document.getElementById("courses-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Age section buttons should also filter
  ageButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      // allow jump to #courses-list, but also render filter
      const f = btn.dataset.filter;
      if (!f) return;
      // Let the anchor scroll, but render immediately
      render(f);
    });
  });
})();
