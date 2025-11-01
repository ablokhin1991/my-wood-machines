const machines = [
  {
    id: 1,
    name: "Боровичи С25-5А",
    type: "Строгальный",
    kind: "Четырёхсторонний",
    manufacturer: "БЗДС",
    country: "Россия",
    year: 2002,
    power: 49.6,
    dimensions: "4800x2000x1500",
    weight: 5200,
    images: [
      "images/wood-machines/borovichi-s25-5a-2002-1.webp",
      "images/wood-machines/borovichi-s25-5a-2002-2.webp",
      "images/wood-machines/borovichi-s25-5a-2002-3.webp"
    ],
    price: 1000000,
    oldPrice: 1299000,
    description:
      "Состояние отличное, все работает! Станок подключен, можно проверить. Станина станка выполнена из тяжелого литого металла с особой обработкой, что полностью гасит вибрации во время работы и обеспечивает выпуск изделий высокого качества. Шпиндели высокой скорости и повышенной точности гарантируют стабильность обработки. Подающие столы сделаны из стали 40Х с хромовым покрытием для долговечности и износоустойчивости. Механизм подачи рассредоточенного типа с верхними и нижними роликами обеспечивает ровное движение заготовки. Привод подачи реализован через электродвигатель с двухступенчатыми шкивами на валу двигателя и модулях. Шкивы трёхручьевые с применением стандартных клиновых ремней, а шкив на валу модулей свободно перемещается, создавая четыре постоянные передачи. В сочетании с частотным преобразователем диапазон скоростей подачи достигает 2–40 м/мин, что позволяет легко протягивать любые заготовки. Верхние ролики оснащены механическими прижимами для работы даже при низких отрицательных температурах, а по желанию их можно оснастить пневматической системой с плавной регулировкой давления, индивидуально для каждого ролика. Рифление «волчий зуб» верхних роликов обеспечивает эффективную обработку древесины любой влажности с минимальным вдавливанием. Система аспирации рассчитана на 2000 м³/ч на один суппорт, что обеспечивает чистоту рабочей зоны.",
    uniqueSpecs: [
      { label: "Количество шпинделей", value: 5 },
      { label: "Ширина заготовки, мм", value: "35-260" },
      { label: "Высота заготовки, мм", value: "12-160" },
      { label: "Скорость работы, м/мин", value: "2-40" },
      { label: "Мин. длина заготовки в потоке, мм", value: 250 },
      { label: "Мин. длина одиночной заготовки, мм", value: 700 },
      { label: "Диаметр выходных патрубков аспирации, мм", value: 150 },
      { label: "Производительность требуемой аспирации, м3/ч", value: "5х2000" }
    ]
  },
  {
    id: 2,
    name: "Фрезерный станок Makita PRO-F17",
    type: "Фрезерный",
    kind: "Настольный",
    manufacturer: "Makita",
    country: "Япония",
    year: 2017,
    power: 1.5,
    dimensions: "900x500x800",
    weight: 60,
    images: [
      "https://via.placeholder.com/300x180?text=Makita+1",
      "https://via.placeholder.com/300x180?text=Makita+2"
    ],
    price: 85000,
    oldPrice: 105000,
    description: "Фрезерный станок для профессиональной обработки древесины."
  }
];

const catalog = document.getElementById("catalog");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupSpecs = document.getElementById("popup-specs");
const popupDesc = document.getElementById("popup-desc");
const popupPrice = document.getElementById("popup-price");
const popupOldPrice = document.getElementById("popup-oldprice");
const closeBtn = document.querySelector(".close");
const filtersSection = document.getElementById("filters");
const toggleFiltersBtn = document.getElementById("toggle-filters");

let currentImages = [];
let currentIndex = 0;

function formatPrice(num) {
  return (Number(num) || 0).toLocaleString("ru-RU") + " ₽";
}

// simple escape for description insertion into card (we only insert plain text into card short-desc)
function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text);
}

function renderCatalog(filter = {}) {
  catalog.innerHTML = "";

  const filtered = machines.filter(machine => {
    return (
      (!filter.type || machine.type === filter.type) &&
      (!filter.kind || machine.kind === filter.kind) &&
      (!filter.manufacturer || machine.manufacturer.toLowerCase().includes(filter.manufacturer.toLowerCase())) &&
      (!filter.country || machine.country.toLowerCase().includes(filter.country.toLowerCase())) &&
      (!filter.year || machine.year == filter.year) &&
      (!filter.power || machine.power == filter.power) &&
      (!filter.weight || machine.weight == filter.weight)
    );
  });

  filtered.forEach(machine => {
    const card = document.createElement("div");
    card.className = "card";

    const mainImg = machine.images && machine.images[0] ? machine.images[0] : "";
    const hoverImg = machine.images && machine.images[1] ? machine.images[1] : mainImg;

    card.innerHTML = `
      <div class="card-img-wrapper">
        <span class="used-label">б/у</span>
        <img src="${mainImg}" alt="${escapeHtml(machine.name)}">
        <img src="${hoverImg}" class="second" alt="доп фото">
      </div>
      <div class="card-content">
        <h3>${escapeHtml(machine.name)}</h3>
        <p class="short-desc">${escapeHtml(machine.description)}</p>
        <p class="card-type">Тип: ${escapeHtml(machine.type || "-")}</p>
        ${machine.kind ? `<p class="card-kind">Вид: ${escapeHtml(machine.kind)}</p>` : ""}
        <p class="card-year">Год: ${escapeHtml(machine.year)}</p>
        <div class="card-price">
          <span>${formatPrice(machine.price)}</span>
          <span class="oldprice">${formatPrice(machine.oldPrice)}</span>
        </div>
        <div class="fake-button">Подробнее</div>
      </div>
    `;

    // карточка целиком кликабельна
    card.addEventListener("click", () => showPopup(machine));

    catalog.appendChild(card);
  });
}

function showPopup(machine) {
  currentImages = Array.isArray(machine.images) && machine.images.length ? machine.images : [""];
  currentIndex = 0;
  updatePopupImage();

  popupTitle.textContent = machine.name || "";

  // собираем стандартные характеристики
  let specsHTML = "";
  specsHTML += `<li><strong>Тип станка:</strong> ${escapeHtml(machine.type || "-")}</li>`;
  if (machine.kind) specsHTML += `<li><strong>Вид станка:</strong> ${escapeHtml(machine.kind)}</li>`;
  specsHTML += `<li><strong>Мощность:</strong> ${escapeHtml(machine.power)} кВт</li>`;
  specsHTML += `<li><strong>Размеры:</strong> ${escapeHtml(machine.dimensions)}</li>`;
  specsHTML += `<li><strong>Масса:</strong> ${escapeHtml(machine.weight)} кг</li>`;
  specsHTML += `<li><strong>Производитель:</strong> ${escapeHtml(machine.manufacturer)}</li>`;
  specsHTML += `<li><strong>Страна:</strong> ${escapeHtml(machine.country)}</li>`;
  specsHTML += `<li><strong>Год выпуска:</strong> ${escapeHtml(machine.year)}</li>`;

  // добавляем уникальные характеристики, если есть
  if (Array.isArray(machine.uniqueSpecs) && machine.uniqueSpecs.length) {
    machine.uniqueSpecs.forEach(spec => {
      specsHTML += `<li><strong>${escapeHtml(spec.label)}:</strong> ${escapeHtml(spec.value)}</li>`;
    });
  }

  popupSpecs.innerHTML = specsHTML;

  popupPrice.textContent = formatPrice(machine.price);
  popupOldPrice.textContent = formatPrice(machine.oldPrice);

  // описание в popup — plain text (если захочешь HTML, нужно хранить безопасно и присваивать innerHTML)
  popupDesc.textContent = machine.description || "";

  // добавляем шильдик "б/у" в popup-gallery (если ещё нет)
  const gallery = popup.querySelector(".popup-gallery");
  if (gallery) {
    const existing = gallery.querySelector(".used-label-popup");
    if (!existing) {
      const label = document.createElement("span");
      label.className = "used-label-popup";
      label.textContent = "б/у";
      gallery.appendChild(label);
    }
  }

  popup.style.display = "block";
}

function updatePopupImage() {
  popupImg.src = currentImages[currentIndex] || "";
}

// nav buttons safe attach
const prevBtn = document.querySelector(".nav-btn.prev");
const nextBtn = document.querySelector(".nav-btn.next");

if (prevBtn) {
  prevBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updatePopupImage();
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updatePopupImage();
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => (popup.style.display = "none"));
}

window.addEventListener("click", e => {
  if (e.target === popup) popup.style.display = "none";
});

// фильтры
const filterIds = [
  "filter-type",
  "filter-kind",
  "filter-manufacturer",
  "filter-country",
  "filter-year",
  "filter-power",
  "filter-weight"
];

filterIds.forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  // для select используем change, для input — input
  const eventName = el.tagName.toLowerCase() === "select" ? "change" : "input";
  el.addEventListener(eventName, updateFilters);
});

const clearBtn = document.getElementById("clear-filters");
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    document.querySelectorAll(".filters input, .filters select").forEach(el => (el.value = ""));
    renderCatalog();
  });
}

function updateFilters() {
  const filter = {
    type: document.getElementById("filter-type")?.value || "",
    kind: document.getElementById("filter-kind")?.value || "",
    manufacturer: document.getElementById("filter-manufacturer")?.value || "",
    country: document.getElementById("filter-country")?.value || "",
    year: document.getElementById("filter-year")?.value || "",
    power: document.getElementById("filter-power")?.value || "",
    weight: document.getElementById("filter-weight")?.value || ""
  };
  renderCatalog(filter);
}

if (toggleFiltersBtn) {
  toggleFiltersBtn.addEventListener("click", () => {
    filtersSection.classList.toggle("active");
  });
}

// init
renderCatalog();

