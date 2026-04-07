const API_URL = "https://script.google.com/macros/s/AKfycbxHs06tuOj9k0dp2T7EpxwDw_rdTR8KPUysvRw2jwBTxliG7QqrRbOzEC2Z8m_G6e9XaA/exec";
let currentReport = "";

// ADD STUDENT
function addStudent() {
  const name = document.getElementById("name").value;
  const marks = document.getElementById("marks").value;

  if (!name || !marks) return alert("Fill all fields");

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ name, marks })
  })
  .then(res => res.text())
  .then(() => {
    alert("Student Added");
    loadStudents();
  });
}

// LOAD STUDENTS
function loadStudents() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      list.innerHTML = "";

      data.slice(1).forEach((row, index) => {
        list.innerHTML += `
          <div class="card">
            <b>${row[0]}</b> - ${row[1]} marks
            <br>
            <button onclick="generateReport('${row[0]}','${row[1]}')">Report</button>
          </div>
        `;
      });
    });
}

// GENERATE REPORT
function generateReport(name, marks) {
  let grade = marks >= 80 ? "A" :
              marks >= 60 ? "B" : "C";

  currentReport = `
Student Report

Name: ${name}
Marks: ${marks}
Grade: ${grade}
  `;

  document.getElementById("preview").innerHTML = `
    <h3>Report</h3>
    <p>Name: ${name}</p>
    <p>Marks: ${marks}</p>
    <p>Grade: ${grade}</p>
  `;
}

// DOWNLOAD PDF
function downloadPDF() {
  if (!currentReport) return alert("Generate report first");

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text(currentReport, 10, 10);
  doc.save("report.pdf");
}

// LOAD ON START
window.onload = loadStudents;
