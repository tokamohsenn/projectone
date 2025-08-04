
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
  window.location.href = 'auth.html';
}


const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    img: "photos/wireless headphones.jpg",
    description: "High-quality sound with noise cancellation and long battery life.",
    stock: 5
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 149.99,
    img: "photos/Smart Watch.jpg",
    description: "Track your fitness with this sleek and durable smart watch.",
    stock: 2
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 59.99,
    img: "photos/Bluetooth Speaker.jpg",
    description: "Portable speaker with waterproof design and rich sound.",
    stock: 0
  },
  {
    id: 4,
    name: "Gaming Mouse",
    price: 39.99,
    img: "photos/gaming mouse.jpg",
    description: "Precision sensor and customizable buttons for gaming.",
    stock: 8
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 89.99,
    img: "photos/machanical keyboard.jpg",
    description: "Durable keyboard with customizable lighting effects.",
    stock: 3
  },
  {
    id: 6,
    name: "Drone Camera",
    price: 399.99,
    img: "photos/drone camera.jpg",
    description: "Capture stunning aerial footage with high-res camera.",
    stock: 1
  }
];


function showToast(message, type = 'success') {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}


function addToCart(product) {
  if (product.stock === 0) {
    showToast(`${product.name} is out of stock!`, 'error');
    return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
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


const productsContainer = document.getElementById('products-container');

products.forEach(product => {
  const card = document.createElement('div');
  card.classList.add('product-card');

  card.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <div class="buttons-container">
      <button class="view-details"><i class="fas fa-eye"></i> View</button>
      <button class="add-to-cart"><i class="fas fa-cart-plus"></i> Add to Cart</button>
    </div>
  `;

  
  card.querySelector('.view-details').addEventListener('click', () => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = 'product.html';
  });

  
  card.querySelector('.add-to-cart').addEventListener('click', () => {
    addToCart(product);
  });

  productsContainer.appendChild(card);
});


const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
document.getElementById('cart-count').textContent = savedCart.reduce((sum, item) => sum + item.quantity, 0);
