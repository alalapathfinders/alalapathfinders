// =====================================================================
// SCRIPTTEAM.JS — Our Team page only
// Builds department members + alumni cards
// =====================================================================

(function () {
  const memberGrids = document.querySelectorAll(".members-grid[data-members]");
  const alumniGrid = document.querySelector(".alumni-grid[data-alumni='true']");

  // -----------------------------
  // ✅ Department Members Data
  // -----------------------------
  const membersByDept = {
    ops: [
      { name: "Hadiyah Asim", role: "Operations Team Member", pos: "Grade 7 Student", img: "assets/images/team/members/ops-1.png" },
      { name: "Manha Ali", role: "Operations Team Member", pos: "Grade 7 Student", img: "assets/images/team/members/ops-1.png" },
      { name: "Maryam Idrees", role: "Operations Team Member", pos: "Senior 2 Student", img: "assets/images/team/members/ops-1.png" },
      { name: "Shumaim Zuberi", role: "Operations Team Member", pos: "Grade 7 Student", img: "assets/images/team/members/ops-1.png" },
      { name: "Syeda Qaswa", role: "Operations Team Member", pos: "Grade 7 Student", img: "assets/images/team/members/ops-1.png" },
    ],
    pub: [
      { name: "Eshaal Sheikh", role: "Publications Team Member", pos: "Grade 7 Student", img: "assets/images/team/members/pub-1.png" },
      { name: "Hareem Toor", role: "Publications Team Member", pos: "Grade 7 Student", img: "assets/images/team/members/pub-1.png" },
      { name: "Sarah Farooqui", role: "Publications Team Member", pos: "Grade 8 Student", img: "assets/images/team/members/pub-1.png" },
      { name: "Zohaa Iftikhar", role: "Publications Team Member", pos: "Grade 7 Student", img: "assets/images/team/members/pub-1.png" },
    ],
    gfx: [
      { name: "Rumaisa Shahid", role: "Graphics & Media Team Member", pos: "Senior 1 Student", img: "assets/images/team/members/gfx-1.png" },
      { name: "Azwa Fatima", role: "Graphics & Media Team Member", pos: "Senior 1 Student", img: "assets/images/team/members/gfx-1.png" },
    ],
  };

  // -----------------------------
  // ✅ Alumni Data (3 rows of 3, last row 2 centered)
  // Add/edit freely
  // -----------------------------
  const alumni = [
    // Row 1 (3)
    { name: "Alumni Name 1", role: "Alumni", pos: "Class of 2021", img: "assets/images/team/placeholder.png" },
    { name: "Alumni Name 2", role: "Alumni", pos: "Class of 2021", img: "assets/images/team/placeholder.png" },
    { name: "Alumni Name 3", role: "Alumni", pos: "Class of 2021", img: "assets/images/team/placeholder.png" },

    // Row 2 (3)
    { name: "Alumni Name 4", role: "Alumni", pos: "Class of 2022", img: "assets/images/team/placeholder.png" },
    { name: "Alumni Name 5", role: "Alumni", pos: "Class of 2022", img: "assets/images/team/placeholder.png" },
    { name: "Alumni Name 6", role: "Alumni", pos: "Class of 2022", img: "assets/images/team/placeholder.png" },

    // Row 3 (3)
    { name: "Alumni Name 7", role: "Alumni", pos: "Class of 2023", img: "assets/images/team/placeholder.png" },
    { name: "Alumni Name 8", role: "Alumni", pos: "Class of 2023", img: "assets/images/team/placeholder.png" },
    { name: "Alumni Name 9", role: "Alumni", pos: "Class of 2023", img: "assets/images/team/placeholder.png" },

    // Row 4 (2 centered)
    { name: "Alumni Name 10", role: "Alumni", pos: "Class of 2024", img: "assets/images/team/placeholder.png" },
    { name: "Alumni Name 11", role: "Alumni", pos: "Class of 2024", img: "assets/images/team/placeholder.png" },
  ];

  function personCard(m) {
    const img = m.img || "assets/images/team/placeholder.png";
    const role = m.role || "Team Member";
    const name = m.name || "Name";
    const pos = m.pos || "";

    return `
      <article class="member-card">
        <div class="member-avatar">
          <img src="${img}" alt="${name}" />
        </div>
        <div class="member-text">
          <h5 class="member-name">${name}</h5>
          <div class="member-role">${role}</div>
          ${pos ? `<div class="member-pos">${pos}</div>` : ""}
        </div>
      </article>
    `;
  }

  // Render department members
  memberGrids.forEach((grid) => {
    const key = grid.getAttribute("data-members");
    const arr = membersByDept[key] || [];

    if (!arr.length) {
      grid.innerHTML = `
        <div class="empty-note">
          <em>Member cards will be added here.</em>
        </div>
      `;
      return;
    }

    grid.innerHTML = arr.map(personCard).join("");
  });

  // Render alumni
  if (alumniGrid) {
    alumniGrid.innerHTML = alumni.map(personCard).join("");
  }
})();
