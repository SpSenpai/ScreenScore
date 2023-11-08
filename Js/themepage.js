let whiteBox = document.querySelector(".background-white");
let themeEditBox = document.querySelector(".costume-theme-edit");
let colorPick = document.querySelectorAll(".color-pick input");

function createThemeBox( themeName, themeColor, bgColor, textColor, textColor2, footerColor) {
  if (textColor2 == null) textColor2 = textColor;
  if (footerColor == null) footerColor = "#282833";
  return {
    name: themeName,
    color: themeColor,
    hoverColor: tinycolor(themeColor).darken(15).toString(),
    bgColor: bgColor,
    textColor: textColor,
    textColor2: textColor2,
    footerColor : footerColor
  };
}
let savedCostumeTheme = JSON.parse(localStorage.getItem("costumeT"));
let themes = [
  createThemeBox("Crimson Carnival", "#ff1a1a", "#020210", "#fff"),
  createThemeBox("Purple Haze", "#932fcd", "#080606", "#fff"),
  createThemeBox("Midnight Magenta", "#E63E6D", "#010610", "#ffffff"),
  createThemeBox("Emerald Enigma", "#0cc414", "#060110", "#ffffff"),
  createThemeBox("Golden Dawn", "#ffe01a", "#0a0308", "#ffffff", "#000"),
  createThemeBox("Classic Light", "#151515", "#fff", "#000", "#fff","#cfcfca"),
  createThemeBox("Azure Sky", "#39A7FF", "#e3e3e3", "#000", "#fff","#cfcfca"),
  createThemeBox("Costume Theme", "#ff0000", "#000", "#fff"),
];

if (savedCostumeTheme != null) {
  themes[themes.length - 1] = savedCostumeTheme;
  colorPick[0].value = savedCostumeTheme.color;
  colorPick[1].value = savedCostumeTheme.bgColor;
  colorPick[2].value = savedCostumeTheme.textColor;
}

let selectedTheme = JSON.parse(localStorage.getItem("theme"));
updateThemes();

function updateThemes() {
  themesgrid = document.querySelector(".themes-grid");
  themesgrid.innerHTML = "";
  themes.forEach((theme) => {
    themeBox = document.createElement("div");
    themeBox.classList.add("theme-box");
    if (theme == selectedTheme) {
      themeBox.classList.add("selected-theme");
    }
    themeBox.innerHTML = `
            <div class="theme-name">${theme.name}</div>
            <div class="colors-grid">
            <div class="theme-color-box" style="background-color:${theme.color} ;"></div>
            <div class="theme-color-box" style="background-color:${theme.bgColor} ;"></div>
            <div class="theme-color-box" style="background-color:${theme.textColor} ;"></div>
            </div>
        `;

    themeBox.addEventListener("click", () => {
      if (theme.name == "Costume Theme") {
        whiteBox.style.display = "flex";
        whiteBox.style.opacity = "1";
        themeEditBox.style.top = "8%";
      } else {
        selectedTheme = theme;
        localStorage.setItem("theme", JSON.stringify(theme));
        activateTheme();
        updateThemes();
      }
    });

    themesgrid.appendChild(themeBox);
  });
}

document.querySelector(".apply-theme-btn").addEventListener("click", () => {
  themes[themes.length - 1] = createThemeBox(
    "Costume Theme",
    colorPick[0].value,
    colorPick[1].value,
    colorPick[2].value
  );

  selectedTheme = themes[themes.length - 1];
  localStorage.setItem("theme", JSON.stringify(themes[themes.length - 1]));
  localStorage.setItem("costumeT", JSON.stringify(themes[themes.length - 1]));
  activateTheme();
  updateThemes();

  themeEditBox.style.top = "100%";
  whiteBox.style.opacity = "0";
  setTimeout(() => {
    whiteBox.style.display = "none";
  }, 250);
});

whiteBox.addEventListener("click", () => {
  themeEditBox.style.top = "100%";
  whiteBox.style.opacity = "0";
  setTimeout(() => {
    whiteBox.style.display = "none";
  }, 250);
});


