export function calculateReadingProgress(scrollY, scrollHeight, clientHeight) {
  const readableDistance = Math.max(0, scrollHeight - clientHeight);
  if (readableDistance === 0) return 100;
  const percent = Math.round((scrollY / readableDistance) * 100);
  return Math.min(100, Math.max(0, percent));
}

export function checklistSummary(checked, total) {
  if (total <= 0) return { percent: 0, text: "チェック項目はありません" };
  const safeChecked = Math.min(total, Math.max(0, checked));
  const percent = Math.round((safeChecked / total) * 100);
  const suffix = safeChecked === total ? "！章クリア" : "";
  return { percent, text: `${safeChecked} / ${total} できた${suffix}` };
}

export function sectionId(text, index) {
  const asciiWords = String(text)
    .toLowerCase()
    .match(/[a-z0-9]+/g);
  const stem = asciiWords && asciiWords.length ? `${asciiWords.join("-")}-` : "";
  return `section-${stem}${index + 1}`;
}
