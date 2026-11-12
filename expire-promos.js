/**
 * Откат истёкших акций в machines-data.js (постоянно правит файл).
 *
 * Подхватывает все блоки promo с restorePrice/restoreOldPrice, в т.ч.:
 * - Боровичи С25-5А 2002 (id 1)
 * - Боровичи С25-5А 1997 (id 9)
 * - Giben matic standard (id 23)
 * - LISY - DVOŘÁK TH6-2500/1050 (id 32)
 *
 * По умолчанию срабатывает только если сейчас позже until 23:59 МСК.
 * Принудительно: node expire-promos.js --force
 * Проверка без записи: node expire-promos.js --dry-run
 */
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "machines-data.js");
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");

const promoBlockRe =
  /(\s*)price:\s*\d+,\s*\r?\n(\s*)oldPrice:\s*\d+,\s*\r?\n(\s*)promo:\s*\{\s*discount:\s*\d+,\s*until:\s*"([^"]+)",\s*restorePrice:\s*(\d+),\s*restoreOldPrice:\s*(\d+)\s*\},?/g;

function parseUntilMs(until) {
  const parts = String(until).split(".");
  if (parts.length !== 3) return NaN;
  const dd = Number(parts[0]);
  const mm = Number(parts[1]);
  const yyyy = Number(parts[2]);
  if (!dd || !mm || !yyyy) return NaN;
  return new Date(
    yyyy +
      "-" +
      String(mm).padStart(2, "0") +
      "-" +
      String(dd).padStart(2, "0") +
      "T23:59:59+03:00"
  ).getTime();
}

const src = fs.readFileSync(filePath, "utf8");
const now = Date.now();
let changed = 0;

const next = src.replace(
  promoBlockRe,
  (match, indentPrice, indentOld, indentPromo, until, restorePrice, restoreOldPrice) => {
    const expiresAt = parseUntilMs(until);
    if (Number.isNaN(expiresAt)) {
      console.warn("Пропуск: не удалось разобрать дату", until);
      return match;
    }
    if (!force && now <= expiresAt) {
      console.log("Ещё действует до", until, "23:59 МСК — пропуск");
      return match;
    }
    changed += 1;
    console.log(
      (force && now <= expiresAt ? "[force] " : "") +
        "Откат акции до " +
        until +
        ": price=" +
        restorePrice +
        ", oldPrice=" +
        restoreOldPrice
    );
    return (
      indentPrice +
      "price: " +
      restorePrice +
      ",\n" +
      indentOld +
      "oldPrice: " +
      restoreOldPrice +
      ","
    );
  }
);

if (changed === 0) {
  console.log("Нечего менять.");
  process.exit(0);
}

if (dryRun) {
  console.log("dry-run: файл не записан, изменений было бы:", changed);
  process.exit(0);
}

fs.writeFileSync(filePath, next, "utf8");
console.log("Готово. Обновлено блоков:", changed);
require("./generate-static-catalog.js")();
