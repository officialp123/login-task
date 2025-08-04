const form = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');
const submitBtn = document.getElementById('submit-btn');
const spinner = document.getElementById('spinner');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  errorMsg.textContent = '';
  submitBtn.disabled = true;
  spinner.hidden = false;

  const email = form.email.value.trim();
  const password = form.password.value.trim();

  if (!email || !password) {
    showError("Please fill out all fields.");
    return;
  }

  try {
    const response = await mockLogin({ email, password });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    // Redirect to dashboard.html on successful login
window.location.href = 'dashboard.html';

  } catch (err) {
    showError(err.message);
  } finally {
    submitBtn.disabled = false;
    spinner.hidden = true;
  }
});

function showError(msg) {
  errorMsg.textContent = msg;
  spinner.hidden = true;
  submitBtn.disabled = false;
}

// Simulate a mocked API login
function mockLogin({ email, password }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'Password123') {
        resolve({ ok: true });
      } else {
        resolve({ ok: false });
      }
    }, 1200);
  });
}
// Add a simple validation for email format
form.email.addEventListener('input', () => {
  const email = form.email.value.trim();
  if (email && !validateEmail(email)) {
    showError("Please enter a valid email address.");
  } else {
    errorMsg.textContent = '';
  }
});
// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Add a simple validation for password strength and make it accessble

form.password.addEventListener('input', () => {
  const password = form.password.value.trim();
  if (password && !validatePasswordStrength(password)) {
    showError("Password must contain at least one uppercase letter, one lowercase letter, and one number.");
  } else {
    errorMsg.textContent = '';
  }
});

// Password strength validation function
function validatePasswordStrength(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return re.test(password);
}

const passwordStrengthText = document.getElementById('password-strength-text');
const strengthBar = document.getElementById('password-strength-fill');

form.password.addEventListener('input', () => {
  const password = form.password.value.trim();
  let strength = getPasswordStrength(password);

  passwordStrengthText.textContent = `Password Strength: ${strength.label}`;
  strengthBar.style.width = strength.percent;
  strengthBar.style.backgroundColor = strength.color;
});

function getPasswordStrength(password) {
  if (password.length === 0) {
    return { label: '', percent: '0%', color: '#eee' };
  }

  if (password.length < 6) {
    return { label: 'Too short', percent: '20%', color: 'red' };
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[\W_]/.test(password);

  const score = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

  switch (score) {
    case 1:
      return { label: 'Weak', percent: '25%', color: 'red' };
    case 2:
      return { label: 'Medium', percent: '50%', color: 'orange' };
    case 3:
      return { label: 'Good', percent: '75%', color: 'gold' };
    case 4:
      return { label: 'Strong', percent: '100%', color: 'green' };
    default:
      return { label: 'Weak', percent: '25%', color: 'red' };
  }
}

// Add a simple toggle for password visibility
const togglePasswordVisibility = document.getElementById('toggle-password-visibility');
togglePasswordVisibility.addEventListener('click', () => {
  const passwordField = form.password;
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    togglePasswordVisibility.textContent = 'Hide Password';
  } else {
    passwordField.type = 'password';
    togglePasswordVisibility.textContent = 'Show Password';
  }
});


