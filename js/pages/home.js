(() => {
  const productGrid = document.querySelector("#product-grid");
  if (!productGrid) return;

  const products = window.BRUNO_PRODUCTS || [];
  const searchInput = document.querySelector("#search");
  const searchForm = document.querySelector("#search-form");
  const collection = document.querySelector("#colecao");
  const filterButtons = [...document.querySelectorAll(".filter")];
  const emptyState = document.querySelector("#empty-state");
  const resultCount = document.querySelector("#result-count");
  const cartToast = document.querySelector("#cart-toast");

  let activeFilter = "all";
  let toastTimeout;

  function normalizeText(value) {
    return value
      .toLocaleLowerCase("pt-BR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function renderSizeOptions(sizes) {
    return sizes
      .map((size) => '<option value="' + size + '">' + size + "</option>")
      .join("");
  }

  function renderProductCard(product) {
    const badge = product.badge
      ? '<span class="product-badge">' + product.badge + "</span>"
      : "";
    const featuredBadge = product.featured
      ? '<span class="product-badge">Destaque</span>'
      : "";

    return [
      '<article class="product-card" data-kind="' + product.type + '">',
      '  <div class="product-image">',
      badge,
      featuredBadge,
      '    <img src="' + product.image + '" alt="' + product.alt + '" loading="lazy">',
      "  </div>",
      '  <div class="product-info">',
      "    <p>" + product.team.toLocaleUpperCase("pt-BR") + "</p>",
      "    <h3>" + product.name + "</h3>",
      '    <span class="product-type">' + product.typeLabel + "</span>",
      '    <div class="product-purchase-row">',
      '      <strong class="product-price">' + BrunoFormat.currency(product.price) + "</strong>",
      '      <div class="size-picker">',
      '        <label class="size-label" for="size-' + product.id + '">Tamanho</label>',
      '        <select class="product-size" id="size-' + product.id + '">',
      renderSizeOptions(product.sizes),
      "        </select>",
      "      </div>",
      "    </div>",
      '    <button type="button" class="product-add" data-add="' + product.id + '">Adicionar ao carrinho</button>',
      "  </div>",
      "</article>",
    ].join("");
  }

  function getVisibleProducts() {
    const searchQuery = normalizeText(searchInput?.value || "");

    return products.filter((product) => {
      const matchesFilter =
        activeFilter === "all" || product.type === activeFilter;
      const searchableContent = normalizeText(
        [product.team, product.name, product.typeLabel].join(" "),
      );

      return matchesFilter && searchableContent.includes(searchQuery);
    });
  }

  function updateResultCount(count) {
    if (!resultCount) return;

    const label = count === 1 ? "modelo" : "modelos";
    resultCount.textContent = count + " " + label + " em destaque";
  }

  function renderProducts() {
    const visibleProducts = getVisibleProducts();
    productGrid.innerHTML = visibleProducts.map(renderProductCard).join("");

    if (emptyState) emptyState.hidden = visibleProducts.length > 0;
    updateResultCount(visibleProducts.length);
    BrunoCart.sync();
  }

  function setActiveFilter(filterName) {
    activeFilter = filterName;

    filterButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.filter === filterName);
    });

    renderProducts();
  }

  function showAddedToCart(product, size) {
    if (!cartToast) return;

    cartToast.textContent =
      "✓ " + product.name + " · Tamanho " + size + " adicionado ao carrinho";
    cartToast.classList.add("is-visible");

    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => {
      cartToast.classList.remove("is-visible");
    }, 3200);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveFilter(button.dataset.filter);
    });
  });

  document.querySelectorAll("[data-filter-link]").forEach((link) => {
    link.addEventListener("click", () => {
      setActiveFilter(link.dataset.filterLink);
    });
  });

  searchInput?.addEventListener("input", renderProducts);

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    collection?.scrollIntoView({ behavior: "smooth" });
    renderProducts();
  });

  productGrid.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add]");
    if (!addButton) return;

    const productCard = addButton.closest(".product-card");
    const sizeSelect = productCard?.querySelector(".product-size");
    const product = products.find(
      (item) => item.id === addButton.dataset.add,
    );
    if (!product || !sizeSelect) return;

    BrunoCart.add(product.id, sizeSelect.value);
    showAddedToCart(product, sizeSelect.value);
  });

  renderProducts();
})();
