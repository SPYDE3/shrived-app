let isLoginMode = true;

function toggleAuthMode(e) {
  e.preventDefault();
  isLoginMode = !isLoginMode;
  
  const loginForm = document.getElementById('login-form');
  const regForm = document.getElementById('register-form');
  const title = document.getElementById('auth-title');
  const subtitle = document.getElementById('auth-subtitle');

  if (isLoginMode) {
    loginForm.style.display = 'block';
    regForm.style.display = 'none';
    title.textContent = 'Welcome Back';
    subtitle.textContent = 'Sign in to view your spiritual bookings.';
  } else {
    loginForm.style.display = 'none';
    regForm.style.display = 'block';
    title.textContent = 'Join Shrived';
    subtitle.textContent = 'Create an account to manage your pujas.';
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  btn.disabled = true;
  btn.textContent = 'Signing In...';

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('shrived_user', JSON.stringify(data));
      window.Shrived.Toast.show('Successfully signed in!', 'success');
      setTimeout(() => {
        window.location.href = data.role === 'admin' ? 'admin.html' : 'dashboard.html';
      }, 1000);
    } else {
      window.Shrived.Toast.show(data.message || 'Login failed', 'error');
    }
  } catch (err) {
    window.Shrived.Toast.show('Network error. Please try again.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign In';
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const btn = document.getElementById('reg-btn');
  btn.disabled = true;
  btn.textContent = 'Creating Account...';

  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('shrived_user', JSON.stringify(data));
      window.Shrived.Toast.show('Account created successfully!', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    } else {
      window.Shrived.Toast.show(data.message || 'Registration failed', 'error');
    }
  } catch (err) {
    window.Shrived.Toast.show('Network error. Please try again.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Create Account';
  }
}

// Global logout function
window.logout = function() {
  localStorage.removeItem('shrived_user');
  window.location.href = 'login.html';
}
