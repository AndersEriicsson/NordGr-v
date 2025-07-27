"use strict";

const arbeten = [
  { name: "{{service_name_1}}", price: "{{service_price_1}}", unit: "{{service_unit_1}}" },
  { name: "{{service_name_2}}", price: "{{service_price_2}}", unit: "{{service_unit_2}}" },
  { name: "{{service_name_3}}", price: "{{service_price_3}}", unit: "{{service_unit_3}}" },
  { name: "{{service_name_4}}", price: "{{service_price_4}}", unit: "{{service_unit_4}}" },
  { name: "{{service_name_5}}", price: "{{service_price_5}}", unit: "{{service_unit_5}}" },
  { name: "{{service_name_6}}", price: "{{service_price_6}}", unit: "{{service_unit_6}}" },
  { name: "{{service_name_7}}", price: "{{service_price_7}}", unit: "{{service_unit_7}}" },
  { name: "{{service_name_8}}", price: "{{service_price_8}}", unit: "{{service_unit_8}}" },
  { name: "{{service_name_9}}", price: "{{service_price_9}}", unit: "{{service_unit_9}}" },
  { name: "{{service_name_10}}", price: "{{service_price_10}}", unit: "{{service_unit_10}}" },
  { name: "{{service_name_11}}", price: "{{service_price_11}}", unit: "{{service_unit_11}}" },
  { name: "{{service_name_12}}", price: "{{service_price_12}}", unit: "{{service_unit_12}}" },
  { name: "{{service_name_13}}", price: "{{service_price_13}}", unit: "{{service_unit_13}}" },
  { name: "{{service_name_14}}", price: "{{service_price_14}}", unit: "{{service_unit_14}}" }
];

function populate(select) {
  arbeten.forEach(a => {
    const price = parseFloat(a.price);
    const min = isNaN(price) ? 0 : Math.round(price * 0.9);
    const max = isNaN(price) ? 0 : Math.round(price * 1.1);
    const o = document.createElement("option");
    o.value = a.name;
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
