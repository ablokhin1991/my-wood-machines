// Пример массива станков (ты потом можешь добавлять реальные)
const machines = [
  {
    id: 1,
    type: "Торцовочные",
    manufacturer: "BOSCH",
    country: "Германия",
    year: 2018,
    power: 2.5,
    dimensions: "1200x800x1000",
    weight: 120,
    image: "https://via.placeholder.com/300x180",
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
    description: "Универсальный лобзиковый станок для домашней мастерской."
  },
  // Добавляй сюда новые станки
];

const catalog = document.getElementById('catalog');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const popupTitle = document.getElementById('popup-title');
const popupSpecs = document.getElementById('popup-specs');
const popupDesc = document.getElementById('popup-desc');
const closeBtn = document.querySelector('.close');

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

function showPopup(machine) {
  popupImg.src = machine.image;
  popupTitle.textContent = `${machine.type} - ${machine.manufacturer}`;
  popupSpecs.innerHTML = `
    <li>Страна: ${machine.country}</li>
    <li>Год выпуска: ${machine.year}</li>
    <li>Мощность: ${machine.power} кВт</li>
    <li>Размеры: ${machine.dimensions}</li>
    <li>Масса: ${machine.weight} кг</li>
  `;
  popupDesc.textContent = machine.description;
  popup.style.display = 'block';
}

closeBtn.addEventListener('click', () => popup.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target == popup) popup.style.display = 'none';
});

// Фильтры
document.getElementById('filter-type').addEventListener('change', e => updateFilters());
document.getElementById('filter-manufacturer').addEventListener('input', e => updateFilters());
document.getElementById('filter-country').addEventListener('input', e => updateFilters());
document.getElementById('filter-year').addEventListener('input', e => updateFilters());
document.getElementById('filter-power').addEventListener('input', e => updateFilters());
document.getElementById('filter-weight').addEventListener('input', e => updateFilters());
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

// Инициализация
renderCatalog();
