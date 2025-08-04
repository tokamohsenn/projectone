
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
  window.location.href = 'auth.html';
}

const product = JSON.parse(localStorage.getItem('selectedProduct'));

function showToast(message, type = 'success') {
  
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
  document.body.appendChild(toast);

  
  setTimeout(() => toast.remove(), 2500);
}

function addToCart(product, quantity) {
  if (product.stock === 0) {
    showToast(`${product.name} is out of stock!`, 'error');
    return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  const cartCountEl = document.getElementById('cart-count');
  if (cartCountEl) {
    cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  
  showToast(`${product.name} added to cart!`, 'success');
}


document.getElementById('header').innerHTML = `
  <div class="container">
    <h1 class="logo">Nexonic Store</h1>
    <nav>
      <a href="home.html">Home</a>
      <a href="index.html">Products</a>
      <a href="contact.html">Contact</a>
      <a href="cart.html" id="cart-link">Cart (<span id="cart-count">0</span>)</a>
      <button id="logout-btn" class="logout-btn">Logout</button>
    </nav>
  </div>
`;


document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'auth.html';
});


document.getElementById('footer').innerHTML = `
  <p>© 2025 MyStore - All rights reserved</p>
`;

const detailsContainer = document.getElementById('product-details');
if (product) {
  detailsContainer.innerHTML = `
    <div class="product-image-container">
      <img src="${product.img}" alt="${product.name}" class="product-image">
    </div>
    <div class="product-info">
      <h2>${product.name}</h2>
      <p class="product-description">${product.description}</p>
      <p class="product-price">$${product.price}</p>
      <p class="stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}">
        ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}
      </p>
      <div class="quantity-control">
        <button id="decrease">-</button>
        <span id="quantity">1</span>
        <button id="increase">+</button>
      </div>
      <button class="add-to-cart" ${product.stock === 0 ? 'disabled' : ''}>
        <i class="fas fa-cart-plus"></i> Add to Cart
      </button>
    </div>
  `;

  
  let quantity = 1;
  const quantityEl = document.getElementById('quantity');
  document.getElementById('increase').addEventListener('click', () => {
    quantity++;
    quantityEl.textContent = quantity;
  });
  document.getElementById('decrease').addEventListener('click', () => {
    if (quantity > 1) quantity--;
    quantityEl.textContent = quantity;
  });

  
  detailsContainer.querySelector('.add-to-cart').addEventListener('click', () => {
    addToCart(product, quantity);
  });
} else {
  detailsContainer.innerHTML = `<p>Product not found!</p>`;

const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
document.getElementById('cart-count').textContent = savedCart.reduce((sum, item) => sum + item.quantity, 0);}
