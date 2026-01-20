// LOGIN
function login() {
  window.location.href = "templates.html";
}

// GET TEMPLATES
function getTemplates() {
  return JSON.parse(localStorage.getItem("templates")) || [];
}

// SAVE TEMPLATE
function saveTemplate() {
  const name = document.getElementById("name").value;
  const desc = document.getElementById("desc").value;

  if (!name || !desc) {
    alert("Please fill all fields");
    return;
  }

  let templates = getTemplates();
  templates.push({ name, desc });
  localStorage.setItem("templates", JSON.stringify(templates));
  window.location.href = "templates.html";
}

// LOAD TEMPLATE LIST
function loadTemplates() {
  const container = document.getElementById("templateList");
  container.innerHTML = "";

  let templates = getTemplates();

  if (templates.length === 0) {
    container.innerHTML = "<p>No templates available.</p>";
    return;
  }

  templates.forEach((t, i) => {
    container.innerHTML += `
      <div class="col-lg-3 col-md-6 col-12 mb-3">
        <div class="card p-3 shadow-sm">
          <h5>${t.name}</h5>
          <p>${t.desc}</p>
          <div class="d-flex gap-2">
            <button class="btn btn-warning btn-sm w-50" onclick="editTemplate(${i})">Edit</button>
            <button class="btn btn-danger btn-sm w-50" onclick="deleteTemplate(${i})">Delete</button>
          </div>
        </div>
      </div>
    `;
  });
}

// EDIT TEMPLATE
function editTemplate(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "edit.html";
}

// LOAD EDIT DATA
function loadEditData() {
  let templates = getTemplates();
  let index = localStorage.getItem("editIndex");

  document.getElementById("editName").value = templates[index].name;
  document.getElementById("editDesc").value = templates[index].desc;
}

// UPDATE TEMPLATE
function updateTemplate() {
  let templates = getTemplates();
  let index = localStorage.getItem("editIndex");

  templates[index].name = document.getElementById("editName").value;
  templates[index].desc = document.getElementById("editDesc").value;

  localStorage.setItem("templates", JSON.stringify(templates));
  window.location.href = "templates.html";
}

// DELETE TEMPLATE
function deleteTemplate(index) {
  if (confirm("Are you sure you want to delete this template?")) {
    let templates = getTemplates();
    templates.splice(index, 1);
    localStorage.setItem("templates", JSON.stringify(templates));
    loadTemplates(); // Refresh list dynamically
  }
}

// AUTO LOAD TEMPLATES IF PAGE HAS TEMPLATE LIST
if (document.getElementById("templateList")) {
  loadTemplates();
}
