(() => {
  const storageKey = "bruno-importados-theme";
  const root = document.documentElement;
  const themeToggle = document.querySelector("#theme-toggle");
  const themeLabel = document.querySelector(".theme-label");
  const themeSymbol = document.querySelector(".theme-symbol");

  function getSavedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function setTheme(theme) {
    const activeTheme = theme === "light" ? "light" : "dark";
    const isLight = activeTheme === "light";
    root.dataset.theme = activeTheme;
    document.body.dataset.theme = activeTheme;

    document
      .querySelectorAll("#store-logo, #footer-logo")
      .forEach((logo) => {
        logo.src = isLight ? "assets/branding/logoLight.png" : "assets/branding/logoDark.png";
      });

    if (themeLabel) {
      themeLabel.textContent = isLight ? "Tema escuro" : "Tema claro";
    }

    if (themeSymbol) {
      const iconName = isLight ? "icon-dark" : "icon-light";
      themeSymbol.style.maskImage = "url(assets/icons/" + iconName + ".png)";
    }

    if (themeToggle) {
      const nextTheme = isLight ? "escuro" : "claro";
      themeToggle.setAttribute("aria-label", "Alternar para o tema " + nextTheme);
    }

    try {
      localStorage.setItem(storageKey, activeTheme);
    } catch {
      // O tema continua funcionando mesmo se o navegador bloquear o armazenamento.
    }
  }

  const initialTheme = getSavedTheme() || root.dataset.theme || "dark";
  setTheme(initialTheme);

  themeToggle?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
})();
