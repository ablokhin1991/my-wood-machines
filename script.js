// Пример массива станков
const machines = [
  {
    id: 1,
    type: "Торцовочные",
    manufacturer: "Строгальные",
    country: "Россия",
    year: 2002,
    power: 49,6,
    dimensions: "4800x2000x1500",
    weight: 5200,
    image: "images\wood-machines\borovichi-s25-5a-2002-1.webp",
    description: "Мощная торцовочная машина, идеальна для быстрой резки дерева."
  },
  {
    id: 2,
    type: "Лобзиковые",
    manufacturer: "Makita",
    country: "Япония",
    year: 2017,
    power: 1.2,
    dimensions: "900x500x800",
    weight: 60,
    image: "https://via.placeholder.com/300x180",
    description: "Универсальный лобзиковый станок для домашней мастерской."
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

// === Отображение каталога ===
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
    card.innerHTML = `
      <img src="${machine.image}" alt="${machine.type}">
      <div class="card-content">
        <h3>${machine.type} - ${machine.manufacturer}</h3>
        <p>Год: ${machine.year}, Мощность: ${machine.power} кВт</p>
      </div>
    `;
    card.addEventListener('click', () => showPopup(machine));
    catalog.appendChild(card);
  });
}

// === Popup ===
function showPopup(machine) {
  popupImg.src = machine.image;
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

closeBtn.addEventListener('click', () => popup.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target == popup) popup.style.display = 'none';
});

// === Фильтры ===
document.getElementById('filter-type').addEventListener('change', updateFilters);
document.getElementById('filter-manufacturer').addEventListener('input', updateFilters);
document.getElementById('filter-country').addEventListener('input', updateFilters);
document.getElementById('filter-year').addEventListener('input', updateFilters);
document.getElementById('filter-power').addEventListener('input', updateFilters);
document.getElementById('filter-weight').addEventListener('input', updateFilters);

document.getElementById('clear-filters').addEventListener('click', () => {
  document.getElementById('filter-type').value = '';
  document.getElementById('filter-manufacturer').value = '';
  document.getElementById('filter-country').value = '';
  document.getElementById('filter-year').value = '';
  document.getElementById('filter-power').value = '';
  document.getElementById('filter-weight').value = '';
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

// === Кнопка фильтров для мобильных ===
toggleFiltersBtn.addEventListener('click', () => {
  filtersSection.classList.toggle('active');
  toggleFiltersBtn.classList.toggle('active');
});

// === Инициализация ===
renderCatalog();
