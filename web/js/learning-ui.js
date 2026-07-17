import {
  calculateReadingProgress,
  checklistSummary,
  sectionId,
} from "./learning-core.js";

function createReadingProgress() {
  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("role", "progressbar");
  progress.setAttribute("aria-label", "このページの読了位置");
  progress.setAttribute("aria-valuemin", "0");
  progress.setAttribute("aria-valuemax", "100");
  progress.innerHTML = "<span></span>";
  document.body.prepend(progress);

  let scheduled = false;
  const update = () => {
    const root = document.documentElement;
    const value = calculateReadingProgress(window.scrollY, root.scrollHeight, root.clientHeight);
    progress.style.setProperty("--reading-progress", `${value}%`);
    progress.setAttribute("aria-valuenow", String(value));
    scheduled = false;
  };
  const requestUpdate = () => {
    if (!scheduled) {
      scheduled = true;
      window.requestAnimationFrame(update);
    }
  };
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();
}

function createChapterMap(main) {
  const headings = [...main.querySelectorAll(":scope > h2")];
  if (!headings.length) return;

  headings.forEach((heading, index) => {
    if (!heading.id) heading.id = sectionId(heading.textContent.trim(), index);
  });

  const details = document.createElement("details");
  details.className = "chapter-map";
  details.innerHTML = `
    <summary><span>この章の地図</span><small>${headings.length}ステップ</small></summary>
    <nav aria-label="章内目次"><ol></ol></nav>
  `;
  const list = details.querySelector("ol");
  headings.forEach((heading) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent.replace(/\s+/g, " ").trim();
    item.append(link);
    list.append(item);
  });

  const dialogue = main.querySelector(".mentor-dialogue");
  (dialogue || main.querySelector(".goal-box") || main.firstElementChild).after(details);
}

function enhanceChecklist(main) {
  const checklist = main.querySelector(".checklist");
  if (!checklist) return;

  const inputs = [...checklist.querySelectorAll('input[type="checkbox"]')];
  const status = document.createElement("div");
  status.className = "check-progress";
  status.innerHTML = `
    <div class="check-progress-copy">
      <strong>できた！を増やそう</strong>
      <output class="check-progress-output" aria-live="polite"></output>
    </div>
    <div class="check-progress-track" aria-hidden="true"><span></span></div>
  `;
  checklist.before(status);

  const output = status.querySelector("output");
  const track = status.querySelector(".check-progress-track span");
  const update = () => {
    const result = checklistSummary(inputs.filter((input) => input.checked).length, inputs.length);
    output.textContent = result.text;
    track.style.width = `${result.percent}%`;
  };
  inputs.forEach((input) => input.addEventListener("change", update));
  update();

  const reflection = document.createElement("aside");
  reflection.className = "reflection-card";
  reflection.innerHTML = `
    <span class="reflection-time">30秒</span>
    <div><strong>今日のひとこと</strong><p>「できるようになったこと」を、頭の中で1つ言ってからチェックしよう。</p></div>
  `;
  status.before(reflection);
}

function createBackToTop() {
  const button = document.createElement("button");
  button.className = "back-to-top";
  button.type = "button";
  button.setAttribute("aria-label", "ページの先頭へ戻る");
  button.textContent = "↑";
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.append(button);
}

createReadingProgress();
const main = document.querySelector("main");
if (main && main.querySelector(".chapter-title")) {
  createChapterMap(main);
  enhanceChecklist(main);
}
createBackToTop();
