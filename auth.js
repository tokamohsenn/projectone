const formTitle = document.getElementById('form-title');
const authForm = document.getElementById('auth-form');
const nameField = document.getElementById('name');
const toggleText = document.getElementById('toggle-text');
const toggleLink = document.getElementById('toggle-link');
const submitBtn = document.getElementById('submit-btn');

let isLogin = true;

toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  isLogin = !isLogin;

  if (isLogin) {
    formTitle.textContent = 'Welcome Back';
    nameField.classList.add('hidden');
    submitBtn.textContent = 'Login';
    toggleText.innerHTML = `Don't have an account? <a href="#" id="toggle-link">Sign Up</a>`;
  } else {
    formTitle.textContent = 'Create Account';
    nameField.classList.remove('hidden');
    submitBtn.textContent = 'Sign Up';
    toggleText.innerHTML = `Already have an account? <a href="#" id="toggle-link">Login</a>`;
  }
});


authForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameField.value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password || (!isLogin && !name)) {
    alert('Please fill all fields');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];

  if (isLogin) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = 'index.html';
    } else {
      alert('Invalid email or password');
    }
  } else {
    if (users.some(u => u.email === email)) {
      alert('Email already registered');
      return;
    }
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    window.location.href = 'index.html';
  }
});


window.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
    window.location.href = 'home.html';
  }
});

