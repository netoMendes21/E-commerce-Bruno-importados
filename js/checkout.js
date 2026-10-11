(() => {
  const cartItemsContainer = document.querySelector("#cart-items");
  const emptyCartMessage = document.querySelector("#cart-empty");
  const cartTotalElement = document.querySelector("#cart-total");
  const productList = window.BRUNO_PRODUCTS;
  const paymentMethodSelect = document.querySelector("#payment-method");
  const installmentField = document.querySelector("#installment-field");
  const installmentSelect = document.querySelector("#installments");
  const confirmationDialog = document.querySelector("#order-confirmation");
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
    renderInstallmentOptions();
    BrunoCart.sync();
  }

  function renderInstallmentOptions() {
    const totalInCents = Math.round(BrunoCart.total(productList) * 100);
    const selectedInstallment = Number(installmentSelect.value) || 1;
    installmentSelect.innerHTML = "";

    for (let installmentCount = 1; installmentCount <= 12; installmentCount += 1) {
      const installmentAmount = Math.round(totalInCents / installmentCount) / 100;
      const option = document.createElement("option");
      option.value = String(installmentCount);
      option.textContent = `${installmentCount}x de ${currencyFormatter.format(installmentAmount)} sem juros`;
      installmentSelect.append(option);
    }

    installmentSelect.value = String(Math.min(selectedInstallment, 12));
    updateInstallmentVisibility();
  }

  function updateInstallmentVisibility() {
    const isCardPayment = paymentMethodSelect.value === "card";
    installmentField.hidden = !isCardPayment;
    installmentSelect.disabled = !isCardPayment || BrunoCart.total(productList) <= 0;
    if (!isCardPayment) {
      document.querySelector('[data-error="installments"]').textContent = "";
    }
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
  paymentMethodSelect.addEventListener("change", updateInstallmentVisibility);

  const checkoutForm = document.querySelector("#checkout-form");
  const checkoutMessage = document.querySelector("#checkout-message");
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let isFormValid = true;
    const formValues = {
      name: checkoutForm.elements.name.value.trim(),
      email: checkoutForm.elements.email.value.trim(),
      payment: checkoutForm.elements.payment.value,
      installments: checkoutForm.elements.payment.value === "card"
        ? checkoutForm.elements.installments.value
        : "",
    };

    const requiredValues = {
      name: formValues.name,
      email: formValues.email,
      payment: formValues.payment,
      ...(formValues.payment === "card" ? { installments: formValues.installments } : {}),
    };

    Object.entries(requiredValues).forEach(([fieldName, fieldValue]) => {
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
    const paymentDescription = formValues.payment === "pix"
      ? "Pix"
      : `Cartão de crédito em ${formValues.installments}x de ${currencyFormatter.format(
          Math.round((BrunoCart.total(productList) * 100) / Number(formValues.installments)) / 100,
        )}`;
    document.querySelector("#confirmation-details").textContent = `Obrigado, ${formValues.name}! Seu pedido demonstrativo #${orderNumber} foi registrado. Forma de pagamento: ${paymentDescription}. Nenhum pagamento foi processado.`;
    BrunoCart.clear();
    checkoutForm.reset();
    updateInstallmentVisibility();
    confirmationDialog.showModal();
  });

  document.querySelector("[data-close-confirmation]").addEventListener("click", () => {
    confirmationDialog.close();
  });

  confirmationDialog.addEventListener("click", (event) => {
    if (event.target === confirmationDialog) confirmationDialog.close();
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



