const fs = require("fs");
const vm = require("vm");

const src = fs
  .readFileSync("machines-data.js", "utf8")
  .replace(/\bconst machines\b/, "var machines");
const context = { module: { exports: {} }, exports: {} };
vm.createContext(context);
vm.runInContext(src + "\nmodule.exports = machines;", context);
const machines = context.module.exports;

const SITE = "https://prodam-stanki.ru";
const now = new Date();
const pad = (n) => String(n).padStart(2, "0");
const dateStr =
  now.getFullYear() +
  "-" +
  pad(now.getMonth() + 1) +
  "-" +
  pad(now.getDate()) +
  " " +
  pad(now.getHours()) +
  ":" +
  pad(now.getMinutes());

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hasYear(y) {
  if (y === undefined || y === null || y === "" || y === "-") return false;
  return /^\d{4}$/.test(String(y).trim());
}

function titleWithYear(m) {
  if (hasYear(m.year)) return m.name + ", " + String(m.year).trim() + " г.";
  return m.name;
}

function imgUrl(img) {
  if (!img) return "";
  const p = img.startsWith("/") ? img : "/" + img;
  return SITE + p;
}

function offerUrl(id) {
  // Query-параметр, а не #hash: Яндекс считает URL с одним и тем же путём дубликатами
  return SITE + "/?machine=" + id;
}

function cleanDesc(d) {
  return String(d || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 3000);
}

function csvEsc(s) {
  const v = String(s ?? "");
  if (/[",\n\r]/.test(v)) return '"' + v.replace(/"/g, '""') + '"';
  return v;
}

const active = machines.filter(
  (m) => (!m.status || m.status === "active") && Number(m.instock) > 0
);

const types = [...new Set(active.map((m) => m.type))];
const catMap = {};
types.forEach((t, i) => {
  catMap[t] = i + 1;
});

let xml = "";
xml += '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<yml_catalog date="' + dateStr + '">\n';
xml += "  <shop>\n";
xml += "    <name>Станки по дереву б/у</name>\n";
xml += "    <company>Prodam-stanki</company>\n";
xml += "    <url>" + SITE + "/</url>\n";
xml += "    <currencies>\n";
xml += '      <currency id="RUB" rate="1"/>\n';
xml += "    </currencies>\n";
xml += "    <categories>\n";
types.forEach((t) => {
  xml += '      <category id="' + catMap[t] + '">' + esc(t) + "</category>\n";
});
xml += "    </categories>\n";
xml += "    <offers>\n";

active.forEach((m) => {
  const available = Number(m.instock) > 0 ? "true" : "false";
  const name = titleWithYear(m);
  const vendor = !m.manufacturer || m.manufacturer === "-" ? "" : m.manufacturer;
  const images = (m.images || []).slice(0, 5);

  xml += '      <offer id="' + m.id + '" available="' + available + '">\n';
  xml += "        <url>" + esc(offerUrl(m.id)) + "</url>\n";
  xml += "        <price>" + m.price + "</price>\n";
  if (m.oldPrice && Number(m.oldPrice) > Number(m.price)) {
    xml += "        <oldprice>" + m.oldPrice + "</oldprice>\n";
  }
  xml += "        <currencyId>RUB</currencyId>\n";
  xml += "        <categoryId>" + catMap[m.type] + "</categoryId>\n";
  images.forEach((img) => {
    xml += "        <picture>" + esc(imgUrl(img)) + "</picture>\n";
  });
  xml += "        <name>" + esc(name) + "</name>\n";
  if (vendor) xml += "        <vendor>" + esc(vendor) + "</vendor>\n";
  xml +=
    "        <description><![CDATA[" +
    cleanDesc(m.description) +
    "]]></description>\n";
  if (m.country && m.country !== "-") {
    xml +=
      "        <country_of_origin>" + esc(m.country) + "</country_of_origin>\n";
  }
  xml += '        <param name="Тип">' + esc(m.type) + "</param>\n";
  if (m.kind) xml += '        <param name="Вид">' + esc(m.kind) + "</param>\n";
  if (hasYear(m.year)) {
    xml +=
      '        <param name="Год выпуска">' +
      esc(String(m.year).trim()) +
      "</param>\n";
  }
  if (m.power && m.power !== "-") {
    xml +=
      '        <param name="Мощность, кВт">' + esc(m.power) + "</param>\n";
  }
  if (m.dimensions && m.dimensions !== "-") {
    xml +=
      '        <param name="Габариты, мм">' + esc(m.dimensions) + "</param>\n";
  }
  if (m.weight && m.weight !== "-") {
    xml += '        <param name="Масса, кг">' + esc(m.weight) + "</param>\n";
  }
  xml += '        <param name="Состояние">Б/у, рабочее</param>\n';
  xml +=
    "        <sales_notes>Продажа от собственника. Самовывоз или отправка по России</sales_notes>\n";
  xml += "        <pickup>true</pickup>\n";
  xml += "        <delivery>true</delivery>\n";
  xml += "      </offer>\n";
});

xml += "    </offers>\n";
xml += "  </shop>\n";
xml += "</yml_catalog>\n";

fs.writeFileSync("yandex-direct-feed.yml", xml, "utf8");

const csvRows = [
  [
    "ID",
    "URL",
    "Image",
    "Title",
    "Description",
    "Price",
    "Currency",
    "Old Price",
    "custom_label_0",
    "custom_label_1",
  ],
];

active.forEach((m) => {
  const img = m.images && m.images[0] ? imgUrl(m.images[0]) : "";
  csvRows.push(
    [
      m.id,
      offerUrl(m.id),
      img,
      titleWithYear(m),
      cleanDesc(m.description).slice(0, 500),
      m.price,
      "RUB",
      m.oldPrice && Number(m.oldPrice) > Number(m.price) ? m.oldPrice : "",
      m.type || "",
      hasYear(m.year) ? String(m.year).trim() : "",
    ].map(csvEsc)
  );
});

// Без BOM: иначе первая колонка читается как "\ufeffID" и Яндекс не видит офферы
fs.writeFileSync(
  "yandex-direct-feed.csv",
  csvRows.map((r) => r.join(",")).join("\r\n") + "\r\n",
  "utf8"
);

console.log("Offers:", active.length);
console.log("Categories:", types.join(", "));
console.log("Sample titles:");
active.slice(0, 8).forEach((m) => console.log(" -", titleWithYear(m)));
const noYear = active.filter((m) => !hasYear(m.year));
console.log(
  "Without year:",
  noYear.length,
  "->",
  noYear.map((m) => m.id).join(", ")
);
