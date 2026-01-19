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


/* Portal page data-driven builder
   - To make a new portal, copy this file or keep one file and change the "course" object.
*/

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

// Footer year (if not already handled elsewhere)
(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ========= EDIT THIS COURSE OBJECT ========= */
const course = {
  title: "Proactive Me",
  heroImg: "assets/images/PMEBanner.jpg", // your top banner image
  description:
  "Build confidence through Quranic guidance and self-reflection.\n\n" +
  "Develop a proactive mindset for better choices and actions.\n\n" +
  "Strengthen Islamic identity by understanding the Quran’s wisdom.",

  stars: [
    // use real images later (recommended: 200x200 jpg/png)
    { name: "Dua Azfar", img: "assets/images/dua.png" },
    { name: "Madha Zia", img: "assets/images/madha.png" },
    { name: "Minahil Khan", img: "assets/images/minahil.png" },
  ],
  syllabusItems: [
  { name: "How To Be A Confident Muslim", img: "assets/images/confident.png" },
  { name: "Miracles Mentioned In Quran", img: "assets/images/star.jpg" },
  { name: "Inspiring Verses Of Quran", img: "assets/images/quran.png" },
],

  resourceImages: {
    workbook: "assets/images/book.png",
    star: "assets/images/starstudent.png",
    recording: "assets/images/mic.png",
    quiz: "assets/images/quiz.png",
  },


  days: [
    {
      label: "Day 1 (4 August 2023)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1-saOPqV8ZblI2HlVmanj5kKoqggmsuvO/view?usp=sharing",
        starStudentsPdf: "https://drive.google.com/file/d/1FLUqaQZWlwfcSsRJ8SSQDuwngr3xV2eM/view?usp=sharing",
        recordingUrl: "#",      // or Google Drive share link
        quizUrl: "#",             // Google Form
      },
    },
    {
      label: "Day 2 (5 August 2023)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1x6QGE3hJefk7Aa2_5I-nrIbyq-CUHZyP/view?usp=sharing",
        starStudentsPdf: "https://drive.google.com/file/d/1LETGr8D8RReLmBJvjPqLb-NeFYdRTHp3/view?usp=sharing",
        recordingUrl: "#",
        quizUrl: "#",
      },
    },
    {
      label: "Day 3 (7 August 2023)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1o1rWUOxekpWxpwf8UIyMreujIvOv0iMi/view?usp=sharing",
        starStudentsPdf: "https://drive.google.com/file/d/1W7bviDJVdHoLmis37Ynus3xYl0lheYOW/view?usp=sharing",
        recordingUrl: "#",
        quizUrl: "#",
      },
    },
    {
      label: "Day 4 (8 August 2023)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1ItgXVAAdK1ZK-ALaJ_oHa3PBUmP5Xjyl/view?usp=sharing",
        starStudentsPdf: "https://drive.google.com/file/d/1o3OG0GdDKtQPajpcPL5LH1Khg3H2YP6R/view?usp=sharing",
        recordingUrl: "#",
        quizUrl: "#",
      },
    },
    {
      label: "Day 5 (9 August 2023)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1IGqlpk7k68kH6kah0femjk6xYbNSJRY_/view?usp=sharing",
        starStudentsPdf: "#",
        recordingUrl: "#",
        quizUrl: "#",
      },
    },
  ],
};
/* ========= STOP EDIT ========= */

function el(id){ return document.getElementById(id); }

function buildPills(){
  const wrap = el("coursePills");
  if (!wrap) return;
  wrap.innerHTML = course.pills.map(p => `
    <span class="portal-pill">
      <i class="fa-solid ${p.icon}"></i> ${p.text}
    </span>
  `).join("");
}

function buildStars(){
  const wrap = el("courseStars");
  if (!wrap) return;
  wrap.innerHTML = course.stars.map(s => `
    <div class="star">
      <img class="star__img" src="${s.img}" alt="${s.name}">
      <div class="star__name">${s.name}</div>
    </div>
  `).join("");
}

function buildDays(){
  const wrap = el("daysList");
  if (!wrap) return;

  wrap.innerHTML = course.days.map((d, idx) => {
    const r = d.resources || {};
    const safe = (v) => (v && v !== "#") ? v : null;

    const wb = safe(r.workbookPdf);
    const ss = safe(r.starStudentsPdf);
    const rec = safe(r.recordingUrl);
    const quiz = safe(r.quizUrl);

    // Optional: show workbook PDF preview when available
    const preview = wb ? `
      
      ` : "";

    return `
      <div class="day" data-index="${idx}">
        <button class="day__btn" type="button" aria-expanded="false">
          <span>${d.label}</span>
          <span class="day__chev">˅</span>
        </button>

       <div class="day__panel" role="region">
  <div class="day__resources">

    <div class="resgrid">

      <div class="rescard">
        <img class="rescard__img" src="${course.resourceImages.workbook}" alt="Workbook" />
        <div class="rescard__title">Workbook</div>
        ${wb
          ? `<a class="rescard__btn rescard__btn--primary" href="${wb}" target="_blank" rel="noopener">Open</a>`
          : `<span class="rescard__btn rescard__btn--disabled" aria-disabled="true">Not uploaded</span>`
        }
      </div>

      <div class="rescard">
        <img class="rescard__img" src="${course.resourceImages.star}" alt="Star Students" />
        <div class="rescard__title">Star Students List</div>
        ${ss
          ? `<a class="rescard__btn" href="${ss}" target="_blank" rel="noopener">Open</a>`
          : `<span class="rescard__btn rescard__btn--disabled" aria-disabled="true">Not uploaded</span>`
        }
      </div>

      <div class="rescard">
        <img class="rescard__img" src="${course.resourceImages.recording}" alt="Recording" />
        <div class="rescard__title">Class Recording</div>
        ${rec
          ? `<a class="rescard__btn" href="${rec}" target="_blank" rel="noopener">Watch</a>`
          : `<span class="rescard__btn rescard__btn--disabled" aria-disabled="true">Not uploaded</span>`
        }
      </div>

      <div class="rescard">
        <img class="rescard__img" src="${course.resourceImages.quiz}" alt="Quiz" />
        <div class="rescard__title">Quiz</div>
        ${quiz
          ? `<a class="rescard__btn rescard__btn--primary" href="${quiz}" target="_blank" rel="noopener">Open</a>`
          : `<span class="rescard__btn rescard__btn--disabled" aria-disabled="true">Not uploaded</span>`
        }
      </div>

    </div>

    ${preview}

  </div>
</div>

      </div>
    `;
  }).join("");

  // Accordion behavior
  wrap.querySelectorAll(".day").forEach(dayEl => {
    const btn = dayEl.querySelector(".day__btn");
    const panel = dayEl.querySelector(".day__panel");

    btn.addEventListener("click", () => {
      const open = dayEl.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
}

function initPortal(){
  if (el("courseTitle")) el("courseTitle").textContent = course.title;
  if (el("courseHeroImg")) el("courseHeroImg").src = course.heroImg;
  const descEl = el("courseDesc");
if (descEl) {
  // Split by new lines into bullet points
  const points = (course.description || "")
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);

  descEl.innerHTML = points.map(p => `<li>${p}</li>`).join("");
}

  buildPills();
buildStars();
buildSyllabus();
buildDays();

}

document.addEventListener("DOMContentLoaded", initPortal);
function buildSyllabus(){
  const wrap = el("courseSyllabus");
  if (!wrap) return;

  wrap.innerHTML = course.syllabusItems.map(item => `
    <div class="star">
      <img class="star__img" src="${item.img}" alt="${item.name}">
      <div class="star__name">${item.name}</div>
    </div>
  `).join("");
}
