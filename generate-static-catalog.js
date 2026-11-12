/**
 * Пишет карточки каталога и JSON-LD в index.html из machines-data.js.
 * Фильтры и окно «Подробнее» по-прежнему собирает script.js.
 *
 * node generate-static-catalog.js
 */
const fs = require("fs");
const vm = require("vm");

const SITE = "https://prodam-stanki.ru";
const HTML_PATH = "index.html";

function loadMachines() {
  const src = fs
    .readFileSync("machines-data.js", "utf8")
    .replace(/\bconst machines\b/, "var machines");
  const context = {};
  vm.createContext(context);
  vm.runInContext(src, context);
  return context.machines.filter((m) => !m.status || m.status === "active");
}

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jsonForScript(obj) {
  return JSON.stringify(obj, null, 2).replace(/</g, "\\u003c");
}

function formatPrice(n) {
  return Number(n).toLocaleString("ru-RU") + " руб.";
}

function truncateText(text, maxLen) {
  if (!text || text.length <= maxLen) return text || "";
  const truncated = text.substring(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "…";
}

function normalizeImagePath(p) {
  if (!p) return "";
  return p.startsWith("/") ? p : "/" + p;
}

function textFromHtml(html) {
  return String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function extractFaq(html) {
  const items = [];
  const re =
    /<details class="faq-item"[\s\S]*?<summary itemprop="name">([\s\S]*?)<\/summary>[\s\S]*?<div itemprop="text">([\s\S]*?)<\/div>\s*<\/div>\s*<\/details>/g;
  let match;
  while ((match = re.exec(html))) {
    const name = textFromHtml(match[1]);
    const text = textFromHtml(match[2]);
    if (name && text) items.push({ name, text });
  }
  return items;
}

function priceValidUntil(date) {
  return date.getFullYear() + 1 + "-12-31";
}

function renderCard(machine, index) {
  const img1 = machine.images && machine.images[0] ? normalizeImagePath(machine.images[0]) : "";
  const img2 = machine.images && machine.images[1] ? normalizeImagePath(machine.images[1]) : "";
  const thumb1 = img1 ? img1.replace("/wood-machines/", "/wood-machines/thumbs/") : "";
  const thumb2 = img2 ? img2.replace("/wood-machines/", "/wood-machines/thumbs/") : "";
  const loadingAttr = index < 4 ? "eager" : "lazy";
  const priorityAttr = index < 4 ? ' fetchpriority="high"' : "";
  const yearText = !machine.year || machine.year === "-" ? "не указан" : machine.year;
  const powerText = !machine.power || machine.power === "-" ? "не указана" : machine.power + " кВт";
  const shortDesc = truncateText(machine.description, 140);
  const promoBadge = machine.promo
    ? `<span class="badge-promo" aria-label="${esc("Скидка " + machine.promo.discount + "% до " + machine.promo.until)}">−${esc(machine.promo.discount)}%</span>`
    : "";
  const imageHtml = thumb1
    ? `<img class="card-img-main" src="${esc(thumb1)}"${thumb2 ? ` data-hover="${esc(thumb2)}"` : ""} alt="${esc(machine.type + " " + machine.name + " б/у — фото 1")}" width="400" height="300" loading="${loadingAttr}"${priorityAttr} decoding="async" itemprop="image" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="card-image-placeholder" style="display:none">Фото скоро появится</div>`
    : `<div class="card-image-placeholder">Фото скоро появится</div>`;

  return `        <article class="machine-card${machine.promo ? " has-promo" : ""}" id="machine-${machine.id}" itemscope itemtype="https://schema.org/Product">
          <div class="card-image-wrap">
            ${promoBadge}
            ${imageHtml}
          </div>
          <div class="card-body">
            <div class="card-price-row" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
              <meta itemprop="priceCurrency" content="RUB">
              <meta itemprop="price" content="${esc(machine.price)}">
              <link itemprop="availability" href="https://schema.org/InStock">
              <meta itemprop="itemCondition" content="https://schema.org/UsedCondition">
              <span class="card-price">${esc(formatPrice(machine.price))}</span>
              <span class="card-old-price">${esc(formatPrice(machine.oldPrice))}</span>
            </div>
            <h3 class="card-title" itemprop="name">${esc(machine.name)}</h3>
            <div class="card-instock">В наличии: ${esc(machine.instock)} шт.</div>
            <p class="card-desc" itemprop="description">${esc(shortDesc)}</p>
            <ul class="card-specs">
              <li><strong>Тип:</strong> <span itemprop="category">${esc(machine.type)}</span></li>
              <li><strong>Вид:</strong> ${esc(machine.kind)}</li>
              <li><strong>Мощность:</strong> ${esc(powerText)}</li>
              <li><strong>Производитель:</strong> ${esc(machine.manufacturer)}</li>
              <li><strong>Страна:</strong> ${esc(machine.country)}</li>
              <li><strong>Год:</strong> ${esc(yearText)}</li>
            </ul>
            <button type="button" class="btn-more js-more-btn" data-id="${esc(machine.id)}">Подробнее</button>
          </div>
        </article>`;
}

function productNode(machine, validUntil) {
  const normalizedImage =
    machine.images && machine.images[0] ? normalizeImagePath(machine.images[0]) : "";
  const yearText = !machine.year || machine.year === "-" ? "не указан" : String(machine.year);
  const powerText = !machine.power || machine.power === "-" ? "не указана" : machine.power + " кВт";
  const weightText = !machine.weight || machine.weight === "-" ? "не указана" : machine.weight + " кг";
  const dimensionsText =
    !machine.dimensions || machine.dimensions === "-" ? "не указаны" : machine.dimensions + " мм";
  const additionalProperty = [
    { "@type": "PropertyValue", name: "Состояние", value: "Б/у, рабочее" },
    { "@type": "PropertyValue", name: "Условия хранения", value: "Тёплый отапливаемый цех" },
    { "@type": "PropertyValue", name: "Год выпуска", value: yearText },
    { "@type": "PropertyValue", name: "Мощность", value: powerText },
    { "@type": "PropertyValue", name: "Габариты (ДxШxВ)", value: dimensionsText },
    { "@type": "PropertyValue", name: "Масса", value: weightText },
    { "@type": "PropertyValue", name: "Страна производства", value: machine.country },
  ];
  (machine.uniqueSpecs || []).forEach((spec) => {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: spec.label,
      value: String(spec.value),
    });
  });
  return {
    "@type": "Product",
    name: machine.name,
    description: machine.description,
    image: normalizedImage ? SITE + normalizedImage : undefined,
    sku: "STANOK-" + machine.id,
    category: machine.type + " / " + machine.kind,
    brand: { "@type": "Brand", name: machine.manufacturer },
    offers: {
      "@type": "Offer",
      url: SITE + "/?machine=" + machine.id,
      priceCurrency: "RUB",
      price: String(machine.price),
      priceValidUntil: validUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
      seller: { "@id": SITE + "/#business" },
    },
    additionalProperty,
  };
}

function buildJsonLd(machines, faq, validUntil) {
  const blocks = [];
  blocks.push({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE + "/#business",
    name: "Станки по деревообработке б/у от собственника",
    description:
      "Продажа б/у деревообрабатывающих станков от собственника в г. Александров, Владимирская область. Четырёхсторонние, фрезерные, шлифовальные, распиловочные станки.",
    url: SITE + "/",
    telephone: "+7-910-092-82-79",
    priceRange: "₽₽",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. П. Топоркова, 21",
      addressLocality: "Александров",
      addressRegion: "Владимирская область",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 56.396623,
      longitude: 38.697473,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "19:00",
    },
    areaServed: [
      { "@type": "City", name: "Александров" },
      { "@type": "State", name: "Владимирская область" },
      { "@type": "Country", name: "Россия" },
    ],
  });

  if (faq.length) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": SITE + "/#faq",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.name,
        acceptedAnswer: { "@type": "Answer", text: item.text },
      })),
    });
  }

  blocks.push({
    "@context": "https://schema.org",
    "@graph": machines.map((machine) => productNode(machine, validUntil)),
  });

  blocks.push({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Каталог деревообрабатывающих станков б/у",
    description: "Станки по деревообработке б/у от собственника в г. Александров, Владимирская область",
    numberOfItems: machines.length,
    itemListElement: machines.map((machine, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: SITE + "/?machine=" + machine.id,
      item: {
        "@type": "Product",
        name: machine.name,
        description: machine.description,
        offers: {
          "@type": "Offer",
          price: String(machine.price),
          priceCurrency: "RUB",
          priceValidUntil: validUntil,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/UsedCondition",
        },
      },
    })),
  });

  blocks.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": SITE + "/#webpage",
    url: SITE + "/",
    name: "Станки по деревообработке б/у от собственника — г. Александров, Владимирская область",
    description:
      "Купить деревообрабатывающий станок б/у от собственника в г. Александров. Четырёхсторонние, фрезерные, шлифовальные станки. Прямая продажа без посредников.",
    inLanguage: "ru-RU",
    isPartOf: {
      "@type": "WebSite",
      "@id": SITE + "/#website",
      url: SITE + "/",
      name: "Станки по деревообработке б/у",
      publisher: { "@id": SITE + "/#business" },
    },
    about: { "@type": "Thing", name: "Деревообрабатывающие станки б/у" },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".hero", ".catalog-section", ".faq-section"],
    },
  });

  blocks.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Главная", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: "Каталог станков", item: SITE + "/#catalog" },
    ],
  });

  return blocks
    .map((block) => `<script type="application/ld+json">\n${jsonForScript(block)}\n</script>`)
    .join("\n");
}

function replaceMarked(html, start, end, inner, nl) {
  const startAt = html.indexOf(start);
  const endAt = html.indexOf(end);
  if (startAt < 0 || endAt < 0 || endAt < startAt) {
    throw new Error("В index.html нет меток " + start + " … " + end);
  }
  return html.slice(0, startAt + start.length) + nl + inner + nl + html.slice(endAt);
}

function generate() {
  const machines = loadMachines();
  const raw = fs.readFileSync(HTML_PATH, "utf8");
  const nl = raw.includes("\r\n") ? "\r\n" : "\n";
  const validUntil = priceValidUntil(new Date());
  const cards = machines.map(renderCard).join(nl);
  const faq = extractFaq(raw);
  const jsonld = buildJsonLd(machines, faq, validUntil);
  let html = replaceMarked(raw, "<!-- static-catalog:start -->", "<!-- static-catalog:end -->", cards, nl);
  html = replaceMarked(html, "<!-- static-jsonld:start -->", "<!-- static-jsonld:end -->", jsonld, nl);
  fs.writeFileSync(HTML_PATH, html, "utf8");
  console.log(
    "index.html: карточек",
    machines.length,
    ", вопросов FAQ",
    faq.length,
    ", priceValidUntil",
    validUntil
  );
}

if (require.main === module) generate();
module.exports = generate;
