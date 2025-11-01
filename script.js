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
    description: "Состояние отличное, все работает! Станок подключен, можно проверить. Станина станка выполнена из тяжелого литого металла...",
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
    name: "Фрезерный станок ФС",
    type: "Фрезерный",
    kind: "Горизонтальный",
    manufacturer: "Главдревстанкопром",
    country: "СССР",
    year: 1971,
    power: 5,
    dimensions: "1360x1265x1200",
    weight: 880,
    images: [
      "images/wood-machines/frezernyy-stanok-fs-1971-1.webp",
      "images/wood-machines/frezernyy-stanok-fs-1971-2.webp",
      "images/wood-machines/frezernyy-stanok-fs-1971-3.webp"
    ],
    price: 75000,
    oldPrice: 105000,
    description: "Редкая и надёжная машина советского времени, выпущенная в 1971 году заводом Главдревстанкопром (г. Днепропетровск). Он создан специально для деревообработки: фрезеровки профилей, торцов, фигурных элементов и других столярных задач. Модель ФС 1971 объединяет классическую конструкцию с мощным приводом 5 кВт, что делает его отличным решением для мастерской с высоким уровнем нагрузки."
  }
];

const typeToKindMap = {
  "Строгальный": ["Долбёжный","Комбинированный","Рейсмусовый","Фуговальный","Четырёхсторонний","Шипорезный"],
  "Фрезерный": ["Горизонтальный","Копировально-фрезерный","Вертикальный"],
  "Распиловочный": ["Виды автоматические и полуавтоматические","Дисковый многопильный","Циркулярный","Форматно-раскроечный"],
  "Лобзиковый": ["Ленточный"],
  "Торцовочный": ["Ручной","Стационарный"],
  "Шлифовальный": ["Ленточный"]
};

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

const filterTypeEl = document.getElementById("filter-type");
const filterKindEl = document.getElementById("filter-kind");
filterKindEl.disabled = true;

let currentImages = [];
let currentIndex = 0;

function formatPrice(num) {
  return (Number(num) || 0).toLocaleString("ru-RU") + " ₽";
}

function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text);
}

function renderCatalog(filter = {}) {
  catalog.innerHTML = "";

  const filtered = machines.filter(machine => 
    (!filter.type || machine.type === filter.type) &&
    (!filter.kind || machine.kind === filter.kind) &&
    (!filter.manufacturer || machine.manufacturer.toLowerCase().includes(filter.manufacturer.toLowerCase())) &&
    (!filter.country || machine.country.toLowerCase().includes(filter.country.toLowerCase())) &&
    (!filter.year || machine.year == filter.year) &&
    (!filter.power || machine.power == filter.power) &&
    (!filter.weight || machine.weight == filter.weight)
  );

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

    card.addEventListener("click", () => showPopup(machine));
    catalog.appendChild(card);
  });
}

function showPopup(machine) {
  currentImages = Array.isArray(machine.images) && machine.images.length ? machine.images : [""];
  currentIndex = 0;
  updatePopupImage();

  popupTitle.textContent = machine.name || "";

  let specsHTML = `<li><strong>Тип станка:</strong> ${escapeHtml(machine.type || "-")}</li>`;
  if (machine.kind) specsHTML += `<li><strong>Вид станка:</strong> ${escapeHtml(machine.kind)}</li>`;
  specsHTML += `<li><strong>Мощность:</strong> ${escapeHtml(machine.power)} кВт</li>`;
  specsHTML += `<li><strong>Размеры:</strong> ${escapeHtml(machine.dimensions)}</li>`;
  specsHTML += `<li><strong>Масса:</strong> ${escapeHtml(machine.weight)} кг</li>`;
  specsHTML += `<li><strong>Производитель:</strong> ${escapeHtml(machine.manufacturer)}</li>`;
  specsHTML += `<li><strong>Страна:</strong> ${escapeHtml(machine.country)}</li>`;
  specsHTML += `<li><strong>Год выпуска:</strong> ${escapeHtml(machine.year)}</li>`;

  if (Array.isArray(machine.uniqueSpecs) && machine.uniqueSpecs.length) {
    machine.uniqueSpecs.forEach(spec => {
      specsHTML += `<li><strong>${escapeHtml(spec.label)}:</strong> ${escapeHtml(spec.value)}</li>`;
    });
  }

  popupSpecs.innerHTML = specsHTML;
  popupPrice.textContent = formatPrice(machine.price);
  popupOldPrice.textContent = formatPrice(machine.oldPrice);
  popupDesc.textContent = machine.description || "";

  const gallery = popup.querySelector(".popup-gallery");
  if (gallery && !gallery.querySelector(".used-label-popup")) {
    const label = document.createElement("span");
    label.className = "used-label-popup";
    label.textContent = "б/у";
    gallery.appendChild(label);
  }

  popup.style.display = "block";
}

function updatePopupImage() {
  popupImg.src = currentImages[currentIndex] || "";
}

const prevBtn = document.querySelector(".nav-btn.prev");
const nextBtn = document.querySelector(".nav-btn.next");

if (prevBtn) prevBtn.addEventListener("click", e => {
  e.stopPropagation();
  if (!currentImages.length) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updatePopupImage();
});

if (nextBtn) nextBtn.addEventListener("click", e => {
  e.stopPropagation();
  if (!currentImages.length) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  updatePopupImage();
});

if (closeBtn) closeBtn.addEventListener("click", () => popup.style.display = "none");
window.addEventListener("click", e => { if (e.target === popup) popup.style.display = "none"; });

// фильтры
filterTypeEl.addEventListener("change", () => {
  const selectedType = filterTypeEl.value;
  filterKindEl.innerHTML = '<option value="">Все</option>';
  if (typeToKindMap[selectedType]) {
    typeToKindMap[selectedType].forEach(k => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = k;
      filterKindEl.appendChild(opt);
    });
    filterKindEl.disabled = false;
  } else {
    filterKindEl.disabled = true;
  }
  updateFilters();
});

["filter-kind","filter-manufacturer","filter-country","filter-year","filter-power","filter-weight"].forEach(id => {
  const el = document.getElementById(id);
  if(el) el.addEventListener(el.tagName.toLowerCase()==="select"?"change":"input", updateFilters);
});

document.getElementById("clear-filters").addEventListener("click", () => {
  document.querySelectorAll(".filters input, .filters select").forEach(el => el.value="");
  filterKindEl.disabled = true;
  renderCatalog();
});

if(toggleFiltersBtn) toggleFiltersBtn.addEventListener("click", ()=>filtersSection.classList.toggle("active"));

function updateFilters() {
  const filter = {
    type: filterTypeEl.value,
    kind: filterKindEl.value,
    manufacturer: document.getElementById("filter-manufacturer")?.value || "",
    country: document.getElementById("filter-country")?.value || "",
    year: document.getElementById("filter-year")?.value || "",
    power: document.getElementById("filter-power")?.value || "",
    weight: document.getElementById("filter-weight")?.value || ""
  };
  renderCatalog(filter);
}

// init
renderCatalog();


// Модальное окно для увеличения картинки
const imageModal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.querySelector(".image-modal-close");

// Клик по картинке в popup открывает модалку
popupImg.addEventListener("click", () => {
  modalImg.src = popupImg.src;
  imageModal.style.display = "block";
});

// Закрытие модалки крестиком
modalClose.addEventListener("click", () => {
  imageModal.style.display = "none";
});

// Закрытие при клике вне картинки
imageModal.addEventListener("click", e => {
  if (e.target === imageModal) {
    imageModal.style.display = "none";
  }
});
