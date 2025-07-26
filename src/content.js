/* Injecté dans chaque page : gère la recherche, la mise en évidence
 * et la navigation entre occurrences.
 */
(() => {
    "use strict";
  
    /** Classes CSS */
    const HIGHLIGHT_CLASS = "regex-highlight";
    const CURRENT_CLASS = "current";
  
    /** État interne */
    let highlights = [];
    let currentIndex = -1;
  
    /** Supprime toutes les surbrillances */
    function clearHighlights() {
      highlights.forEach((el) => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
      });
      highlights = [];
      currentIndex = -1;
    }
  
    /**
     * Recherche l’expression et ajoute les surbrillances.
     * @param {string} pattern - Corps de la regex (sans /)
     * @param {string} flags   - Flags JS (g, i, m, s, u, y)
     * @returns {{results:Array, error?:string}|{error:string}}
     */
    function performSearch(pattern, flags) {
      clearHighlights();
      if (!pattern) return { results: [] };
  
      const unifiedFlags = flags.includes("g") ? flags : flags + "g";
      let regex;
      try {
        regex = new RegExp(pattern, unifiedFlags);
      } catch (e) {
        return { error: e.message };
      }
  
      const results = [];
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            return /SCRIPT|STYLE|NOSCRIPT/.test(node.parentNode.nodeName)
              ? NodeFilter.FILTER_REJECT
              : NodeFilter.FILTER_ACCEPT;
          }
        }
      );
  
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
  
      nodes.forEach((textNode) => {
        const text = textNode.data;
        regex.lastIndex = 0;
        let m;
        while ((m = regex.exec(text))) {
          const range = document.createRange();
          range.setStart(textNode, m.index);
          range.setEnd(textNode, m.index + m[0].length);
  
          const span = document.createElement("span");
          span.className = HIGHLIGHT_CLASS;
          range.surroundContents(span);
  
          highlights.push(span);
          results.push({ match: m[0], groups: m.slice(1) });
        }
      });
  
      return { results };
    }
  
    /** Met à jour l’élément courant et fait défiler. */
    function setCurrent(idx) {
      if (!highlights.length) return;
      if (currentIndex > -1) highlights[currentIndex].classList.remove(CURRENT_CLASS);
      currentIndex = (idx + highlights.length) % highlights.length;
      const el = highlights[currentIndex];
      el.classList.add(CURRENT_CLASS);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  
    /** Écoute les messages venant du popup */
    chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
      switch (msg.type) {
        case "regex-search": {
          const { pattern, flags } = msg;
          const res = performSearch(pattern, flags);
          sendResponse({ ...res, count: highlights.length });
          break;
        }
        case "navigate-next":
          setCurrent(currentIndex + 1);
          break;
        case "navigate-prev":
          setCurrent(currentIndex - 1);
          break;
        case "clear-highlights":
          clearHighlights();
          break;
      }
      return true; // réponse asynchrone possible
    });
  })();
  