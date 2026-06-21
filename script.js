const magicItems = [
  {
    name: "にこにこ魔法",
    symbol: "笑",
    color: "rose",
    description: "まわりの空気をふわっと明るくする、まりちゃん国の基本魔法。",
    effect: "笑顔 +30"
  },
  {
    name: "星あかり魔法",
    symbol: "星",
    color: "sky",
    description: "暗い道に小さな星を並べて、次の場所まで案内します。",
    effect: "道しるべ +20"
  },
  {
    name: "元気回復魔法",
    symbol: "元",
    color: "leaf",
    description: "深呼吸をしたあと、もう一度チャレンジしたくなる魔法。",
    effect: "元気 +25"
  },
  {
    name: "ひらめき魔法",
    symbol: "灯",
    color: "sun",
    description: "考えごとに小さな光をあてて、新しいアイデアを見つけます。",
    effect: "発見 +18"
  },
  {
    name: "あんしん魔法",
    symbol: "守",
    color: "teal",
    description: "入口ゲートを静かに守り、みんなが楽しく過ごせるようにします。",
    effect: "安心 +22"
  },
  {
    name: "しあわせ召喚",
    symbol: "幸",
    color: "rose",
    description: "今日の小さなしあわせをひとつ呼び出す特別な魔法。",
    effect: "幸運 +12"
  }
];

const storageKey = "marichanLandEntries";
const adminPassword = "marichan";

const pages = [...document.querySelectorAll("[data-page]")];
const navLinks = [...document.querySelectorAll("[data-route]")];
const nav = document.querySelector("#site-nav");
const navToggle = document.querySelector(".nav-toggle");
const magicList = document.querySelector("#magic-list");
const magicSelect = document.querySelector("#magic-select");
const entryForm = document.querySelector("#entry-form");
const adminLogin = document.querySelector("#admin-login");
const adminContent = document.querySelector("#admin-content");
const tableBody = document.querySelector("#entry-table-body");
const clearEntriesButton = document.querySelector("#clear-entries");

function setRoute(route) {
  const nextRoute = pages.some((page) => page.dataset.page === route) ? route : "home";

  pages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.page === nextRoute);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === nextRoute);
  });

  if (nav && navToggle) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function readEntries() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function writeEntries(entries) {
  localStorage.setItem(storageKey, JSON.stringify(entries));
}

function createTicketId() {
  const date = new Date();
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("");
  const random = Math.floor(Math.random() * 900 + 100);
  return `ML-${stamp}-${random}`;
}

function renderMagic() {
  magicList.innerHTML = magicItems
    .map(
      (item) => `
        <article class="magic-card magic-${item.color}" data-symbol="${item.symbol}">
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <span>${item.effect}</span>
        </article>
      `
    )
    .join("");

  magicSelect.innerHTML = magicItems
    .map((item) => `<option value="${item.name}">${item.name}</option>`)
    .join("");
}

function updateTicket(entry) {
  document.querySelector(".ticket-name").textContent = `${entry.name} さん`;
  document.querySelector("#ticket-magic").textContent = entry.magic;
  document.querySelector("#ticket-purpose").textContent = entry.purpose;
  document.querySelector("#ticket-id").textContent = entry.id;
}

function renderEntries() {
  const entries = readEntries();

  if (!entries.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">まだミラーイン証はありません。</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = entries
    .map(
      (entry) => `
        <tr>
          <td>${entry.id}</td>
          <td>${entry.name}</td>
          <td>${entry.magic}</td>
          <td>${entry.purpose}</td>
          <td>${entry.createdAt}</td>
        </tr>
      `
    )
    .join("");
}

function submitEntry(event) {
  event.preventDefault();
  const formData = new FormData(entryForm);
  const now = new Date();
  const entry = {
    id: createTicketId(),
    name: String(formData.get("name")).trim(),
    magic: formData.get("magic"),
    purpose: formData.get("purpose"),
    message: String(formData.get("message")).trim(),
    createdAt: now.toLocaleString("ja-JP")
  };

  if (!entry.name) {
    return;
  }

  const entries = readEntries();
  entries.unshift(entry);
  writeEntries(entries);
  updateTicket(entry);
  renderEntries();
  entryForm.reset();
}

function unlockAdmin(event) {
  event.preventDefault();
  const password = new FormData(adminLogin).get("password");

  if (password !== adminPassword) {
    adminLogin.querySelector("input").value = "";
    adminLogin.querySelector("input").placeholder = "もう一度";
    return;
  }

  adminContent.hidden = false;
  renderEntries();
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const route = link.dataset.route;
    history.pushState({ route }, "", `#${route}`);
    setRoute(route);
  });
});

window.addEventListener("popstate", () => {
  setRoute(location.hash.replace("#", "") || "home");
});

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

entryForm.addEventListener("submit", submitEntry);
adminLogin.addEventListener("submit", unlockAdmin);
clearEntriesButton.addEventListener("click", () => {
  writeEntries([]);
  renderEntries();
});

renderMagic();
setRoute(location.hash.replace("#", "") || "home");
