# 🔎 Regex Finder – Extension Chrome

> Une alternative puissante à `Ctrl+F` avec **expressions régulières**, **groupes capturés**, **surbrillances dynamiques** et **navigation interactive**.

---

![logo](icons/icon128.png)

**Regex Finder** est une extension Chrome qui remplace la recherche classique sur page (`Ctrl+F`) par une recherche avancée via **expressions régulières JavaScript**. Elle permet la détection de groupes, la mise en évidence visuelle des résultats et une navigation fluide entre les correspondances.

---

## 🚀 Fonctionnalités

- ✅ Recherche via **Regex JavaScript** (`RegExp`)
- ✅ Gestion des **groupes capturés**
- ✅ Surbrillance **automatique** dans la page
- ✅ Navigation **Précédent / Suivant**
- ✅ Résumé des résultats dans un pop-up
- ✅ Aucun tracking ni publicité
- ✅ Mode sombre automatique
- ✅ Export des résultats en JSON
- ✅ Sauvegarde manuelle de la regex via le bouton **Save**
- ✅ Historique des 5 dernières regex utilisées
- ✅ Recherche instantanée (mode live)
---


## 🛠 Installation manuelle

1. Clonez ou téléchargez ce dépôt Git :
   ```bash
   git clone https://github.com/Mir0um/Regex-Finder.git
   ```

2. Ouvrez Chrome et accédez à :
   [`chrome://extensions`](chrome://extensions)
3. Activez le **mode développeur** (coin supérieur droit)
4. Cliquez sur **Charger l’extension non empaquetée**
5. Sélectionnez le dossier `Regex-Finder/` que vous venez de cloner

L'icône 🧬 apparaîtra dans votre barre d’extension.

---

## 🧪 Mode d'emploi

### 1. Ouvrir le popup

Cliquez sur l’icône de l’extension dans la barre Chrome.

### 2. Entrer une expression régulière

* Exemple de pattern : `\\b\\d{4}\\b` (années)
* Flags JavaScript valides : `g`, `i`, `m`, `s`, etc.

### 3. Visualiser les résultats

* Toutes les correspondances sont **surbrillées**
* Les groupes capturés sont affichés dans la liste

### 4. Naviguer

* Utilisez les boutons ⟨ Préc / Suiv ⟩ pour passer d’un résultat à l’autre
* Le résultat courant est mis en **orange**

### 5. Effacer

* Cliquez sur **🧹 Effacer** pour supprimer les surbrillances

### 6. Sauvegarder

* Utilisez le bouton **💾 Save** pour mémoriser la regex courante

---

## 📁 Arborescence du projet

```text
Regex-Finder/
├── manifest.json
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── popup/
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
├── src/
│   ├── content.js
│   └── highlight.css
└── README.md
```

---

## 🤝 Crédits et inspiration

* Créé par **[Miroum](https://github.com/Mir0um)**
* Projet original : [Regex-Finder](https://github.com/Mir0um/Regex-Finder)
* Inspiré par : [find+ | Regex Find-in-Page Tool](https://github.com/brandon1024/find)

---

## 🧩 Roadmap / idées futures

* [x] Support du thème sombre (Dark Mode)
* [ ] Surlignage dans les iframes
* [ ] Support des pages dynamiques (SPA)
* [x] Mode Live / Recherche instantanée
* [x] Support export CSV ou JSON des résultats␊
* [x] conserver l'historique des regex utilisées
* [ ] menue avec des obtion (ider d'obtion a trouver encore)

---

## 🛡 Permissions

* `"activeTab"` : pour injecter les scripts sur la page active
* `"scripting"` : injecter JS/CSS à la volée
* `"storage"` : conserver les dernières regex utilisées

---

## 📄 Licence

MIT – Vous êtes libre de réutiliser, modifier, contribuer.

```