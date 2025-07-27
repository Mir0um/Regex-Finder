// chrome-regex-search-extension/popup/popup.js
"use strict";

/* Utilitaire : envoie un message au content-script de l’onglet actif */
function sendToActiveTab(msg) {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs.length) return;
      chrome.tabs.sendMessage(tabs[0].id, msg, resolve);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const f = (id) => document.getElementById(id);
  const form       = f("searchForm");
  const patternInp = f("pattern");
  const flagsInp   = f("flags");
  const btnClear   = f("btnClear");
  const btnPrev    = f("btnPrev");
  const btnNext    = f("btnNext");
  const btnExport  = f("btnExport");
  const nav        = f("nav");
  const counter    = f("counter");
  const resultsUL  = f("results");

  let total = 0;
  let current = 0;
  let lastResults = [];

  // Désactive l'export tant qu'aucune recherche n'est effectuée
  btnExport.disabled = true;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const pattern = patternInp.value.trim();
    const flags   = flagsInp.value.trim();
    const res = await sendToActiveTab({ type: "regex-search", pattern, flags });

    if (res.error) {
      alert("Erreur : " + res.error);
      return;
    }
    total = res.count;
    current = total ? 1 : 0;
    counter.textContent = `${current} / ${total}`;
    nav.hidden = !total;

    resultsUL.innerHTML = "";
    lastResults = res.results;
    btnExport.disabled = lastResults.length === 0;
    res.results.forEach((r, i) => {
      const li = document.createElement("li");
      li.textContent = `${i + 1}. ${r.match}  ⇒ [${r.groups.join(", ")}]`;
      resultsUL.appendChild(li);
    });

    if (total) await sendToActiveTab({ type: "navigate-next" });
  });

  btnClear.addEventListener("click", () => {
    sendToActiveTab({ type: "clear-highlights" });
    nav.hidden = true;
    resultsUL.innerHTML = "";
    total = current = 0;
    lastResults = [];
    btnExport.disabled = true;
  });

  btnPrev.addEventListener("click", async () => {
    if (!total) return;
    current = current === 1 ? total : current - 1;
    counter.textContent = `${current} / ${total}`;
    await sendToActiveTab({ type: "navigate-prev" });
  });

  btnNext.addEventListener("click", async () => {
    if (!total) return;
    current = current === total ? 1 : current + 1;
    counter.textContent = `${current} / ${total}`;
    await sendToActiveTab({ type: "navigate-next" });
  });

  btnExport.addEventListener("click", () => {
    if (!lastResults.length) return;
    const data = JSON.stringify(lastResults, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "regex-results.json";
    a.click();
    URL.revokeObjectURL(url);
  });
});