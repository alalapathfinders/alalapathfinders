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
  title: "Realign: Real Faith, Real Struggles",
  heroImg: "assets/images/RRRBanner.png", // your top banner image
  description:
  "Encourage self-reflection on identity, purpose, and personal challenges through an Islamic lens.\n\n" +
  "Address real-life issues such as social media, mental health, and materialism with faith-based understanding.\n\n" +
  "Strengthen connection with Allah by realigning values, beliefs, and everyday choices.",

  stars: [
    // use real images later (recommended: 200x200 jpg/png)
    { name: "Dua Azfar", img: "assets/images/dua.png" },
    { name: "Madha Zia", img: "assets/images/madha.png" },
    { name: "Minahil Khan", img: "assets/images/minahil.png" },
  ],
  syllabusItems: [
  { name: "Who Am I?", img: "assets/images/whoami.png" },
  { name: "Social Media, Fame & Validation", img: "assets/images/media.png" },
  { name: "Mental Health, Depression & Loneliness", img: "assets/images/health.png" },
  { name: "Money, Greed & Materialism", img: "assets/images/money.png" },
],

  resourceImages: {
    workbook: "assets/images/book.png",
    star: "assets/images/starstudent.png",
    recording: "assets/images/mic.png",
    quiz: "assets/images/quiz.png",
  },


  days: [
    {
      label: "Day 1 (30 July 2025)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/12yywC51AC-2t4sSmteAn8GQY4dRbETxp/view?usp=sharing",
        starStudentsPdf: "https://drive.google.com/file/d/1M31tFcGIiQVv1sH8a4eS0AGgC4c3WZx4/view?usp=sharing",
        recordingUrl: "https://youtu.be/JtPEjcjvGWo?si=RMKnWkFthEpG37f-",      // or Google Drive share link
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSffLMld27_ktN8aiyZKc3jo9PZ-2bJsllMv1cxlwCvob0bBxQ/viewform?usp=dialog",             // Google Form
      },
    },
    {
      label: "Day 2 (31 July 2025)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1jjd2M4KulumsJ_xWyaI9wdZ0qRlKn1z9/view?usp=sharing",
        starStudentsPdf: "https://drive.google.com/file/d/1NMPMooLav8h5el72e78Z3WacWC53I3Li/view?usp=sharing",
        recordingUrl: "https://youtu.be/19hf8QcWA04?si=iU_HiLfJ5CVEojbF",
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLScRzEOlkruuIpHdj-dyK-j1-6eNQsibLqCi2JZsmyGZ9CFctw/viewform?usp=dialog",
      },
    },
    {
      label: "Day 3 (1 August 2025)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1bUoPGTSTT_IP9ojh7Q4i-15440AAtPfe/view?usp=sharing",
        starStudentsPdf: "https://drive.google.com/file/d/1sih4BWhdprLqWcPXRGtjZl3GCuVRoS2g/view?usp=sharing",
        recordingUrl: "https://youtu.be/_9TFEii696E?si=cSDAG3lApzvCuA9Q",
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc8AtOXrvpHM2puUtfeZiduu81q-jrXnv4LLIypcUn7Wev73w/viewform?usp=dialog",
      },
    },
    {
      label: "Day 4 (2 August 2025)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1Ulztrb-SaZpg2q9rDDOP8iz6ZhYS0jhX/view?usp=sharing",
        starStudentsPdf: "#",
        recordingUrl: "https://youtu.be/fJinIUcrxtU?si=8LZbyn76tYO6lvCc",
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSc-fZ21fuGMHsHvHlCpNWUMUNZ2E2pe6cyICTgwwRjdt7u3Pw/viewform?usp=dialog",
      },
    },
  ],
};
/* ========= STOP EDIT ========= */

function el(id){ return document.getElementById(id); }

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
        <div class="rescard__title">Journal</div>
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
