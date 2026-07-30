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
  title: " ",
  heroImg: "assets/images/TBBanner.png", // your top banner image
  description:
  "Strengthen your faith through the lessons of Surah Al-Muminoon.\n\n" +
  "Discover inspiring stories from the lives of the Prophets.\n\n" +
  "Gain practical AI skills including prompt engineering and responsible technology use.",

  stars: [
    // use real images later (recommended: 200x200 jpg/png)
    { name: "Dua Azfar", img: "assets/images/dua.png" },
    { name: "Minahil Khan", img: "assets/images/minahil.png" },
    { name: "Madha Zia", img: "assets/images/madha.png" },
  ],
  syllabusItems: [
  { name: "Al-Muminoon", img: "assets/images/muminoon.png" },
  { name: "Lessons from the Chosen", img: "assets/images/star.png" },
  { name: "The Artificial Intelligence Toolbox", img: "assets/images/ai.png" },
],

  resourceImages: {
    workbook: "assets/images/book.png",
    star: "assets/images/starstudent.png",
    recording: "assets/images/mic.png",
    quiz: "assets/images/quiz.png",
  },


  days: [
    {
      label: "Day 1 (27 July 2026)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1pCCcG5c4QqdMFt6snashrE0xqhqlgvTB/view?usp=sharing",
        starStudentsPdf: "#",
        recordingUrl: "https://youtu.be/TLU0Cmn8Dl8",      // or Google Drive share link
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdVY_bxCPF88EOtEpEN1DdWczWwGAQSejsipzgLlgoC8tLLuQ/viewform",             // Google Form
      },
    },
    {
      label: "Day 2 (28 July 2026)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1dk2CzUcuU0al1OPzLb8F27PtavUvGSgK/view?usp=sharing",
        starStudentsPdf: "#",
        recordingUrl: "https://youtu.be/4Da9nZ8i2TI?si=oMGz-jxPseeruRnf",      
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-z137Z4NtinKIMeb3ZA46KxIiaG4nCufJWLRIsnoeX4dTng/viewform",             // Google Form
      },
    },
    {
      label: "Day 3 (29 July 2026)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/1Auly2XgiNI7n_5gt38gNbTwMovaXywcY/view?usp=sharing",
        starStudentsPdf: "#",
        recordingUrl: "https://youtu.be/7nY4glHx604",      // or Google Drive share link
        quizUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfI0SAgTDDo7v2hpJUJrdmdOKtUvf6-EKlcKoKq7wU5k1n3kg/viewform",             // Google Form
      },
    },
    {
      label: "Day 4 (30 July 2026)",
      resources: {
        workbookPdf: "https://drive.google.com/file/d/155VjXWR1dJJmsK01VGzF6b7ZZQ7nInVl/view?usp=sharing",
        starStudentsPdf: "#",
        recordingUrl: "#",      // or Google Drive share link
        quizUrl: "#",             // Google Form
      },
    },
    {
      label: "Day 5 (31 July 2026)",
      resources: {
        workbookPdf: "#",
        starStudentsPdf: "#",
        recordingUrl: "#",      // or Google Drive share link
        quizUrl: "#",             // Google Form
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
