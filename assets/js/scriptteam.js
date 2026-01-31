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
    { name: "Aafia Azfar", role: "Alumni", pos: "Class of 2023", img: "assets/images/team/placeholder.png" },
    { name: "Aiman Abdullah", role: "Alumni", pos: "Class of 2024", img: "assets/images/team/placeholder.png" },
    { name: "Arwa Fatima", role: "Alumni", pos: "Class of 2022", img: "assets/images/team/placeholder.png" },

    // Row 2 (3)
    { name: "Ayesha Farooqui", role: "Alumni", pos: "Class of 2022", img: "assets/images/team/placeholder.png" },
    { name: "Inaya Shahzad", role: "Alumni", pos: "Class of 2026", img: "assets/images/team/placeholder.png" },
    { name: "Kashmala Waqas", role: "Alumni", pos: "Class of 2024", img: "assets/images/team/placeholder.png" },

    // Row 3 (3)
    { name: "Khairun Nisa", role: "Alumni", pos: "Class of 2024", img: "assets/images/team/placeholder.png" },
    { name: "Mahjabeen Sajad", role: "Alumni", pos: "Class of 2022", img: "assets/images/team/placeholder.png" },
    { name: "Walija Khalid", role: "Alumni", pos: "Class of 2026", img: "assets/images/team/placeholder.png" },
    
    // Row 4 (2 centered)
    { name: "Zomaha Shahzad", role: "Alumni", pos: "Class of 2022", img: "assets/images/team/placeholder.png" },
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
