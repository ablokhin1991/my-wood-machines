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
    "Пресс": ["Веерный","Вертикальный"],
    "Кромкооблицовочный": ["Односторонний"]
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
    const renderCard = (machine, index) => {
    const img1 = machine.images && machine.images[0] ? normalizeImagePath(machine.images[0]) : "";
    const img2 = machine.images && machine.images[1] ? normalizeImagePath(machine.images[1]) : "";
    const thumb1 = img1 ? img1.replace("/wood-machines/", "/wood-machines/thumbs/") : "";
    const thumb2 = img2 ? img2.replace("/wood-machines/", "/wood-machines/thumbs/") : "";
    const isAboveFold = index < 4;
    const loadingAttr = isAboveFold ? "eager" : "lazy";
    const priorityAttr = isAboveFold ? ' fetchpriority="high"' : '';
    const yearText = (!machine.year || machine.year === "-") ? "не указан" : machine.year;
    const powerText = (!machine.power || machine.power === "-") ? "не указана" : machine.power + " кВт";
    const shortDesc = truncateText(machine.description, 140);

    const card = document.createElement("article");
    card.className = "machine-card";
    card.id = "machine-" + machine.id;
    card.setAttribute("itemscope", "");
    card.setAttribute("itemtype", "https://schema.org/Product");

    let hoverImgHtml = "";

      card.innerHTML = `
      <div class="card-image-wrap">
        <img class="card-img-main" src="${thumb1}"${thumb2 ? ' data-hover="' + thumb2 + '"' : ''} alt="${machine.type} ${machine.name} б/у — фото 1" width="400" height="300" loading="${loadingAttr}"${priorityAttr} decoding="async" itemprop="image">
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
        <!--<div class="card-price-note">Цена и наличие уточняйте по телефону. Не является публичной офертой.</div>-->
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

    filtered.forEach((machine, index) => {
      catalogGrid.appendChild(renderCard(machine, index));
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

    // Hover-фото: загружаем только при первом наведении
    catalogGrid.querySelectorAll(".card-img-main[data-hover]").forEach(img => {
      let hoverLoaded = false;
      const wrap = img.closest(".card-image-wrap");
      const originalSrc = img.src;
      const hoverSrc = img.getAttribute("data-hover");

      wrap.addEventListener("mouseenter", () => {
        if (!hoverLoaded) {
          const preload = new Image();
          preload.src = hoverSrc;
          hoverLoaded = true;
        }
        img.src = hoverSrc;
      });

      wrap.addEventListener("mouseleave", () => {
        img.src = originalSrc;
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
    const machineVideos = (machine.videos || []).map(normalizeImagePath);
    const firstImage = currentMachineImages[0] ? [{ type: "image", src: currentMachineImages[0] }] : [];
    const videoItems = machineVideos.map(src => ({ type: "video", src }));
    const restImages = currentMachineImages.slice(1).map(src => ({ type: "image", src }));
    const allMedia = [...firstImage, ...videoItems, ...restImages];

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
        const thumbsHtml = allMedia.map((media, i) => {
      if (media.type === "video") {
        return `<div class="gallery-thumb-video${i === 0 ? " active" : ""}" data-index="${i}"><img src="${currentMachineImages[0] || ""}" alt="${machine.name} — видео" loading="lazy"><span class="thumb-play">▶</span></div>`;
      }
      return `<img src="${media.src}" alt="${machine.name} — фото ${i + 1}" class="${i === 0 ? "active" : ""}" data-index="${i}" loading="lazy">`;
    }).join("");

    modalContent.innerHTML = `
      <button class="modal-close" aria-label="Закрыть">&times;</button>
      <div class="gallery">
        <div class="gallery-main-wrap">
          <button class="gallery-arrow left" aria-label="Назад">&#10094;</button>
          <img id="gallery-main-img" src="${currentMachineImages[0] || ""}" alt="${machine.name} — фото 1">
          <video id="gallery-main-video" controls playsinline style="display:none;max-height:450px;width:100%;border-radius:6px;"></video>
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
    const mainVideo = document.getElementById("gallery-main-video");
    const thumbElements = modalContent.querySelectorAll(".gallery-thumbs img, .gallery-thumbs .gallery-thumb-video");

    const updateGallery = (index) => {
      currentGalleryIndex = index;
      const media = allMedia[index];

      if (media && media.type === "video") {
        mainImg.style.display = "none";
        mainImg.classList.remove("zoomed");
        mainVideo.src = media.src;
        mainVideo.style.display = "block";
      } else {
        mainVideo.style.display = "none";
        mainVideo.pause();
        mainVideo.removeAttribute("src");
        mainImg.src = media ? media.src : "";
        mainImg.alt = machine.name + " — фото " + (index + 1);
        mainImg.style.display = "block";
        mainImg.classList.remove("zoomed");
      }

      thumbElements.forEach((t, i) => t.classList.toggle("active", i === index));
    };

    thumbElements.forEach(t => {
      t.addEventListener("click", () => updateGallery(parseInt(t.getAttribute("data-index"), 10)));
    });

    modalContent.querySelector(".gallery-arrow.left").addEventListener("click", () => {
      const newIdx = (currentGalleryIndex - 1 + allMedia.length) % allMedia.length;
      updateGallery(newIdx);
    });

    modalContent.querySelector(".gallery-arrow.right").addEventListener("click", () => {
      const newIdx = (currentGalleryIndex + 1) % allMedia.length;
      updateGallery(newIdx);
    });

    // Зум по клику на главное фото (только для изображений)
    mainImg.addEventListener("click", () => {
      mainImg.classList.toggle("zoomed");
    });

    // Закрытие по крестику
    modalContent.querySelector(".modal-close").addEventListener("click", closeModal);

        // Показать модалку
    modal.classList.add("active");
    modal.scrollTop = 0;
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

  // === JSON-LD === //
  const origin = window.location.origin || "https://prodam-stanki.ru";
  const path = window.location.pathname || "/";
  const siteUrl = origin + path;
  const businessId = origin + "/#business";

  const insertJsonLd = (obj) => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  };

  // --- 1. LocalBusiness ---
  insertJsonLd({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": businessId,
    "name": "Станки по деревообработке б/у от собственника",
    "description": "Продажа б/у деревообрабатывающих станков от собственника во Владимирской области. Четырёхсторонние, фрезерные, шлифовальные, распиловочные станки.",
    "url": siteUrl,
    "telephone": "+7-910-092-82-79",
    "priceRange": "₽₽",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Владимирская область",
      "addressLocality": "Александровский район",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 56.3926,
      "longitude": 38.7382
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "19:00"
    },
    "areaServed": [
      { "@type": "State", "name": "Владимирская область" },
      { "@type": "Country", "name": "Россия" }
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Product",
        "name": "Деревообрабатывающие станки б/у"
      }
    }
  });

  // --- 2. FAQPage ---
  const faqItems = document.querySelectorAll(".faq-item[itemscope]");
  if (faqItems.length > 0) {
    insertJsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": origin + "/#faq",
      "mainEntity": Array.from(faqItems).map(item => {
        const question = item.querySelector("[itemprop='name']");
        const answer = item.querySelector("[itemprop='text']");
        return {
          "@type": "Question",
          "name": question ? question.textContent.trim() : "",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answer ? answer.textContent.trim() : ""
          }
        };
      })
    });
  }

  // --- 3. Products ---
  insertJsonLd({
    "@context": "https://schema.org",
    "@graph": machines.map(machine => {
      const normalizedImage = machine.images && machine.images[0]
        ? (machine.images[0].startsWith("/") ? machine.images[0] : "/" + machine.images[0])
        : "";
      const url = siteUrl + "#machine-" + machine.id;
      const imageUrl = normalizedImage ? origin + normalizedImage : undefined;
      const yearText = (!machine.year || machine.year === "-") ? "не указан" : String(machine.year);
      const powerText = (!machine.power || machine.power === "-") ? "не указана" : machine.power + " кВт";
      const weightText = (!machine.weight || machine.weight === "-") ? "не указана" : machine.weight + " кг";
      const dimensionsText = (!machine.dimensions || machine.dimensions === "-") ? "не указаны" : machine.dimensions + " мм";

      const additionalProperty = [
        { "@type": "PropertyValue", "name": "Состояние", "value": "Б/у, рабочее" },
        { "@type": "PropertyValue", "name": "Условия хранения", "value": "Тёплый отапливаемый цех" },
        { "@type": "PropertyValue", "name": "Год выпуска", "value": yearText },
        { "@type": "PropertyValue", "name": "Мощность", "value": powerText },
        { "@type": "PropertyValue", "name": "Габариты (ДxШxВ)", "value": dimensionsText },
        { "@type": "PropertyValue", "name": "Масса", "value": weightText },
        { "@type": "PropertyValue", "name": "Страна производства", "value": machine.country }
      ];

      if (machine.uniqueSpecs && machine.uniqueSpecs.length > 0) {
        machine.uniqueSpecs.forEach(spec => {
          additionalProperty.push({
            "@type": "PropertyValue",
            "name": spec.label,
            "value": String(spec.value)
          });
        });
      }

      return {
        "@type": "Product",
        "name": machine.name,
        "description": machine.description,
        "image": imageUrl,
        "sku": "STANOK-" + machine.id,
        "category": machine.type + " / " + machine.kind,
        "brand": { "@type": "Brand", "name": machine.manufacturer },
        "offers": {
          "@type": "Offer",
          "url": url,
          "priceCurrency": "RUB",
          "price": String(machine.price),
          "priceValidUntil": "2025-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/UsedCondition",
          "seller": { "@id": businessId }
        },
        "additionalProperty": additionalProperty
      };
    })
  });

  // --- 4. ItemList ---
  insertJsonLd({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Каталог деревообрабатывающих станков б/у",
    "description": "Станки по деревообработке б/у от собственника во Владимирской области",
    "numberOfItems": machines.length,
    "itemListElement": machines.map((machine, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": machine.name,
        "description": machine.description,
        "offers": {
          "@type": "Offer",
          "price": String(machine.price),
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/UsedCondition"
        }
      }
    }))
  });

  // --- 5. WebPage + BreadcrumbList ---
  insertJsonLd({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": origin + "/#webpage",
    "url": siteUrl,
    "name": "Станки по деревообработке б/у от собственника — Владимирская область",
    "description": "Купить деревообрабатывающий станок б/у от собственника. Четырёхсторонние, фрезерные, шлифовальные станки. Прямая продажа без посредников.",
    "inLanguage": "ru-RU",
    "isPartOf": {
      "@type": "WebSite",
      "@id": origin + "/#website",
      "url": siteUrl,
      "name": "Станки по деревообработке б/у",
      "publisher": { "@id": businessId }
    },
    "about": {
      "@type": "Thing",
      "name": "Деревообрабатывающие станки б/у"
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".hero", ".faq-section", ".info-section"]
    }
  });

  insertJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Главная", "item": siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Каталог станков", "item": siteUrl + "#catalog" }
    ]
  });

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