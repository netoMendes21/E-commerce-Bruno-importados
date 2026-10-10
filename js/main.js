(() => {
  const documentRoot = document.documentElement;
  const themeToggle = document.querySelector("#theme-toggle");
  const themeLabel = document.querySelector(".theme-label");
  const themeSymbol = document.querySelector(".theme-symbol");
  const storeLogo = document.querySelector("#store-logo");
  const footerLogo = document.querySelector("#footer-logo");

  function setTheme(themeName) {
    const isLightTheme = themeName === "light";
    documentRoot.dataset.theme = themeName;
    [storeLogo, footerLogo].filter(Boolean).forEach((logo) => {
      logo.src = isLightTheme ? "assets/logoLight.png" : "assets/logoDark.png";
    });
    if (themeLabel)
      themeLabel.textContent = isLightTheme ? "Tema escuro" : "Tema claro";
    if (themeSymbol) {
      themeSymbol.style.maskImage = `url(assets/${isLightTheme ? "icon-dark" : "icon-light"}.png)`;
    }
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        `Alternar para o tema ${isLightTheme ? "escuro" : "claro"}`,
      );
    }
    localStorage.setItem("bruno-importados-theme", themeName);
  }

  setTheme(
    localStorage.getItem("bruno-importados-theme") ||
      documentRoot.dataset.theme ||
      "dark",
  );
  themeToggle?.addEventListener("click", () => {
    setTheme(documentRoot.dataset.theme === "dark" ? "light" : "dark");
  });

  const productGrid = document.querySelector("#product-grid");
  if (!productGrid) return;

  const products = window.BRUNO_PRODUCTS;
  const searchInput = document.querySelector("#search");
  const filterButtons = [...document.querySelectorAll(".filter")];
  const emptyState = document.querySelector("#empty-state");
  const resultCount = document.querySelector("#result-count");
  let activeFilter = "all";

  const formatPrice = (price) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

  function renderProducts() {
    const searchQuery = (searchInput?.value || "")
      .trim()
      .toLocaleLowerCase("pt-BR");
    const matchingProducts = products.filter((product) => {
      const matchesCategory =
        activeFilter === "all" || product.type === activeFilter;
      const searchableText =
        `${product.team} ${product.name} ${product.typeLabel}`.toLocaleLowerCase(
          "pt-BR",
        );
      return matchesCategory && searchableText.includes(searchQuery);
    });

    productGrid.innerHTML = matchingProducts
      .map(
        (product) => `
      <article class="product-card" data-kind="${product.type}">
        <div class="product-image">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
          ${product.featured ? '<span class="product-badge">Destaque</span>' : ""}
          <img src="${product.image}" alt="${product.alt}" loading="lazy">
        </div>
        <div class="product-info">
          <p>${product.team.toUpperCase()}</p>
          <h3>${product.name}</h3>
          <span class="product-type">${product.typeLabel}</span>
          <strong class="product-price">${formatPrice(product.price)}</strong>
          <label class="sr-only" for="size-${product.id}">Tamanho</label>
          <select class="product-size" id="size-${product.id}">
            ${product.sizes.map((size) => `<option>${size}</option>`).join("")}
          </select>
          <button type="button" class="product-add" data-add="${product.id}">Adicionar ao carrinho</button>
          <span class="product-status" aria-live="polite"></span>
        </div>
      </article>`,
      )
      .join("");

    emptyState.hidden = matchingProducts.length > 0;
    resultCount.textContent = `${matchingProducts.length} ${matchingProducts.length === 1 ? "modelo" : "modelos"} em destaque`;
    BrunoCart.sync();
  }

  function chooseFilter(filterName) {
    activeFilter = filterName;
    filterButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === filterName);
    });
    renderProducts();
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => chooseFilter(button.dataset.filter));
  });
  document.querySelectorAll("[data-filter-link]").forEach((link) => {
    link.addEventListener("click", () => chooseFilter(link.dataset.filterLink));
  });
  searchInput?.addEventListener("input", renderProducts);
  document
    .querySelector("#search-form")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      document.querySelector("#colecao").scrollIntoView({ behavior: "smooth" });
      renderProducts();
    });
  productGrid.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");
    if (!addButton) return;
    const productCard = addButton.closest(".product-card");
    const selectedSize = productCard.querySelector("select").value;
    BrunoCart.add(addButton.dataset.add, selectedSize);
    productCard.querySelector(".product-status").textContent =
      `Tamanho ${selectedSize} adicionado ao carrinho.`;
  });

  renderProducts();
})();
