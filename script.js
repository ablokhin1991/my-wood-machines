// script.js
document.addEventListener("DOMContentLoaded", () => {

  // === Карта типов к видам ===
  const typeToKinds = {
    "Долбежный": ["Сверлильно-пазовальный"],
    "Строгальный": ["Долбёжный","Комбинированный","Рейсмусовый","Фуговальный","Четырёхсторонний","Шипорезный"],
    "Фрезерный": ["Горизонтальный","Копировально-фрезерный","Вертикальный","с ЧПУ"],
    "Раскройный": ["Раскрой рулона"],
    "Распиловочный": ["Дисковый многопильный","Ленточный","Циркулярный","Форматно-раскроечный"],
    "Лобзиковый": ["Ленточный"],
    "Торцовочный": ["Ручной","Стационарный"],
    "Шлифовальный": ["Ленточный","Калибровальный"],
    "Пресс": ["Веерный","Вертикальный"]
  };

  // === Элементы DOM ===
  const typeSelect = document.getElementById("filter-type");
  const kindSelect = document.getElementById("filter-kind");
  const catalogGrid = document.getElementById("catalog-grid");
  const modal = document.getElementById("machine-modal");
  const modalContent = modal.querySelector(".modal-content");

  // === Утилиты ===
  const formatPrice = (n) => Number(n).toLocaleString("ru-RU") + " руб.";

  const normalizeImagePath = (p) => {
    if (!p) return "";
    return p.startsWith("/") ? p : "/" + p;
  };

  const truncateText = (text, maxLen) => {
    if (!text || text.length <= maxLen) return text || "";
    const truncated = text.substring(0, maxLen);
    const lastSpace = truncated.lastIndexOf(" ");
    return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + "…";
  };

  // === Рендер карточки ===
  const renderCard = (machine) => {
    const img1 = machine.images && machine.images[0] ? normalizeImagePath(machine.images[0]) : "";
    const img2 = machine.images && machine.images[1] ? normalizeImagePath(machine.images[1]) : "";
    const yearText = (!machine.year || machine.year === "-") ? "не указан" : machine.year;
    const powerText = (!machine.power || machine.power === "-") ? "не указана" : machine.power + " кВт";
    const shortDesc = truncateText(machine.description, 140);

    const card = document.createElement("article");
    card.className = "machine-card";
    card.id = "machine-" + machine.id;
    card.setAttribute("itemscope", "");
    card.setAttribute("itemtype", "https://schema.org/Product");

    let hoverImgHtml = "";
    if (img2) {
      hoverImgHtml = `<img class="card-img-hover" src="${img2}" alt="${machine.name} — фото 2" loading="lazy">`;
    }

        card.innerHTML = `
      <div class="card-image-wrap">
        <img class="card-img-main" src="${img1}" alt="${machine.name} — фото 1" loading="lazy" decoding="async" itemprop="image">
        ${hoverImgHtml}
      </div>
      <div class="card-body">
        <div class="card-price-row" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
          <meta itemprop="priceCurrency" content="RUB">
          <meta itemprop="price" content="${machine.price}">
          <link itemprop="availability" href="https://schema.org/InStock">
          <meta itemprop="itemCondition" content="https://schema.org/UsedCondition">
          <span class="card-price">${formatPrice(machine.price)}</span>
          <span class="card-old-price">${formatPrice(machine.oldPrice)}</span>
        </div>
        <div class="card-price-note">Цена и наличие уточняйте по телефону. Не является публичной офертой.</div>
        <h3 class="card-title" itemprop="name">${machine.name}</h3>
        <div class="card-instock">В наличии: ${machine.instock} шт.</div>
        <p class="card-desc" itemprop="description">${shortDesc}</p>
        <ul class="card-specs">
          <li><strong>Тип:</strong> <span itemprop="category">${machine.type}</span></li>
          <li><strong>Вид:</strong> ${machine.kind}</li>
          <li><strong>Мощность:</strong> ${powerText}</li>
          <li><strong>Страна:</strong> ${machine.country}</li>
          <li><strong>Год:</strong> ${yearText}</li>
        </ul>
        <button class="btn-more js-more-btn" data-id="${machine.id}">Подробнее</button>
      </div>
    `;
    return card;
  };

  // === Рендер каталога ===
  const renderCatalog = () => {
    const selectedType = typeSelect.value;
    const selectedKind = kindSelect.value;

    let filtered = machines;
    if (selectedType) {
      filtered = filtered.filter(m => m.type === selectedType);
      if (selectedKind) {
        filtered = filtered.filter(m => m.kind === selectedKind);
      }
    }

    catalogGrid.innerHTML = "";

    if (filtered.length === 0) {
      catalogGrid.innerHTML = `<div class="catalog-empty">Подходящих станков не найдено. Попробуйте изменить фильтры.</div>`;
      return;
    }

    filtered.forEach(machine => {
      catalogGrid.appendChild(renderCard(machine));
    });

    // Навешиваем обработчики на кнопки «Подробнее»
    // Тут же можно вешать цели Яндекс.Метрики: ym(XXXXXX, 'reachGoal', 'click_more_btn');
    catalogGrid.querySelectorAll(".machine-card").forEach(card => {
      card.addEventListener("click", () => {
        const btn = card.querySelector(".js-more-btn");
        if (!btn) return;
        const id = parseInt(btn.getAttribute("data-id"), 10);
        const machine = machines.find(m => m.id === id);
        if (machine) openModal(machine);
      });
    });
  };

  // === Фильтры ===
  typeSelect.addEventListener("change", () => {
    const selectedType = typeSelect.value;
    kindSelect.innerHTML = "";

    if (!selectedType) {
      kindSelect.disabled = true;
      kindSelect.innerHTML = `<option value="">Сначала выберите тип</option>`;
    } else {
      kindSelect.disabled = false;
      kindSelect.innerHTML = `<option value="">Все виды этого типа</option>`;
      const kinds = typeToKinds[selectedType] || [];
      kinds.forEach(k => {
        const opt = document.createElement("option");
        opt.value = k;
        opt.textContent = k;
        kindSelect.appendChild(opt);
      });
    }
    renderCatalog();
  });

  kindSelect.addEventListener("change", () => {
    renderCatalog();
  });

  // === Модалка станка ===
  let currentGalleryIndex = 0;
  let currentMachineImages = [];

  const openModal = (machine) => {
    currentGalleryIndex = 0;
    currentMachineImages = (machine.images || []).map(normalizeImagePath);

    const yearText = (!machine.year || machine.year === "-") ? "не указан" : machine.year;
    const powerText = (!machine.power || machine.power === "-") ? "не указана" : machine.power + " кВт";

    // Описание с абзацами
    const descHtml = (machine.description || "").split("\n").filter(p => p.trim()).map(p => `<p>${p.trim()}</p>`).join("");

    // Таблица характеристик
    let specsHtml = "";
    if (machine.uniqueSpecs && machine.uniqueSpecs.length > 0) {
      specsHtml = `
        <h3 class="specs-heading">Технические характеристики</h3>
        <table class="specs-table">
          <tbody>
            ${machine.uniqueSpecs.map(s => `<tr><th>${s.label}</th><td>${s.value}</td></tr>`).join("")}
          </tbody>
        </table>
      `;
    }

    // Миниатюры
    const thumbsHtml = currentMachineImages.map((img, i) => `<img src="${img}" alt="${machine.name} — фото ${i + 1}" class="${i === 0 ? "active" : ""}" data-index="${i}" loading="lazy">`).join("");

    modalContent.innerHTML = `
      <button class="modal-close" aria-label="Закрыть">&times;</button>
      <div class="gallery">
        <div class="gallery-main-wrap">
          <button class="gallery-arrow left" aria-label="Назад">&#10094;</button>
          <img id="gallery-main-img" src="${currentMachineImages[0] || ""}" alt="${machine.name} — фото 1">
          <button class="gallery-arrow right" aria-label="Вперёд">&#10095;</button>
        </div>
        <div class="gallery-thumbs">${thumbsHtml}</div>
      </div>
      
      <h2 class="modal-title">${machine.name}</h2>
      <div class="modal-price-row">
        <span class="modal-price">${formatPrice(machine.price)}</span>
        <span class="modal-old-price">${formatPrice(machine.oldPrice)}</span>
        <span class="badge-torg">Торг</span>
      </div>
      <div class="modal-instock">В наличии: ${machine.instock} шт.</div>

      

      <div class="modal-highlight">
        Продажа от собственника (без посредников!). При необходимости согласуем отправку по России.<br>Звоните: <a href="tel:+79100928279" class="js-phone-link">+7 (910) 092-82-79</a>
      </div>

      <div class="modal-description">${descHtml}</div>
      ${specsHtml}
    `;

    // Обработчики галереи
    const mainImg = document.getElementById("gallery-main-img");
    const thumbs = modalContent.querySelectorAll(".gallery-thumbs img");

    const updateGallery = (index) => {
      currentGalleryIndex = index;
      mainImg.src = currentMachineImages[index] || "";
      mainImg.alt = machine.name + " — фото " + (index + 1);
      mainImg.classList.remove("zoomed");
      thumbs.forEach((t, i) => t.classList.toggle("active", i === index));
    };

    thumbs.forEach(t => {
      t.addEventListener("click", () => updateGallery(parseInt(t.getAttribute("data-index"), 10)));
    });

    modalContent.querySelector(".gallery-arrow.left").addEventListener("click", () => {
      const newIdx = (currentGalleryIndex - 1 + currentMachineImages.length) % currentMachineImages.length;
      updateGallery(newIdx);
    });

    modalContent.querySelector(".gallery-arrow.right").addEventListener("click", () => {
      const newIdx = (currentGalleryIndex + 1) % currentMachineImages.length;
      updateGallery(newIdx);
    });

    // Зум по клику на главное фото
    mainImg.addEventListener("click", () => {
      mainImg.classList.toggle("zoomed");
    });

    // Закрытие по крестику
    modalContent.querySelector(".modal-close").addEventListener("click", closeModal);

    // Показать модалку
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  };

  // Закрытие по клику на overlay
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Закрытие по Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeLegalModals();
    }
  });

  // === Юридические модалки ===
  const legalModals = document.querySelectorAll(".legal-modal");
  const legalLinks = document.querySelectorAll("[data-legal]");

  const closeLegalModals = () => {
    legalModals.forEach(m => m.classList.remove("active"));
    if (!modal.classList.contains("active")) {
      document.body.classList.remove("modal-open");
    }
  };

  legalLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById(link.getAttribute("data-legal"));
      if (target) {
        target.classList.add("active");
        document.body.classList.add("modal-open");
      }
    });
  });

  legalModals.forEach(m => {
    m.addEventListener("click", (e) => {
      if (e.target === m) closeLegalModals();
    });
    const closeBtn = m.querySelector(".modal-close");
    if (closeBtn) closeBtn.addEventListener("click", closeLegalModals);
  });

  // === JSON-LD: FAQ ===
  const faqData = [
    {
      question: "Как купить деревообрабатывающий станок б/у во Владимирской области?",
      answer: "Чтобы купить станок, позвоните по телефону +7 (910) 092-82-79. Мы расскажем о состоянии станка, ответим на вопросы и согласуем все детали покупки. Формы заказа на сайте нет — вся коммуникация только по телефону, чтобы вы получили живой ответ на все вопросы."
    },
    {
      question: "Можно ли приехать посмотреть станок б/у и запустить его в работе?",
      answer: "Да, вы можете приехать к нам во Владимирскую область (Александровский район) и лично осмотреть любой станок. Мы покажем оборудование, при необходимости запустим его в работе, чтобы вы убедились в исправности. Договоритесь о визите по телефону +7 (910) 092-82-79 заранее."
    },
    {
      question: "Как организуется доставка деревообрабатывающего станка по России?",
      answer: "Доставку обсуждаем индивидуально. Мы помогаем с погрузкой, подбираем подходящий транспорт и согласовываем логистику. Стоимость доставки зависит от габаритов станка и расстояния. Все условия и расходы на транспорт оговариваются по телефону до отправки."
    },
    {
      question: "Возможен ли торг при покупке станка б/у?",
      answer: "Да, торг уместен. Окончательная цена согласовывается при встрече. Мы готовы обсудить индивидуальные условия, особенно при покупке нескольких единиц оборудования. Звоните: +7 (910) 092-82-79."
    },
    {
      question: "Какие гарантии на б/у деревообрабатывающие станки?",
      answer: "Мы честно продаём б/у оборудование без скрытых дефектов. Все станки работали в тёплом отапливаемом цеху и находятся в хорошем рабочем состоянии. При личном осмотре вы можете убедиться в исправности каждого станка. Мы не скрываем реальное состояние оборудования."
    },
    {
      question: "Можно ли забронировать станок б/у на несколько дней?",
      answer: "Да, мы можем отложить станок на 2–3 дня, пока вы принимаете решение или организуете транспорт. Условия бронирования уточняйте по телефону +7 (910) 092-82-79."
    },
    {
      question: "Вы посредники или собственники станков?",
      answer: "Мы — собственники. Все станки принадлежат нашему предприятию по обработке древесины. Продажа ведётся напрямую, без перекупщиков и посредников, что позволяет предложить честные цены без лишних наценок."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const faqScript = document.createElement("script");
  faqScript.type = "application/ld+json";
  faqScript.textContent = JSON.stringify(faqSchema);
  document.head.appendChild(faqScript);

  // === JSON-LD: Products ===
  const productsSchema = {
    "@context": "https://schema.org",
    "@graph": machines.map(machine => {
      const origin = window.location.origin || "";
      const path = window.location.pathname || "/";
      const normalizedImage = machine.images && machine.images[0]
        ? (machine.images[0].startsWith("/") ? machine.images[0] : "/" + machine.images[0])
        : "";
      const url = origin + path + "#machine-" + machine.id;
      const imageUrl = normalizedImage ? origin + normalizedImage : undefined;

      return {
        "@type": "Product",
        "name": machine.name,
        "description": machine.description,
        "image": imageUrl,
        "category": machine.type + " / " + machine.kind,
        "brand": {
          "@type": "Brand",
          "name": machine.manufacturer
        },
        "offers": {
          "@type": "Offer",
          "price": String(machine.price),
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/UsedCondition",
          "url": url,
          "seller": {
            "@type": "Person",
            "name": "Собственник"
          }
        }
      };
    })
  };

  const productsScript = document.createElement("script");
  productsScript.type = "application/ld+json";
  productsScript.textContent = JSON.stringify(productsSchema);
  document.head.appendChild(productsScript);

  // === JSON-LD: WebPage ===
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Станки по деревообработке б/у во Владимирской области — продажа от собственника",
    "description": "Купить деревообрабатывающий станок б/у от собственника во Владимирской области. Четырёхсторонние, фрезерные, шлифовальные, распиловочные станки по дереву в наличии.",
    "url": (window.location.origin || "") + (window.location.pathname || "/")
  };

  const webPageScript = document.createElement("script");
  webPageScript.type = "application/ld+json";
  webPageScript.textContent = JSON.stringify(webPageSchema);
  document.head.appendChild(webPageScript);

  // === Инициализация ===
  renderCatalog();

  // Для целей Яндекс.Метрики можно навесить обработчики здесь:
  // document.querySelectorAll('.js-phone-link').forEach(link => {
  //   link.addEventListener('click', () => { ym(XXXXXX, 'reachGoal', 'phone_click'); });
  // });
  // document.querySelector('.js-go-to-catalog').addEventListener('click', () => {
  //   ym(XXXXXX, 'reachGoal', 'go_to_catalog');
  // });

});