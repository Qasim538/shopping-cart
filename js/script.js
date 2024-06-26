document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector("#product-list");
    const searchInput = document.querySelector("#input");
    const cartCountElement = document.querySelector("#cart-count");
    const cartIcon = document.querySelector("#cart-icon");
  
    // Create alert box
    const alertBox = document.createElement("div");
    alertBox.id = "alert-box";
    alertBox.className = "alert-box";
    document.body.appendChild(alertBox);
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let allProducts = [];
  
    // Fetch data from dummyjson.com
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        allProducts = data.products;
        displayProducts(allProducts);
      })
      .catch((error) => console.error("Error fetching products", error));
  
    // Function to display products
    function displayProducts(products) {
      productList.innerHTML = ""; // Clear previous products
  
      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.setAttribute("data-id", product.id);
        productElement.setAttribute("data-name", product.title);
        productElement.setAttribute("data-price", product.price);
        productElement.setAttribute("data-rating", product.rating);
  
        productElement.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <div class="product-details">
            <h3>${product.title}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
            <h4>${starRating(product.rating)}</h4>
          </div>
        `;
  
        productElement.querySelector(".add-to-cart").addEventListener("click", () => {
          console.log(`Add to Cart clicked for product id: ${product.id}`); // Debugging line
          addToCart(product.id, product.title, product.price, product.thumbnail);
        });
  
        productList.appendChild(productElement);
      });
    }

     // Start rating Function

     function starRating(rating) {
      const fullStar = '★'
      const emptyStar = '☆'
      let starHTML = ''
      for ( let i = 0; i < 5; i++) {
        starHTML += i < rating ? fullStar : emptyStar
      }
      return `<span class="stars">${starHTML}</span>`;

    }
  
    // Function to add product to cart
    function addToCart(id, name, price, image) {
      const existingProduct = cart.find((item) => item.id === id);
  
      // If product already in cart, increase quantity
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        // Otherwise, add new product to cart
        cart.push({ id, name, price, image, quantity: 1 });
      }
  
      updateCartCount();
      localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to local storage
  
      // Show alert box
      showAlert("Item has been added.");
    }
  
    // Function to update cart count in the header
    function updateCartCount() {
      cartCountElement.textContent = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    }
  
    // Function to show alert
    function showAlert(message) {
      alertBox.textContent = message;
      alertBox.style.display = "block";
      setTimeout(() => {
        alertBox.style.display = "none";
      }, 2000);
    }
  
    // Initial cart count update
    updateCartCount();
  
    // Search Products
    searchInput.addEventListener("input", (event) => {
      const query = event.target.value.toLowerCase();
      const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
      displayProducts(filteredProducts);
    });
  
    // Redirect to cart page
    cartIcon.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  });
  

