document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector("#cart-items");
  const totalPriceElement = document.querySelector("#total-price");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to update cart display
  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-controls">
          <input type="number" value="${item.quantity}" min="1" class="quantity-input">
          <button class="remove-item">Remove</button>
        </div>
        <p class="cart-item-total">$${itemTotal.toFixed(2)}</p>
      `;

      // Event listener for quantity input change
      cartItem.querySelector(".quantity-input").addEventListener("change", (event) => {
        const newQuantity = parseInt(event.target.value);
        if (newQuantity > 0) {
          item.quantity = newQuantity;
          updateCart();
        }
      });

      // Event listener for remove button
      cartItem.querySelector(".remove-item").addEventListener("click", () => {
        if (confirm("Are you sure you want to remove this item?")) {
          cart = cart.filter((cartItem) => cartItem.id !== item.id);
          updateCart();
        }
      });

      cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = total.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
  }

  // Initial cart update
  updateCart();
});
