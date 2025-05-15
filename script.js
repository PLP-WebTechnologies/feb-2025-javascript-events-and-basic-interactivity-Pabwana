// Event Handling Section
const colorToggleBtn = document.getElementById('colorToggleBtn');
const secretMessage = document.getElementById('secret-message');
let toggleState = false;
let longPressTimer = null;

// Toggle button text and color on click
colorToggleBtn.addEventListener('click', () => {
  toggleState = !toggleState;
  if (toggleState) {
    colorToggleBtn.textContent = 'Clicked!';
    colorToggleBtn.style.backgroundColor = 'var(--secondary-color)';
    colorToggleBtn.setAttribute('aria-pressed', 'true');
  } else {
    colorToggleBtn.textContent = 'Click me!';
    colorToggleBtn.style.backgroundColor = 'var(--primary-color)';
    colorToggleBtn.setAttribute('aria-pressed', 'false');
  }
});

// Secret action: double-click shows secret message briefly
colorToggleBtn.addEventListener('dblclick', () => {
  secretMessage.textContent = "🤫 Secret Unlocked! Double-click detected!";
  secretMessage.classList.add('visible');
  setTimeout(() => secretMessage.classList.remove('visible'), 2500);
});

// Secret action: long press (mousedown + delay)
colorToggleBtn.addEventListener('mousedown', () => {
  longPressTimer = setTimeout(() => {
    secretMessage.textContent = "🤫 Secret Unlocked! Long press detected!";
    secretMessage.classList.add('visible');
    setTimeout(() => secretMessage.classList.remove('visible'), 2500);
  }, 1500);
});
colorToggleBtn.addEventListener('mouseup', () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
});
colorToggleBtn.addEventListener('mouseleave', () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
});

// Keypress detection
const keypressArea = document.getElementById('keypress-area');
keypressArea.addEventListener('keydown', (e) => {
  e.preventDefault();
  const key = e.key === ' ' ? 'Space' : e.key;
  keypressArea.textContent = `You pressed: "${key}" (code: ${e.code})`;
});

// Interactive Elements Section

// Image Gallery Slideshow
const galleryImages = document.querySelectorAll('.gallery img');
const prevBtn = document.getElementById('prevImg');
const nextBtn = document.getElementById('nextImg');
let currentIndex = 0;

function showImage(index) {
  galleryImages.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  showImage(currentIndex);
});
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  showImage(currentIndex);
});

// Tabs functionality
const tabButtons = document.querySelectorAll('.tab-buttons button');
const tabPanels = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('aria-controls');

    tabButtons.forEach(btn => {
      btn.setAttribute('aria-selected', 'false');
      btn.classList.remove('active');
    });
    tabPanels.forEach(panel => {
      panel.hidden = true;
    });

    button.setAttribute('aria-selected', 'true');
    button.classList.add('active');
    document.getElementById(targetId).hidden = false;
  });
});

// Accordion functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const expanded = header.getAttribute('aria-expanded') === 'true';
    const contentId = header.getAttribute('aria-controls');
    const content = document.getElementById(contentId);

    if (expanded) {
      header.setAttribute('aria-expanded', 'false');
      content.classList.remove('open');
      content.hidden = true;
    } else {
      header.setAttribute('aria-expanded', 'true');
      content.classList.add('open');
      content.hidden = false;
    }
  });
  // Allow keyboard toggle (space/enter)
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});

// Form Validation Section
const form = document.getElementById('sampleForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const formSuccess = document.getElementById('formSuccess');

function validateName() {
  if (!nameInput.value.trim()) {
    nameError.textContent = 'Name is required.';
    nameInput.classList.add('invalid');
    nameInput.classList.remove('valid');
    return false;
  } else {
    nameError.textContent = '';
    nameInput.classList.remove('invalid');
    nameInput.classList.add('valid');
    return true;
  }
}
function validateEmail() {
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    emailError.textContent = 'Email is required.';
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    return false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = 'Enter a valid email address.';
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    return false;
  } else {
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
    return true;
  }
}
function validatePassword() {
  const pwd = passwordInput.value;
  if (!pwd) {
    passwordError.textContent = 'Password is required.';
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
    return false;
  } else if (pwd.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters.';
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
    return false;
  } else {
    passwordError.textContent = '';
    passwordInput.classList.remove('invalid');
    passwordInput.classList.add('valid');
    return true;
  }
}

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

form.addEventListener('submit', e => {
  e.preventDefault();
  formSuccess.textContent = '';

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isNameValid && isEmailValid && isPasswordValid) {
    formSuccess.textContent = 'Form submitted successfully! 🎉';
    form.reset();
    [nameInput, emailInput, passwordInput].forEach(input => {
      input.classList.remove('valid');
    });
  } else {
    formSuccess.textContent = '';
  }
});
