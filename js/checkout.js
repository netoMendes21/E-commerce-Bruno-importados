(() => {
  const cartItemsContainer = document.querySelector("#cart-items");
  const emptyCartMessage = document.querySelector("#cart-empty");
  const cartTotalElement = document.querySelector("#cart-total");
  const productList = window.BRUNO_PRODUCTS;
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function renderCartItems() {
    const cartItems = BrunoCart.items;
    cartItemsContainer.innerHTML = cartItems.map((cartItem) => {
      const product = productList.find((item) => item.id === cartItem.id);
      if (!product) return "";
      return `<article class="cart-row">
        <img src="${product.image}" alt="${product.alt}">
        <div class="cart-description">
          <p>${product.team}</p><h3>${product.name}</h3>
          <span>Tamanho ${cartItem.size} · ${currencyFormatter.format(product.price)} cada</span>
          <div class="quantity-control" role="group" aria-label="Quantidade de ${product.name}"><span>Quantidade</span><div class="quantity-buttons"><button class="quantity-button" type="button" data-quantity-change="-1" data-product-id="${cartItem.id}" data-size="${cartItem.size}" aria-label="Diminuir quantidade">−</button><output class="quantity-value" aria-live="polite">${cartItem.quantity}</output><button class="quantity-button" type="button" data-quantity-change="1" data-product-id="${cartItem.id}" data-size="${cartItem.size}" aria-label="Aumentar quantidade">+</button></div></div>
        </div>
        <button class="cart-remove" type="button" data-remove="${cartItem.id}" data-size="${cartItem.size}">Remover</button>
      </article>`;
    }).join("");
    emptyCartMessage.hidden = cartItems.length > 0;
    cartTotalElement.textContent = currencyFormatter.format(BrunoCart.total(productList));
    BrunoCart.sync();
  }

  cartItemsContainer.addEventListener("click", (event) => {
    const quantityButton = event.target.closest("[data-quantity-change]");
    if (quantityButton) {
      const selectedItem = BrunoCart.items.find((item) => {
        return item.id === quantityButton.dataset.productId && item.size === quantityButton.dataset.size;
      });
      if (selectedItem) {
        const changedQuantity = selectedItem.quantity + Number(quantityButton.dataset.quantityChange);
        BrunoCart.setQuantity(selectedItem.id, selectedItem.size, changedQuantity);
      }
      return;
    }
    const removeButton = event.target.closest("[data-remove]");
    if (removeButton) {
      BrunoCart.remove(removeButton.dataset.remove, removeButton.dataset.size);
    }
  });
  document.addEventListener("cart:updated", renderCartItems);
  renderCartItems();

  const checkoutForm = document.querySelector("#checkout-form");
  const checkoutMessage = document.querySelector("#checkout-message");
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let isFormValid = true;
    const formValues = {
      name: checkoutForm.elements.name.value.trim(),
      email: checkoutForm.elements.email.value.trim(),
      payment: checkoutForm.elements.payment.value,
    };

    Object.entries(formValues).forEach(([fieldName, fieldValue]) => {
      const errorElement = document.querySelector(`[data-error="${fieldName}"]`);
      const hasInvalidEmail = fieldName === "email" && fieldValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue);
      const errorMessage = !fieldValue
        ? "Preencha este campo."
        : hasInvalidEmail
          ? "Informe um e-mail válido."
          : "";
      errorElement.textContent = errorMessage;
      if (errorMessage) isFormValid = false;
    });

    if (!BrunoCart.count()) {
      checkoutMessage.textContent = "Adicione um produto ao carrinho antes de continuar.";
      isFormValid = false;
    }
    if (!isFormValid) {
      checkoutMessage.classList.add("is-error");
      return;
    }

    checkoutMessage.classList.remove("is-error");
    const orderNumber = Date.now().toString().slice(-6);
    document.querySelector("#checkout-layout").hidden = true;
    document.querySelector("#checkout-page-title").textContent = "Pedido confirmado";
    document.querySelector("#confirmation-details").textContent = `Obrigado, ${formValues.name}! Seu pedido demonstrativo #${orderNumber} foi registrado. Nenhum pagamento foi processado.`;
    document.querySelector("#order-confirmation").hidden = false;
    BrunoCart.clear();
    checkoutForm.reset();
  });

  const themeToggle = document.querySelector("#theme-toggle");
  const themeLabel = document.querySelector(".theme-label");
  const themeSymbol = document.querySelector(".theme-symbol");
  const documentRoot = document.documentElement;

  function setTheme(themeName) {
    const isLightTheme = themeName === "light";
    documentRoot.dataset.theme = themeName;
    [document.querySelector("#store-logo"), document.querySelector("#footer-logo")]
      .forEach((logo) => {
        logo.src = isLightTheme ? "assets/logoLight.png" : "assets/logoDark.png";
      });
    themeLabel.textContent = isLightTheme ? "Tema escuro" : "Tema claro";
    themeSymbol.style.maskImage = `url(assets/${isLightTheme ? "icon-dark" : "icon-light"}.png)`;
    localStorage.setItem("bruno-importados-theme", themeName);
  }

  setTheme(localStorage.getItem("bruno-importados-theme") || "dark");
  themeToggle.addEventListener("click", () => {
    setTheme(documentRoot.dataset.theme === "dark" ? "light" : "dark");
  });
})();



