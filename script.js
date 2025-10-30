// Пример массива станков с несколькими фото
const machines = [
  {
    id: 1,
    type: "Строгальные",
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
    description: "Состояние хорошее! Станок подключен, можно проверить. Станок тяжелой серии С25-5А предназначен для производства различных погонажных изделий и профилированного бруса, в том числе естественной влажности."
  },
  {
    id: 2,
    type: "Фрезерные",
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
    description: "Фрезерный станок для профессиональной обработки древесины."
  }
];

const catalog = document.getElementById('catalog');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const popupTitle = document.getElementById('popup-title');
const popupSpecs = document.getElementById('popup-specs');
const popupDesc = document.getElementById('popup-desc');
const closeBtn = document.querySelector('.close');
const filtersSection = document.getElementById('filters');
const toggleFiltersBtn = document.getElementById('toggle-filters');

let currentImages = [];
let currentIndex = 0;

function renderCatalog(filter = {}) {
  catalog.innerHTML = '';

  const filtered = machines.filter(machine => {
    return (!filter.type || machine.type === filter.type) &&
           (!filter.manufacturer || machine.manufacturer.toLowerCase().includes(filter.manufacturer.toLowerCase())) &&
           (!filter.country || machine.country.toLowerCase().includes(filter.country.toLowerCase())) &&
           (!filter.year || machine.year == filter.year) &&
           (!filter.power || machine.power == filter.power) &&
           (!filter.weight || machine.weight == filter.weight);
  });

  filtered.forEach(machine => {
    const card = document.createElement('div');
    card.className = 'card';
    const mainImg = machine.images[0];
    const hoverImg = machine.images[1] || mainImg;

    card.innerHTML = `
      <img src="${mainImg}" alt="${machine.type}">
      <img src="${hoverImg}" class="second" alt="доп фото">
      <div class="card-content">
        <h3>${machine.type} - ${machine.manufacturer}</h3>
        <p>Год: ${machine.year}, Мощность: ${machine.power} кВт</p>
      </div>
    `;
    card.addEventListener('click', () => showPopup(machine));
    catalog.appendChild(card);
  });
}

function showPopup(machine) {
  currentImages = machine.images;
  currentIndex = 0;
  updatePopupImage();

  popupTitle.textContent = `${machine.type} - ${machine.manufacturer}`;
  popupSpecs.innerHTML = `
    <li><strong>Страна:</strong> ${machine.country}</li>
    <li><strong>Год выпуска:</strong> ${machine.year}</li>
    <li><strong>Мощность:</strong> ${machine.power} кВт</li>
    <li><strong>Размеры:</strong> ${machine.dimensions}</li>
    <li><strong>Масса:</strong> ${machine.weight} кг</li>
  `;
  popupDesc.textContent = machine.description;
  popup.style.display = 'block';
}

function updatePopupImage() {
  popupImg.src = currentImages[currentIndex];
}

document.querySelector('.nav-btn.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updatePopupImage();
});

document.querySelector('.nav-btn.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updatePopupImage();
});

closeBtn.addEventListener('click', () => popup.style.display = 'none');
window.addEventListener('click', e => {
  if (e.target === popup) popup.style.display = 'none';
});

document.getElementById('filter-type').addEventListener('change', updateFilters);
document.getElementById('filter-manufacturer').addEventListener('input', updateFilters);
document.getElementById('filter-country').addEventListener('input', updateFilters);
document.getElementById('filter-year').addEventListener('input', updateFilters);
document.getElementById('filter-power').addEventListener('input', updateFilters);
document.getElementById('filter-weight').addEventListener('input', updateFilters);

document.getElementById('clear-filters').addEventListener('click', () => {
  document.querySelectorAll('.filters input, .filters select').forEach(el => el.value = '');
  renderCatalog();
});

function updateFilters() {
  const filter = {
    type: document.getElementById('filter-type').value,
    manufacturer: document.getElementById('filter-manufacturer').value,
    country: document.getElementById('filter-country').value,
    year: document.getElementById('filter-year').value,
    power: document.getElementById('filter-power').value,
    weight: document.getElementById('filter-weight').value,
  };
  renderCatalog(filter);
}

toggleFiltersBtn.addEventListener('click', () => {
  filtersSection.classList.toggle('active');
});

renderCatalog();
