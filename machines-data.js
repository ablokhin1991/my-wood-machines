// machines-data.js
// Массив станков для каталога.
// Чтобы добавить новый станок, скопируйте шаблон ниже и вставьте в конец массива machines.
//
// Шаблон нового станка:
// {
//   id: 15,                        // уникальный номер (следующий по порядку)
//   name: "Название станка",       // название для карточки и модалки
//   type: "Фрезерный",             // тип из списка: Долбежный, Лобзиковый, Раскройный, Распиловочный, Строгальный, Фрезерный, Пресс, Торцовочный, Шлифовальный
//   kind: "Горизонтальный",        // вид станка (должен совпадать с typeToKinds в script.js)
//   manufacturer: "Завод",         // производитель
//   country: "Россия",             // страна производства
//   year: 2000,                    // год выпуска (число или "-" если неизвестен)
//   power: "5",                    // мощность в кВт (строка или число)
//   dimensions: "1000x1000x1000",  // габариты ДxШxВ в мм
//   weight: 500,                   // масса в кг (число или "-")
//   instock: 1,                    // количество в наличии
//   images: [                      // массив путей к фото (webp), первое фото — основное
//     "images/wood-machines/photo-1.webp",
//     "images/wood-machines/photo-2.webp"
//   ],
//   price: 100000,                 // текущая цена в рублях
//   oldPrice: 150000,              // старая цена (зачёркнутая)
//   description: "Описание станка...", // полное описание
//   uniqueSpecs: [                 // массив характеристик (может быть пустым [])
//     { label: "Параметр", value: "Значение" }
//   ]
// }

const machines = [
  // Боровичи С25-5А 2002 г.
  {
    id: 1,
    name: "Четырехсторонний станк Боровичи С25-5А",
    type: "Строгальный",
    kind: "Четырёхсторонний",
    manufacturer: "БЗДС",
    country: "Россия",
    year: 2002,
    power: "49,6",
    dimensions: "4800x2000x1500",
    weight: 5200,
    instock: 1,
    images: [
      "/images/wood-machines/borovichi-s25-5a-2002-1.webp",
      "/images/wood-machines/borovichi-s25-5a-2002-2.webp",
      "/images/wood-machines/borovichi-s25-5a-2002-3.webp",
      "/images/wood-machines/borovichi-s25-5a-2002-4.webp"
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
      { label: "Производительность требуемой аспирации, м3/ч", value: "5х2000" },
      { label: "Габариты ДxШxВ, мм", value: "4800x2000x1500" }
    ]
  },
  // Фрезерный станок ФС
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
    description: "Редкая и надёжная машина советского времени, выпущенная в 1971 году заводом Главдревстанкопром (г. Днепропетровск). Он создан специально для деревообработки: фрезеровки профилей, торцов, фигурных элементов и других столярных задач. Модель ФС 1971 объединяет классическую конструкцию с мощным приводом 5 кВт, что делает его отличным решением для мастерской с высоким уровнем нагрузки.",
    uniqueSpecs: []
  },
  // Фрезерный станок ФСШ-1
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
    description: "Надёжный представитель советской инженерной школы, выпущенный в 1980 году Днепропетровским станкостроительным заводом (ДСПО). Эта модель создана для точной и стабильной работы по дереву: идеально подходит для фрезеровки профилей, торцов, фигурных и сложных элементов. Мощный двигатель 5 кВт и частота вращения шпинделя до 9000 об/мин обеспечивают уверенную обработку даже твёрдых пород древесины. При весе 810 кг станок стоит монолитно и исключает вибрации, что повышает точность и чистоту обработки. ФСШ-1 — выбор тех, кто ценит советское качество, долговечность и простоту обслуживания. Он одинаково хорош как для частной мастерской, так и для производственного цеха, где ценится стабильный результат и надёжность, проверенная временем.",
    uniqueSpecs: []
  },
  // Biesse Rover 49
  {
    id: 4,
    name: "Сверлильно-фрезерный станок Biesse Rover 49",
    type: "Фрезерный",
    kind: "с ЧПУ",
    manufacturer: "Biesse",
    country: "Италия",
    year: 1988,
    power: "22,6",
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
    description: "Редкая находка для мебельного производства и любых предприятий, где ценят надёжность, стабильность и долговечность оборудования. Этот станок построен так, что один раз настроив на деталь, можно работать круглосуточно без остановки, что делает его идеальным решением для поточного и массового производства. \n\nСтанок работает по координатам X, Y и Z, может фрезеровать криволинейные профили, пазы, выборки и фигурные элементы с высокой точностью. Оснащён 36 вертикальными шпинделями и 12 горизонтальными, что позволяет одновременно выполнять присадку множества отверстий на панели с четырёх сторон — идеальное решение для серийного производства. Два фрезера со стандартными цангами и два с конусом Морзе CM2 обеспечивают возможность работы с фрезами разного диаметра и формы, включая дисковые фрезы до Ø120 мм. Шпиндели фрезеров работают до 18 000 об/мин с мощностью до 5,59 кВт, а дисковые фрезы обеспечивают быстрый и точный рез любой древесины или композитных материалов. Станок рассчитан на непрерывное производство, один раз настроив на деталь, можно работать круглосуточно без остановки. При желании можно за небольшие деньги обновить главный компьютер, и станок будет работать на современном уровне. Для сравнения: аналогичная модель Biesse Rover 2025 года сегодня продаётся от 20 млн рублей. ROVER 49 даёт практически те же возможности за разумные деньги.",
    uniqueSpecs: [
      { label: "Рабочее поле, мм", value: "3200x1304" },
      { label: "Скорость Ось X, м/мин", value: 34 },
      { label: "Скорость Ось Y, м/мин", value: 30 },
      { label: "Скорость Ось Z, м/мин", value: 15 },
      { label: "Мощность сверлильных головок, кВт", value: 1.34 },
      { label: "Хвостовик сверла Ø, мм", value: 10 },
      { label: "Кол-во шпинделей вертикального сверления", value: 36 },
      { label: "Кол-во шпинделей горизонтального сверления (по 4 сторонам панели)", value: 12 },
      { label: "Обороты шпинделей сверления, об/мин", value: 4000 },
      { label: "Направление вращения 2-х фрезеров", value: "передний - правое вращение; задний – левое вращение" },
      { label: "Скорость и мощность фрезера со цангой", value: "12 000 об/мин (1,49 кВт); 18 000 об/мин (2,24 кВт)" },
      { label: "Стандартная цанга для фрезеров Ø, мм", value: "9,5 – 12" },
      { label: "Направление вращения 2-х дисковых фрез", value: "передняя – левое; задняя – правое" },
      { label: "Обороты дисковых фрез, об/мин", value: 12000 },
      { label: "Параметры дисковой фрезы", value: "Ø наружный 120 мм — Ø внутренний 35 мм — толщина 3,5–6 мм" },
      { label: "Мощность двигателей дисковых фрез, кВт", value: "1,86 - 3,73" },
      { label: "Рабочее давление воздуха, бар", value: 6 },
      { label: "Патрубок аспирации Ø, мм", value: 200 },
      { label: "Расход воздуха на аспирацию, м³/ч", value: 2800 },
      { label: "Производительность вакуумного насоса, м³/ч", value: 35 }
    ]
  },
  // Пресс для склеивания бруса ПВС-3
  {
    id: 5,
    name: "Пресс для склеивания бруса ПВС-3",
    type: "Пресс",
    kind: "Вертикальный",
    manufacturer: "-",
    country: "Россия",
    year: "-",
    power: "-",
    dimensions: "4100x2400x1600",
    weight: 2000,
    instock: 2,
    images: [
      "images/wood-machines/press-dlya-skleivaniya-brusa-pvs-3-1.webp",
      "images/wood-machines/press-dlya-skleivaniya-brusa-pvs-3-2.webp",
      "images/wood-machines/press-dlya-skleivaniya-brusa-pvs-3-3.webp",
      "images/wood-machines/press-dlya-skleivaniya-brusa-pvs-3-4.webp",
      "images/wood-machines/press-dlya-skleivaniya-brusa-pvs-3-5.webp",
      "images/wood-machines/press-dlya-skleivaniya-brusa-pvs-3-6.webp",
      "images/wood-machines/press-dlya-skleivaniya-brusa-pvs-3-7.webp"
    ],
    price: 1000000,
    oldPrice: 1500000,
    description: "Цена за 2 пресса! Состояние: хорошее, рабочее! По одному не продается. Пресс вертикальный для склеивания бруса и щита, предназначен для сращивания заготовок на гладкую фугу по толщине с целью получения бруса или по ширине с целью получения щита из массивной древесины. Пресс состоит из 2-х частей (каждая из которых по техническим характеристикам соответствует мод. ПВС-3) и устанавливается на специальных домкратах входящих в состав пресса, с помощью которых производится выставка опорных поверхностей 2-х частей в одной плоскости с требуемой точностью. После этого они могут быть соединены технологическими накладками или сваркой. Работа пресса предусматривается в двух режимах: работа на половине пресса (для изделий до 3000 мм.) и работа всего пресса (для изделий до 6000 мм.). Режим работы выбирается переключателем, расположенном на эл. шкафу.",
    uniqueSpecs: [
      { label: "Толщина заготовки, мм", value: "25-50" },
      { label: "Ширина заготовки, мм", value: "25-150" },
      { label: "Длина заготовки, мм", value: "800-3000 / 6000" },
      { label: "Рабочая зона (Мин), мм", value: "700x800" },
      { label: "Рабочая зона (Макс), мм", value: "1000x3000 / 6000" },
      { label: "Макс. усилие гидроцилиндра прессования, кГс", value: 7000 },
      { label: "Наибольшее усилие прижима, кГс", value: 2000 },
      { label: "Количество гидроцилиндров прессования", value: 6 },
      { label: "Наибольший ход прессующего элемента, мм", value: 320 },
      { label: "Наибольший ход прижимной балки, мм", value: 160 },
      { label: "Удельное давление прессования, кг/см² (Хвойные породы)", value: 12 },
      { label: "Удельное давление прессования, кг/см² (Твердолиственные породы)", value: 16 },
      { label: "Количество операторов, обслуживающих пресс", value: "2 чел" }
    ]
  },
  // Копировально-фрезерный станок Griggio G 60
  {
    id: 6,
    name: "Копировально-фрезерный станок Griggio G 60",
    type: "Фрезерный",
    kind: "Копировально-фрезерный",
    manufacturer: "Griggio",
    country: "Италия",
    year: "-",
    power: "2,2",
    dimensions: "1900x1200x800",
    weight: 230,
    instock: 1,
    images: [
      "images/wood-machines/kopirovalno-frezernyy-stanok-griggio-g60-1.webp",
      "images/wood-machines/kopirovalno-frezernyy-stanok-griggio-g60-2.webp",
      "images/wood-machines/kopirovalno-frezernyy-stanok-griggio-g60-3.webp",
      "images/wood-machines/kopirovalno-frezernyy-stanok-griggio-g60-4.webp",
      "images/wood-machines/kopirovalno-frezernyy-stanok-griggio-g60-5.webp"
    ],
    price: 185000,
    oldPrice: 210000,
    description: "Станок в хорошем и рабочем состоянии! Надёжный итальянский копировально-фрезерный станок, идеально подходящий для мебельных и столярных цехов. Он легко справляется с фрезеровкой прямых и криволинейных форм, пазов и декоративных элементов по шаблону — от дверных полотен до фасадов и рамок. Две скорости шпинделя (9000 и 18 000 об/мин) позволяют точно работать с деревом, МДФ и фанерой, а прочная конструкция и плавная регулировка стола обеспечивают стабильную и чистую обработку. Это универсальная и долговечная «рабочая лошадка» для тех, кто ценит качество и надёжность.",
    uniqueSpecs: [
      { label: "Размер рабочего стола, мм", value: "800x600" },
      { label: "Вертикальный ход стола, мм", value: 150 },
      { label: "Вертикальный ход шпинделя, мм", value: 80 },
      { label: "Частота вращения шпинделя, об/мин", value: "9000 и 18000" },
      { label: "Макс. расстояние от стола до головки (без патрона), мм", value: 195 },
      { label: "Патрубок аспирации Ø, мм", value: 80 }
    ]
  },
  // Станок для раскроя рулонов
  {
    id: 7,
    name: "Станок для раскроя рулонов",
    type: "Раскройный",
    kind: "Раскрой рулона",
    manufacturer: "Самодельный",
    country: "Россия",
    year: "2010",
    power: "3",
    dimensions: "-",
    weight: "-",
    instock: 1,
    images: [
      "images/wood-machines/stanok-dlya-raskroya-rulonov-1.webp",
      "images/wood-machines/stanok-dlya-raskroya-rulonov-2.webp",
      "images/wood-machines/stanok-dlya-raskroya-rulonov-3.webp",
      "images/wood-machines/stanok-dlya-raskroya-rulonov-4.webp"
    ],
    price: 135000,
    oldPrice: 150000,
    description: "Станок отличного качества и неприхотливый  - изготовили сами, силами слесарной комманды на базе имеющегося станка. Продаем в связи не надобностью! Данный станок использовался для дверного производства, а именно для раскроя рулонов покрытия дверей (пленка / бумага / пластик) - на фото видно.",
    uniqueSpecs: []
  },
  // Многопильный станок ЦДК 5-3
  {
    id: 8,
    name: "Многопильный станок ЦДК 5-3",
    type: "Распиловочный",
    kind: "Дисковый многопильный",
    manufacturer: "ТСЗ",
    country: "Россия",
    year: "1993",
    power: "32,4",
    dimensions: "1930x1780x1630",
    weight: 2150,
    instock: 2,
    images: [
      "images/wood-machines/mnogopilnyy-stanok-cdk-5-3-1.webp",
      "images/wood-machines/mnogopilnyy-stanok-cdk-5-3-2.webp",
      "images/wood-machines/mnogopilnyy-stanok-cdk-5-3-3.webp",
      "images/wood-machines/mnogopilnyy-stanok-cdk-5-3-4.webp",
      "images/wood-machines/mnogopilnyy-stanok-cdk-5-3-5.webp",
      "images/wood-machines/mnogopilnyy-stanok-cdk-5-3-6.webp"
    ],
    price: 300000,
    oldPrice: 350000,
    description: "Станок в хорошем состоянии — всю жизнь отработал в тёплом цеху! В наличии 2 шт.! Многопильный ЦДК 5-3, произведённый Тюменским станкостроительным заводом, — это надёжная и мощная машина (32,4 кВт) для продольного раскроя бруса и досок на обрезные пиломатериалы. Благодаря чугунной станине, продуманной конструкции и виброустойчивому пильному узлу, станок работает спокойно и точно даже при высоких оборотах. Подача заготовок осуществляется широкой конвейерной цепью, обеспечивающей стабильное и ровное движение без пробуксовок. Подходит для пилорам и деревообрабатывающих цехов, где требуется стабильная «рабочая лошадка» для поточного распила заготовок толщиной до 120 мм и шириной до 260 мм.",
    uniqueSpecs: [
      { label: "Толщина заготовки, мм", value: "16-120" },
      { label: "Ширина заготовки, мм", value: "10-260" },
      { label: "Длина заготовки, мм", value: "от 500" },
      { label: "Диаметр применяемых пил, мм", value: "315-400" },
      { label: "Скорость подачи, м/мин", value: "5,5; 10,5; 4,5; 18,5" },
      { label: "Мощность привода пильного вала, кВт", value: 30 }
    ]
  },
  // Боровичи С25-5А 1997 г.
  {
    id: 9,
    name: "Четырехсторонний станк Боровичи С25-5А",
    type: "Строгальный",
    kind: "Четырёхсторонний",
    manufacturer: "БЗДС",
    country: "Россия",
    year: 1997,
    power: "49,6",
    dimensions: "4800x2000x1500",
    weight: 5200,
    instock: 1,
    images: [
      "images/wood-machines/borovichi-s25-5a-1997-1.webp",
      "images/wood-machines/borovichi-s25-5a-1997-2.webp",
      "images/wood-machines/borovichi-s25-5a-1997-3.webp",
      "images/wood-machines/borovichi-s25-5a-1997-4.webp"
    ],
    price: 700000,
    oldPrice: 1000000,
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
  // Боровичи С25-4А 1994 г.
  {
    id: 10,
    name: "Четырехсторонний станк Боровичи С25-4А",
    type: "Строгальный",
    kind: "Четырёхсторонний",
    manufacturer: "БЗДС",
    country: "Россия",
    year: 1994,
    power: "38,6",
    dimensions: "3150x1570x1315",
    weight: 4200,
    instock: 1,
    images: [
      "images/wood-machines/borovichi-s25-4a-1994-1.webp",
      "images/wood-machines/borovichi-s25-4a-1994-2.webp",
      "images/wood-machines/borovichi-s25-4a-1994-3.webp",
      "images/wood-machines/borovichi-s25-4a-1994-4.webp"
    ],
    price: 500000,
    oldPrice: 700000,
    description: "Четырехшпиндельный станок тяжелой серии предназначен для производства различных погонажных изделий и профилированного бруса, в том числе естественной влажности. Станок в отличном состоянии и полностью рабочий!",
    uniqueSpecs: [
      { label: "Количество шпинделей", value: 4 },
      { label: "Ширина заготовки, мм", value: "50-250" },
      { label: "Высота заготовки, мм", value: "12-230" },
      { label: "Скорость работы, м/мин", value: "7-35" },
      { label: "Мин. длина одиночной заготовки, мм", value: 700 },
      { label: "Диаметр выходных патрубков аспирации, мм", value: 150 },
      { label: "Производительность требуемой аспирации, м3/ч", value: "5х2000" }
    ]
  },
  // ШЛК-10 Простор
  {
    id: 11,
    name: "Шлифовальный станок ШЛК-10 Простор",
    type: "Шлифовальный",
    kind: "Калибровальный",
    manufacturer: "Простор",
    country: "Россия",
    year: 2000,
    power: "18",
    dimensions: "1950x1850x1630",
    weight: 2800,
    instock: 1,
    images: [
      "images/wood-machines/shlifovalnyy-stanok-shlk-10-prostor-1.webp",
      "images/wood-machines/shlifovalnyy-stanok-shlk-10-prostor-2.webp",
      "images/wood-machines/shlifovalnyy-stanok-shlk-10-prostor-3.webp",
      "images/wood-machines/shlifovalnyy-stanok-shlk-10-prostor-4.webp"
    ],
    price: 250000,
    oldPrice: 300000,
    description: "Станок в хорошем и рабочем состоянии! Станок ШЛК-10 широколенточный с конвейерной подачей заготовки предназначен для калибрования и шлифования плоских параллельных поверхностей щитовых деталей.",
    uniqueSpecs: [
      { label: "Толщина заготовки, мм", value: "5-100" },
      { label: "Ширина заготовки, мм", value: "до 900" },
      { label: "Длина заготовки, мм", value: "от 360" },
      { label: "Длина шлифовальной ленты, мм", value: 1900 },
      { label: "Ширина шлифовальной ленты, мм", value: 1000 },
      { label: "Скорость шлифовальной ленты, м/сек", value: 25 },
      { label: "Скорость подачи, м/мин", value: 10 },
      { label: "Давление пневмосети, минимальное, кг/см2", value: 4 },
      { label: "Расход потребляемого воздуха, м3/мин", value: "0,15" },
      { label: "Уровень рабочего стола от пола, мм", value: 900 }
    ]
  },
  // Шлифовальный станок ШлПС-6М
  {
    id: 12,
    name: "Шлифовальный станок ШлПС-6М",
    type: "Шлифовальный",
    kind: "Ленточный",
    manufacturer: "Кодос",
    country: "Россия",
    year: 1995,
    power: "2,2",
    dimensions: "3500x1500x1500",
    weight: 450,
    instock: 2,
    images: [
      "images/wood-machines/shlifovalnyy-stanok-shlps-6m-1.webp",
      "images/wood-machines/shlifovalnyy-stanok-shlps-6m-2.webp",
      "images/wood-machines/shlifovalnyy-stanok-shlps-6m-3.webp",
      "images/wood-machines/shlifovalnyy-stanok-shlps-6m-4.webp",
      "images/wood-machines/shlifovalnyy-stanok-shlps-6m-5.webp",
      "images/wood-machines/shlifovalnyy-stanok-shlps-6m-6.webp",
      "images/wood-machines/shlifovalnyy-stanok-shlps-6m-7.webp"
    ],
    price: 75000,
    oldPrice: 130000,
    description: "Станки в хорошем состоянии — всю жизнь отработали в тёплом цеху! *В наличии 2 шт!* Станок ШлПС-6М предназначен для шлифования плоских поверхностей щитовых деталей из массивной древесины и мебельных щитов, в том числе облицованных шпоном и покрытых полиэфирным лаком узкой шлифовальной лентой на подвижном столе с утюжком.",
    uniqueSpecs: [
      { label: "Толщина заготовки, мм", value: "до 300" },
      { label: "Ширина заготовки, мм", value: "до 1000" },
      { label: "Длина заготовки, мм", value: "не огранич." },
      { label: "Размеры шлифовальной ленты, мм", value: "6760х100-160" },
      { label: "Скорость резания, м/с", value: 20 }
    ]
  },
  // Centauro SP 500
  {
    id: 13,
    name: "Ленточная пила по дереву Centauro SP 500",
    type: "Распиловочный",
    kind: "Ленточный",
    manufacturer: "Centauro",
    country: "Италия",
    year: 2004,
    power: "1,8",
    dimensions: "1910x905x630",
    weight: 230,
    instock: 1,
    images: [
      "images/wood-machines/lentochnaya-pila-centauro-sp-500-1.webp",
      "images/wood-machines/lentochnaya-pila-centauro-sp-500-2.webp",
      "images/wood-machines/lentochnaya-pila-centauro-sp-500-3.webp",
      "images/wood-machines/lentochnaya-pila-centauro-sp-500-4.webp",
      "images/wood-machines/lentochnaya-pila-centauro-sp-500-5.webp",
      "images/wood-machines/lentochnaya-pila-centauro-sp-500-6.webp",
      "images/wood-machines/lentochnaya-pila-centauro-sp-500-7.webp"
    ],
    price: 349000,
    oldPrice: 496000,
    description: "Сocтояние отличное, рaбoтaли на станке не много - только точечные и какие-то разовые операции, требующие ручного распила! Ленточнaя пилa по дереву Сеntaurо SР-500 (Италия) - это профессиональный станок для продольного, поперечного и криволинейного распила древесины. Максимально удобная для работы конструкции. Станок выдает обработку древесины на высоком и качественном уровне.",
    uniqueSpecs: [
      { label: "Макс. высота заготовки, мм", value: "300" },
      { label: "Размеры рабочего стола, мм", value: "500x700" },
      { label: "Длина пильного полотна, мм", value: "3860-3945" },
      { label: "Макс. ширина и толщина пильного полотна, мм", value: "30x0,5" },
      { label: "Диаметр шкивов, мм", value: 500 },
      { label: "Скорость вращения шкивов, об/мин", value: 930 },
      { label: "Наклонный чугунный стол, гр (°)", value: "до 45°" },
      { label: "Патрубок аспирации Ø, мм", value: 100 },
      { label: "Торможение шкивов", value: "ножной тормоз" }
    ]
  },
  // Yuetong MDK 4120 NC
  {
    id: 14,
    name: "Сверлильно-пазовальный станок Yuetong MDK 4120 NC",
    type: "Долбежный",
    kind: "Сверлильно-пазовальный",
    manufacturer: "Yuetong",
    country: "Китай",
    year: 2007,
    power: "7",
    dimensions: "2540x2270x1620",
    weight: 1900,
    instock: 1,
    images: [
      "images/wood-machines/sverlilno-pazovalnyy-stanok-yuetong-mdk-4120-nc-1.webp",
      "images/wood-machines/sverlilno-pazovalnyy-stanok-yuetong-mdk-4120-nc-2.webp",
      "images/wood-machines/sverlilno-pazovalnyy-stanok-yuetong-mdk-4120-nc-3.webp",
      "images/wood-machines/sverlilno-pazovalnyy-stanok-yuetong-mdk-4120-nc-4.webp",
      "images/wood-machines/sverlilno-pazovalnyy-stanok-yuetong-mdk-4120-nc-5.webp",
      "images/wood-machines/sverlilno-pazovalnyy-stanok-yuetong-mdk-4120-nc-6.webp"
    ],
    price: 1200000,
    oldPrice: 1490000,
    description: "Сocтояние отличное, рaбoтaли на станке мало - только разовые операции под заказные двери! Станок предназначен специально для проведения фрезерных операций при изготовлении пазов и отверстий различного назначение (установка фурнитуры дверного полотна/коробки: механизм замка, накладка замка, личинка, ручка, петли).",
    uniqueSpecs: [
      { label: "Макс. ширина заготовки, мм", value: 1000 },
      { label: "Макс. длина заготовки, мм", value: 2200 },
      { label: "Толщина заготовки, мм", value: "30-60" },
      { label: "Количество шпинделей, шт.", value: 6 },
      { label: "Обороты шпинделей, об/мин", value: 12000 }
    ]
  }
];