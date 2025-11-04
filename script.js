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
    instock: 1,
    images: [
      "images/wood-machines/borovichi-s25-5a-2002-1.webp",
      "images/wood-machines/borovichi-s25-5a-2002-2.webp",
      "images/wood-machines/borovichi-s25-5a-2002-3.webp",
      "images/wood-machines/borovichi-s25-5a-2002-4.webp"
    ],
    price: 1000000,
    oldPrice: 1299000,
    description: "Пятишпиндельный станок тяжелой серии предназначен для производства различных погонажных изделий и профилированного бруса, в том числе естественной влажности. Станок в отличном состоянии и полностью рабочий!",
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
    instock: 1,
    images: [
      "images/wood-machines/frezernyy-stanok-fs-1971-1.webp",
      "images/wood-machines/frezernyy-stanok-fs-1971-2.webp",
      "images/wood-machines/frezernyy-stanok-fs-1971-3.webp"
    ],
    price: 75000,
    oldPrice: 105000,
    description: "Редкая и надёжная машина советского времени, выпущенная в 1971 году заводом Главдревстанкопром (г. Днепропетровск). Он создан специально для деревообработки: фрезеровки профилей, торцов, фигурных элементов и других столярных задач. Модель ФС 1971 объединяет классическую конструкцию с мощным приводом 5 кВт, что делает его отличным решением для мастерской с высоким уровнем нагрузки."
  },
  {
    id: 3,
    name: "Фрезерный станок ФСШ-1",
    type: "Фрезерный",
    kind: "Горизонтальный",
    manufacturer: "ДСПО",
    country: "СССР",
    year: 1980,
    power: 5,
    dimensions: "1270x1110x1000",
    weight: 810,
    instock: 1,
    images: [
      "images/wood-machines/frezernyy-stanok-fssh-1-1980-1.webp",
      "images/wood-machines/frezernyy-stanok-fssh-1-1980-2.webp",
      "images/wood-machines/frezernyy-stanok-fssh-1-1980-3.webp"
    ],
    price: 75000,
    oldPrice: 105000,
    description: "Надёжный представитель советской инженерной школы, выпущенный в 1980 году Днепропетровским станкостроительным заводом (ДСПО). Эта модель создана для точной и стабильной работы по дереву: идеально подходит для фрезеровки профилей, торцов, фигурных и сложных элементов. Мощный двигатель 5 кВт и частота вращения шпинделя до 9000 об/мин обеспечивают уверенную обработку даже твёрдых пород древесины. При весе 810 кг станок стоит монолитно и исключает вибрации, что повышает точность и чистоту обработки. ФСШ-1 — выбор тех, кто ценит советское качество, долговечность и простоту обслуживания. Он одинаково хорош как для частной мастерской, так и для производственного цеха, где ценится стабильный результат и надёжность, проверенная временем."
  },
  {
    id: 4,
    name: "Biesse Rover 49",
    type: "Фрезерный",
    kind: "с ЧПУ",
    manufacturer: "Biesse",
    country: "Италия",
    year: 1988,
    power: 22.6,
    dimensions: "5300x2440x2240",
    weight: 4600,
    instock: 1,
    images: [
      "images/wood-machines/sverlilno-frezernyy-stanok-rover-49-1.webp",
      "images/wood-machines/sverlilno-frezernyy-stanok-rover-49-2.webp",
      "images/wood-machines/sverlilno-frezernyy-stanok-rover-49-3.webp",
      "images/wood-machines/sverlilno-frezernyy-stanok-rover-49-4.webp",
      "images/wood-machines/sverlilno-frezernyy-stanok-rover-49-5.webp",
      "images/wood-machines/sverlilno-frezernyy-stanok-rover-49-6.webp"
    ],
    price: 1500000,
    oldPrice: 1799000,
    description: 
    "Редкая находка для мебельного производства и любых предприятий, где ценят надёжность, стабильность и долговечность оборудования. Этот станок построен так, что один раз настроив на деталь, можно работать круглосуточно без остановки, что делает его идеальным решением для поточного и массового производства. \n\nСтанок работает по координатам X, Y и Z, может фрезеровать криволинейные профили, пазы, выборки и фигурные элементы с высокой точностью. Оснащён 36 вертикальными шпинделями и 12 горизонтальными, что позволяет одновременно выполнять присадку множества отверстий на панели с четырёх сторон — идеальное решение для серийного производства. Два фрезера со стандартными цангами и два с конусом Морзе CM2 обеспечивают возможность работы с фрезами разного диаметра и формы, включая дисковые фрезы до Ø120 мм. Шпиндели фрезеров работают до 18 000 об/мин с мощностью до 5,59 кВт, а дисковые фрезы обеспечивают быстрый и точный рез любой древесины или композитных материалов. Станок рассчитан на непрерывное производство, один раз настроив на деталь, можно работать круглосуточно без остановки. При желании можно за небольшие деньги обновить главный компьютер, и станок будет работать на современном уровне. Для сравнения: аналогичная модель Biesse Rover 2025 года сегодня продаётся от 20 млн рублей. ROVER 49 даёт практически те же возможности за разумные деньги.",
    uniqueSpecs: [
      { label: "Рабочее поле, мм", value: "3200x1304" },
      { label: "Скорость Ось X, м/мин", value: 34 },
      { label: "Скорость Ось Y, м/мин", value: 30 },
      { label: "Скорость Ось Z, м/мин", value: 15 },
      { label: "Мощность сверлильных головок, кВт", value: 1.34 },
      { label: "Хвостовик сверла Ø, мм", value: 10 },
      { label: "Высота заготовки, мм", value: "12-160" },
      { label: "Скорость работы, м/мин", value: "2-40" },
      { label: "Мин. длина заготовки в потоке, мм", value: 250 },
      { label: "Мин. длина одиночной заготовки, мм", value: 700 },
      { label: "Диаметр выходных патрубков аспирации, мм", value: 150 },
      { label: "Производительность требуемой аспирации, м3/ч", value: "5х2000" }
    ]
  },
];

const typeToKindMap = {
  "Строгальный": ["Долбёжный","Комбинированный","Рейсмусовый","Фуговальный","Четырёхсторонний","Шипорезный"],
  "Фрезерный": ["Горизонтальный","Копировально-фрезерный","Вертикальный", "с ЧПУ"],
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
        <div class="card-price">
          <span>${formatPrice(machine.price)}</span>
          <span class="oldprice">${formatPrice(machine.oldPrice)}</span>
        </div>
        <h3>${escapeHtml(machine.name)}</h3>
        <p class="card-in-stock" style="color: rgb(60, 170, 60); font-size: 0.95rem; line-height: 0.7;">В наличии: ${escapeHtml(machine.instock)} шт.   <i class="fa-solid fa-check"></i></p>
        <p class="short-desc" style="color: #777777;">${escapeHtml(machine.description)}</p>
        <p class="card-type card-spec">Тип: ${escapeHtml(machine.type || "-")}</p>
        ${machine.kind ? `<p class="card-kind card-spec">Вид: ${escapeHtml(machine.kind)}</p>` : ""}
        <p class="card-power card-spec">Мощность, кВт: ${escapeHtml(machine.power)}</p>
        <p class="card-country card-spec">Страна: ${escapeHtml(machine.country)}</p>
        <p class="card-year card-spec">Год: ${escapeHtml(machine.year)}</p>
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

  // формируем таблицу вместо списка
  let specsHTML = '<table style="border-collapse: collapse; width: 100%;">';

  const basicSpecs = [
    { label: "Тип станка", value: machine.type || "-" },
    { label: "Вид станка", value: machine.kind || "-" },
    { label: "Мощность, кВт", value: machine.power },
    { label: "Размеры, мм", value: machine.dimensions },
    { label: "Масса, кг", value: machine.weight },
    { label: "Производитель", value: machine.manufacturer },
    { label: "Страна", value: machine.country },
    { label: "Год выпуска", value: machine.year }
  ];

  basicSpecs.forEach(spec => {
    specsHTML += `<tr><td style="border:1px solid black; padding:4px;">${escapeHtml(spec.label)}</td>
                  <td style="border:1px solid black; padding:4px;">${escapeHtml(spec.value)}</td></tr>`;
  });

  if (Array.isArray(machine.uniqueSpecs) && machine.uniqueSpecs.length) {
    machine.uniqueSpecs.forEach(spec => {
      specsHTML += `<tr><td style="border:1px solid black; padding:4px;">${escapeHtml(spec.label)}</td>
                    <td style="border:1px solid black; padding:4px;">${escapeHtml(spec.value)}</td></tr>`;
    });
  }

  specsHTML += '</table>';

  
  popupPrice.textContent = formatPrice(machine.price);
  popupOldPrice.textContent = formatPrice(machine.oldPrice);
  //popupDesc.textContent = machine.description || "";
  popupDesc.innerHTML = machine.description || "";

  popupSpecs.innerHTML = specsHTML;

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
