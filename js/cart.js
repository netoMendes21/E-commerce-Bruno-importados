(() => {
  const cartStorageKey = "bruno-importados-cart";

  function loadCartItems() {
    try {
      const storedItems = JSON.parse(localStorage.getItem(cartStorageKey) || "[]");
      return Array.isArray(storedItems) ? storedItems : [];
    } catch {
      return [];
    }
  }

  let cartItems = loadCartItems();

  function updateCartCount() {
    const itemCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    document.querySelectorAll("[data-cart-count]").forEach((countElement) => {
      countElement.textContent = itemCount > 99 ? "99+" : itemCount;
      const cartLink = countElement.closest(".cart-icon");
      if (cartLink) {
        cartLink.setAttribute("aria-label", `Carrinho, ${itemCount} ${itemCount === 1 ? "item" : "itens"}`);
      }
    });
  }

  function saveCartItems() {
    localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
    document.dispatchEvent(new CustomEvent("cart:updated"));
  }

  function removeCartItem(productId, selectedSize) {
    cartItems = cartItems.filter((cartItem) => {
      return !(cartItem.id === productId && cartItem.size === selectedSize);
    });
    saveCartItems();
  }

  window.BrunoCart = {
    get items() {
      return [...cartItems];
    },
    add(productId, selectedSize) {
      const existingItem = cartItems.find((cartItem) => {
        return cartItem.id === productId && cartItem.size === selectedSize;
      });
      if (existingItem) existingItem.quantity += 1;
      else cartItems.push({ id: productId, size: selectedSize, quantity: 1 });
      saveCartItems();
    },
    remove: removeCartItem,
    setQuantity(productId, selectedSize, newQuantity) {
      if (newQuantity < 1) return removeCartItem(productId, selectedSize);
      const matchingItem = cartItems.find((cartItem) => {
        return cartItem.id === productId && cartItem.size === selectedSize;
      });
      if (matchingItem) {
        matchingItem.quantity = newQuantity;
        saveCartItems();
      }
    },
    count() {
      return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    },
    total(productList) {
      return cartItems.reduce((total, cartItem) => {
        const matchingProduct = productList.find((product) => product.id === cartItem.id);
        return total + (matchingProduct?.price || 0) * cartItem.quantity;
      }, 0);
    },
    clear() {
      cartItems = [];
      saveCartItems();
    },
    sync: updateCartCount,
  };

  document.addEventListener("cart:updated", updateCartCount);
  document.addEventListener("DOMContentLoaded", updateCartCount);
})();
