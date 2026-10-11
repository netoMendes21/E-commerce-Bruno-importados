(() => {
  const products = window.BRUNO_PRODUCTS || [];
  const cartItemsContainer = document.querySelector("#cart-items");
  const emptyCartMessage = document.querySelector("#cart-empty");
  const cartTotalElement = document.querySelector("#cart-total");
  const paymentMethodSelect = document.querySelector("#payment-method");
  const installmentField = document.querySelector("#installment-field");
  const installmentSelect = document.querySelector("#installments");
  const checkoutForm = document.querySelector("#checkout-form");
  const checkoutMessage = document.querySelector("#checkout-message");
  const confirmationDialog = document.querySelector("#order-confirmation");

  if (
    !cartItemsContainer ||
    !emptyCartMessage ||
    !cartTotalElement ||
    !paymentMethodSelect ||
    !installmentField ||
    !installmentSelect ||
    !checkoutForm ||
    !checkoutMessage ||
    !confirmationDialog
  ) {
    return;
  }

  function renderCartItem(cartItem) {
    const product = products.find((item) => item.id === cartItem.id);
    if (!product) return "";

    return [
      '<article class="cart-row">',
      '  <img src="' + product.image + '" alt="' + product.alt + '">',
      '  <div class="cart-description">',
      "    <p>" + product.team + "</p>",
      "    <h3>" + product.name + "</h3>",
      "    <span>Tamanho " + cartItem.size + " · " + BrunoFormat.currency(product.price) + " cada</span>",
      '    <div class="quantity-control" role="group" aria-label="Quantidade de ' + product.name + '">',
      "      <span>Quantidade</span>",
      '      <div class="quantity-actions">',
      '        <div class="quantity-buttons">',
      '          <button class="quantity-button" type="button" data-quantity-change="-1" data-product-id="' + cartItem.id + '" data-size="' + cartItem.size + '" aria-label="Diminuir quantidade">−</button>',
      '          <output class="quantity-value" aria-live="polite">' + cartItem.quantity + "</output>",
      '          <button class="quantity-button" type="button" data-quantity-change="1" data-product-id="' + cartItem.id + '" data-size="' + cartItem.size + '" aria-label="Aumentar quantidade">+</button>',
      "        </div>",
      '        <button class="cart-remove" type="button" data-remove="' + cartItem.id + '" data-size="' + cartItem.size + '">Remover</button>',
      "      </div>",
      "    </div>",
      "  </div>",
      "</article>",
    ].join("");
  }

  function renderCart() {
    const cartItems = BrunoCart.items;

    cartItemsContainer.innerHTML = cartItems.map(renderCartItem).join("");
    emptyCartMessage.hidden = cartItems.length > 0;
    cartTotalElement.textContent = BrunoFormat.currency(BrunoCart.total(products));

    renderInstallmentOptions();
    BrunoCart.sync();
  }

  function renderInstallmentOptions() {
    const selectedCount = Number(installmentSelect.value) || 1;
    const totalInCents = Math.round(BrunoCart.total(products) * 100);
    const options = [];

    for (let count = 1; count <= 12; count += 1) {
      const amount = Math.round(totalInCents / count) / 100;
      const option = document.createElement("option");
      option.value = String(count);
      option.textContent =
        count + "x de " + BrunoFormat.currency(amount) + " sem juros";
      options.push(option);
    }

    installmentSelect.replaceChildren(...options);
    installmentSelect.value = String(Math.min(selectedCount, 12));
    updateInstallmentVisibility();
  }

  function updateInstallmentVisibility() {
    const isCardPayment = paymentMethodSelect.value === "card";
    installmentField.hidden = !isCardPayment;
    installmentSelect.disabled =
      !isCardPayment || BrunoCart.total(products) <= 0;

    if (!isCardPayment) {
      setFieldError("installments", "");
    }
  }

  function setFieldError(fieldName, message) {
    const errorElement = document.querySelector(
      '[data-error="' + fieldName + '"]',
    );
    if (errorElement) errorElement.textContent = message;
  }

  function validateForm(values) {
    let isValid = true;
    const fields = [
      ["name", values.name],
      ["email", values.email],
      ["payment", values.payment],
    ];

    if (values.payment === "card") {
      fields.push(["installments", values.installments]);
    }

    fields.forEach(([fieldName, value]) => {
      let message = "";

      if (!value) {
        message = "Preencha este campo.";
      } else if (
        fieldName === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        message = "Informe um e-mail válido.";
      }

      setFieldError(fieldName, message);
      if (message) isValid = false;
    });

    if (BrunoCart.count() === 0) {
      checkoutMessage.textContent =
        "Adicione um produto ao carrinho antes de continuar.";
      isValid = false;
    }

    return isValid;
  }

  function getFormValues() {
    const payment = checkoutForm.elements.payment.value;

    return {
      name: checkoutForm.elements.name.value.trim(),
      email: checkoutForm.elements.email.value.trim(),
      payment,
      installments:
        payment === "card" ? checkoutForm.elements.installments.value : "",
    };
  }

  function getPaymentDescription(values, orderTotal) {
    if (values.payment === "pix") return "Pix";

    const installmentCount = Number(values.installments);
    const installmentAmount =
      Math.round((orderTotal * 100) / installmentCount) / 100;

    return (
      "Cartão de crédito em " +
      installmentCount +
      "x de " +
      BrunoFormat.currency(installmentAmount)
    );
  }

  function showOrderConfirmation(values) {
    const orderNumber = Date.now().toString().slice(-6);
    const orderTotal = BrunoCart.total(products);
    const paymentDescription = getPaymentDescription(values, orderTotal);
    const details = document.querySelector("#confirmation-details");

    details.textContent =
      "Obrigado, " +
      values.name +
      "! Seu pedido demonstrativo #" +
      orderNumber +
      " foi registrado. Forma de pagamento: " +
      paymentDescription +
      ". Nenhum pagamento foi processado.";

    BrunoCart.clear();
    checkoutForm.reset();
    updateInstallmentVisibility();
    confirmationDialog.showModal();
  }

  cartItemsContainer.addEventListener("click", (event) => {
    const quantityButton = event.target.closest("[data-quantity-change]");

    if (quantityButton) {
      const item = BrunoCart.items.find(
        (cartItem) =>
          cartItem.id === quantityButton.dataset.productId &&
          cartItem.size === quantityButton.dataset.size,
      );

      if (item) {
        const change = Number(quantityButton.dataset.quantityChange);
        BrunoCart.setQuantity(item.id, item.size, item.quantity + change);
      }
      return;
    }

    const removeButton = event.target.closest("[data-remove]");
    if (removeButton) {
      BrunoCart.remove(removeButton.dataset.remove, removeButton.dataset.size);
    }
  });

  paymentMethodSelect.addEventListener("change", updateInstallmentVisibility);
  document.addEventListener("cart:updated", renderCart);

  checkoutForm.addEventListener("input", (event) => {
    const field = event.target;
    if (field.name) setFieldError(field.name, "");
    checkoutMessage.textContent = "";
    checkoutMessage.classList.remove("is-error");
  });

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const values = getFormValues();
    checkoutMessage.textContent = "";
    checkoutMessage.classList.remove("is-error");

    if (!validateForm(values)) {
      checkoutMessage.classList.add("is-error");
      return;
    }

    showOrderConfirmation(values);
  });

  document
    .querySelector("[data-close-confirmation]")
    ?.addEventListener("click", () => confirmationDialog.close());

  confirmationDialog.addEventListener("click", (event) => {
    if (event.target === confirmationDialog) confirmationDialog.close();
  });

  renderCart();
})();
