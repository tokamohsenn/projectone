
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
  window.location.href = 'auth.html';
}


function showToast(message, type = 'success') {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}


let cart = JSON.parse(localStorage.getItem('cart')) || [];


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


const cartItemsContainer = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');

function renderCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
    subtotalEl.textContent = `$0.00`;
    totalEl.textContent = `$0.00`;
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
        <div class="quantity-control">
          <button class="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="increase">+</button>
        </div>
      </div>
      <button class="remove-item"><i class="fas fa-trash"></i></button>
    `;

    
    cartItem.querySelector('.increase').addEventListener('click', () => {
      item.quantity++;
      saveCart();
      renderCart();
      showToast(`${item.name} quantity increased!`, 'success');
    });

    
    cartItem.querySelector('.decrease').addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
        saveCart();
        renderCart();
        showToast(`${item.name} quantity decreased!`, 'success');
      }
    });

    
    cartItem.querySelector('.remove-item').addEventListener('click', () => {
      cart.splice(index, 1);
      saveCart();
      renderCart();
      showToast(`${item.name} removed from cart!`, 'error');
    });

    cartItemsContainer.appendChild(cartItem);
  });

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  totalEl.textContent = `$${subtotal.toFixed(2)}`;

  
  const cartCountEl = document.getElementById('cart-count');
  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

renderCart();
