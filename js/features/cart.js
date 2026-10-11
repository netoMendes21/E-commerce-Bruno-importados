(() => {
  const storageKey = "bruno-importados-cart";

  function normalizeItems(items) {
    const uniqueItems = new Map();

    items.forEach((item) => {
      if (
        !item ||
        typeof item.id !== "string" ||
        typeof item.size !== "string"
      ) {
        return;
      }

      const quantity = Math.floor(Number(item.quantity));
      if (!item.id || !item.size || !Number.isFinite(quantity) || quantity < 1) {
        return;
      }

      const key = item.id + "::" + item.size;
      const existingItem = uniqueItems.get(key);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        uniqueItems.set(key, {
          id: item.id,
          size: item.size,
          quantity,
        });
      }
    });

    return [...uniqueItems.values()];
  }

  function loadItems() {
    let parsedItems;

    try {
      const storedValue = localStorage.getItem(storageKey) || "[]";
      parsedItems = JSON.parse(storedValue);
    } catch {
      return [];
    }

    const items = Array.isArray(parsedItems) ? normalizeItems(parsedItems) : [];

    try {
      if (JSON.stringify(items) !== JSON.stringify(parsedItems)) {
        localStorage.setItem(storageKey, JSON.stringify(items));
      }
    } catch {
      // Os itens carregados continuam disponíveis durante esta sessão.
    }

    return items;
  }

  let items = loadItems();

  function updateCartCount() {
    const itemCount = items.reduce(
      (total, item) => total + item.quantity,
      0,
    );

    document.querySelectorAll("[data-cart-count]").forEach((counter) => {
      counter.textContent = itemCount > 99 ? "99+" : String(itemCount);

      const cartLink = counter.closest(".cart-icon");
      if (cartLink) {
        const itemLabel = itemCount === 1 ? "item" : "itens";
        cartLink.setAttribute(
          "aria-label",
          "Carrinho, " + itemCount + " " + itemLabel,
        );
      }
    });
  }

  function saveItems() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // A sessão atual continua funcional se o navegador não permitir persistência.
    }

    document.dispatchEvent(new CustomEvent("cart:updated"));
  }

  function findItem(productId, size) {
    return items.find((item) => item.id === productId && item.size === size);
  }

  function removeItem(productId, size) {
    items = items.filter(
      (item) => item.id !== productId || item.size !== size,
    );
    saveItems();
  }

  function getItemCount() {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  window.BrunoCart = {
    get items() {
      return items.map((item) => ({ ...item }));
    },

    add(productId, size) {
      if (typeof productId !== "string" || typeof size !== "string") return;

      const existingItem = findItem(productId, size);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        items.push({ id: productId, size, quantity: 1 });
      }

      saveItems();
    },

    remove: removeItem,

    setQuantity(productId, size, quantity) {
      const nextQuantity = Math.floor(Number(quantity));
      if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
        removeItem(productId, size);
        return;
      }

      const item = findItem(productId, size);
      if (!item) return;

      item.quantity = nextQuantity;
      saveItems();
    },

    count: getItemCount,

    total(products = window.BRUNO_PRODUCTS || []) {
      const productPrices = new Map(
        products.map((product) => [product.id, Number(product.price) || 0]),
      );

      return items.reduce(
        (total, item) =>
          total + (productPrices.get(item.id) || 0) * item.quantity,
        0,
      );
    },

    clear() {
      items = [];
      saveItems();
    },

    sync: updateCartCount,
  };

  document.addEventListener("cart:updated", updateCartCount);
  updateCartCount();
})();
