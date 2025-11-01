
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

const catalog = document.getElementById("catalog");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupSpecs = document.getElementById("popup-specs");
const popupDesc = document.getElementById("popup-desc");
const popupPrice = document.getElementById("popup-price");
const popupOldPrice = document.getElementById("popup-oldprice");
const closeBtn = document.querySelector(".close");

let currentImages = [];
let currentIndex = 0;

function formatPrice(num) {
  return (Number(num) || 0).toLocaleString("ru-RU") + " ₽";
}

function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  return String(text);
}

function renderCatalog() {
  catalog.innerHTML = "";
  machines.forEach(machine => {
    const card = document.createElement("div");
    card.className = "card";
    const mainImg = machine.images[0] || "";
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${mainImg}" alt="${escapeHtml(machine.name)}">
      </div>
      <div class="card-content">
        <h3>${escapeHtml(machine.name)}</h3>
        <p class="card-type">Тип: ${escapeHtml(machine.type)}</p>
        <p class="card-kind">Вид: ${escapeHtml(machine.kind)}</p>
      </div>
    `;
    card.querySelector("img").addEventListener("click", () => showPopup(machine));
    catalog.appendChild(card);
  });
}

function showPopup(machine) {
  currentImages = machine.images || [];
  currentIndex = 0;
  popupImg.src = currentImages[currentIndex] || "";

  popupTitle.textContent = machine.name;

  let specsHTML = "";

  // стандартные характеристики
  const basicSpecs = {
    "Тип станка": machine.type,
    "Вид станка": machine.kind,
    "Мощность, кВт": machine.power,
    "Размеры": machine.dimensions,
    "Масса, кг": machine.weight,
    "Производитель": machine.manufacturer,
    "Страна": machine.country,
    "Год выпуска": machine.year
  };
  for (const key in basicSpecs) {
    specsHTML += `<tr><td class="label">${escapeHtml(key)}</td><td>${escapeHtml(basicSpecs[key])}</td></tr>`;
  }

  // уникальные характеристики
  if (Array.isArray(machine.uniqueSpecs)) {
    machine.uniqueSpecs.forEach(spec => {
      specsHTML += `<tr><td class="label">${escapeHtml(spec.label)}</td><td>${escapeHtml(spec.value)}</td></tr>`;
    });
  }

  popupSpecs.innerHTML = specsHTML;

  popupPrice.textContent = formatPrice(machine.price);
  popupOldPrice.textContent = formatPrice(machine.oldPrice);
  popupDesc.textContent = machine.description || "";

  popup.style.display = "block";
}

// навигация по картинкам
document.querySelector(".nav-btn.prev").addEventListener("click", e => {
  e.stopPropagation();
  if (!currentImages.length) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  popupImg.src = currentImages[currentIndex];
});
document.querySelector(".nav-btn.next").addEventListener("click", e => {
  e.stopPropagation();
  if (!currentImages.length) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  popupImg.src = currentImages[currentIndex];
});

// закрытие popup
closeBtn.addEventListener("click", () => popup.style.display = "none");
window.addEventListener("click", e => { if (e.target === popup) popup.style.display = "none"; });

// Модалка увеличения изображения
const imageModal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.querySelector(".image-modal-close");

popupImg.addEventListener("click", () => {
  modalImg.src = popupImg.src;
  imageModal.style.display = "block";
});
modalClose.addEventListener("click", () => { imageModal.style.display = "none"; });
imageModal.addEventListener("click", e => { if (e.target === imageModal) imageModal.style.display = "none"; });

renderCatalog();

