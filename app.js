"use strict";

const arbeten = [
  { name: "Kantsten", price: 1000, unit: "m" },
  { name: "Marksten", price: 800, unit: "m²" },
  { name: "Dränering", price: 600, unit: "m" },
  { name: "Schakt/grävning", price: 300, unit: "m³" },
  { name: "Asfaltering", price: 900, unit: "m²" },
  { name: "Plattläggning", price: 700, unit: "m²" },
  { name: "Fyllnadsmaterial", price: 500, unit: "ton" },
  { name: "Jordutbyte", price: 350, unit: "m³" },
  { name: "Rörläggning", price: 650, unit: "m" },
  { name: "Markbelysning", price: 1200, unit: "punkt" },
  { name: "Stödmur", price: 1500, unit: "m" },
  { name: "Trappa", price: 900, unit: "steg" },
  { name: "Kabelgrävning", price: 400, unit: "m" },
  { name: "Markrensning", price: 500, unit: "timme" }
];

function populate(select) {
  arbeten.forEach(a => {
    const min = Math.round(a.price * 0.9);
    const max = Math.round(a.price * 1.1);
    const o = document.createElement("option");
    o.value = a.name;
    o.setAttribute("data-price", a.price);
    o.textContent = `${a.name} (ca ${min}–${max} kr/${a.unit})`;
    select.appendChild(o);
  });
}

populate(document.querySelector('select[name="jobbTyp[]"]'));

function calculatePrice() {
  let total = 0;
  document.querySelectorAll(".task-row").forEach(row => {
    const sel = row.querySelector("select");
    const inp = row.querySelector("input");
    const price =
      parseFloat(sel.selectedOptions[0].getAttribute("data-price")) || 0;
    const qty = parseFloat(inp.value.replace(",", ".")) || 0;
    total += price * qty;
  });

  const priceEstimate = document.getElementById("priceEstimate");
  if (total === 0) {
    priceEstimate.textContent = "Uppskattat totalpris visas här...";
    if (priceAfter) priceAfter.textContent = "";
  } else {
    const min = Math.round(total * 0.9);
    const max = Math.round(total * 1.1);
    priceEstimate.textContent =
      `Uppskattat pris: ca ${min.toLocaleString("sv-SE")}` +
      `–${max.toLocaleString("sv-SE")} kr`;
    if (deductionSelect) {
      let rate = 0;
      if (deductionSelect.value === "rot") rate = 0.3;
      if (deductionSelect.value === "rut") rate = 0.5;
      if (rate > 0) {
        const minAfter = Math.round(min * (1 - rate));
        const maxAfter = Math.round(max * (1 - rate));
        priceAfter.textContent =
          `Efter avdrag: ca ${minAfter.toLocaleString("sv-SE")}` +
          `–${maxAfter.toLocaleString("sv-SE")} kr`;
      } else {
        priceAfter.textContent = "";
      }
    }
  }
}

document.getElementById("tasks").addEventListener("input", calculatePrice);
document.getElementById("tasks").addEventListener("change", calculatePrice);

const deductionSelect = document.getElementById("deduction");
const priceAfter = document.getElementById("priceAfterDeduction");
if (deductionSelect) {
  deductionSelect.addEventListener("change", calculatePrice);
}

function createTaskRow() {
  const row = document.createElement("div");
  row.className = "task-row";
  const sel = document.createElement("select");
  sel.name = "jobbTyp[]";
  const first = document.createElement("option");
  first.value = "";
  first.textContent = "— Välj arbetstyp —";
  sel.appendChild(first);
  populate(sel);
  const inp = document.createElement("input");
  inp.type = "text";
  inp.name = "jobbMängd[]";
  inp.placeholder = "Mängd/enhet";
  row.append(sel, inp);
  return row;
}

document.getElementById("addTask").addEventListener("click", () => {
  const tasks = document.getElementById("tasks");
  tasks.appendChild(createTaskRow());
  calculatePrice();
});

const imageUpload = document.getElementById("imageUpload");
const fileList = document.getElementById("fileList");
imageUpload.addEventListener("change", () => {
  if (imageUpload.files.length === 0) {
    fileList.textContent = "Inga filer valda";
  } else {
    const names = Array.from(imageUpload.files)
      .map(f => f.name)
      .join(", ");
    fileList.textContent = "Valda filer: " + names;
  }
});

document.getElementById("offerForm").addEventListener("submit", e => {
  e.preventDefault();
  const offerId = "OFFERT-" + Date.now();
  document.getElementById("confirmationBox").textContent =
    `Din offertförfrågan (ID: ${offerId}) har skickats.`;
  document.getElementById("confirmationBox").style.display = "block";
  e.target.reset();
  const tasks = document.getElementById("tasks");
  tasks.innerHTML = "";
  tasks.appendChild(createTaskRow());
  document.getElementById("priceEstimate").textContent =
    "Uppskattat totalpris visas här...";
  if (priceAfter) priceAfter.textContent = "";
  fileList.textContent = "Inga filer valda";
});

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach(b => b.classList.remove("active"));
    document
      .querySelectorAll("section")
      .forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

document.querySelectorAll(".logo, .hero-logo").forEach(el => {
  el.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach(b => b.classList.remove("active"));
    document
      .querySelectorAll("section")
      .forEach(s => s.classList.remove("active"));
    document.querySelector('[data-tab="home"]').classList.add("active");
    document.getElementById("home").classList.add("active");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();