(() => {
  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  window.BrunoFormat = Object.freeze({
    currency: (amount) => currencyFormatter.format(Number(amount) || 0),
  });
})();
