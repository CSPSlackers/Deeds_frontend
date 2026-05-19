---
layout: none
permalink: /signup
search_exclude: true
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>D.A.D. | Create Account</title>
  <meta name="robots" content="noindex"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    :root { --green:#1B4332; --green-dark:#163828; --orange:#FF6B35; --orange-dark:#e55a25; --off-white:#f4f7f5; }
    html, body { height:100%; font-family:'Space Grotesk',sans-serif; }
    body { display:flex; min-height:100vh; }

    .left-panel {
      flex:1; background:var(--green);
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      padding:3rem 2.5rem; position:relative; overflow:hidden;
    }
    .left-panel::before { content:''; position:absolute; width:420px; height:420px; border-radius:50%; background:rgba(255,107,53,0.08); top:-80px; left:-80px; }
    .left-panel::after  { content:''; position:absolute; width:300px; height:300px; border-radius:50%; background:rgba(255,107,53,0.06); bottom:-60px; right:-60px; }
    .left-logo { width:90px; height:90px; border-radius:50%; border:3px solid rgba(255,107,53,0.6); object-fit:cover; margin-bottom:1.5rem; position:relative; z-index:1; }
    .left-panel h1 { font-size:clamp(1.6rem,3vw,2.4rem); font-weight:700; color:#fff; text-align:center; line-height:1.15; margin-bottom:0.75rem; position:relative; z-index:1; }
    .left-panel h1 span { color:var(--orange); }
    .left-panel p { font-size:0.95rem; color:rgba(255,255,255,0.65); text-align:center; max-width:300px; line-height:1.6; position:relative; z-index:1; }
    .left-tagline { margin-top:2.5rem; display:flex; flex-direction:column; gap:0.75rem; width:100%; max-width:300px; position:relative; z-index:1; }
    .left-tagline-item { display:flex; align-items:center; gap:0.6rem; font-size:0.88rem; color:rgba(255,255,255,0.75); }
    .left-tagline-item::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--orange); flex-shrink:0; }

    .right-panel { width:500px; background:var(--off-white); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:3rem 2.5rem; overflow-y:auto; }
    .form-card { width:100%; max-width:400px; }
    .form-card h2 { font-size:1.6rem; font-weight:700; color:var(--green); margin-bottom:0.3rem; }
    .form-card .subtitle { font-size:0.9rem; color:#6b7280; margin-bottom:1.75rem; }
    .form-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.25rem; }
    .form-group { display:flex; flex-direction:column; gap:0.4rem; margin-bottom:1.25rem; }
    .form-group.no-margin { margin-bottom:0; }
    .form-group label { font-size:0.78rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--green); }
    .form-group input { padding:0.8rem 1rem; border:2px solid #d1e7da; border-radius:8px; font-size:1rem; font-family:inherit; color:#1a1a1a; background:#fff; outline:none; transition:border-color 0.2s, box-shadow 0.2s; }
    .form-group input:focus { border-color:var(--green); box-shadow:0 0 0 3px rgba(27,67,50,0.1); }
    .hint { font-size:0.75rem; color:#9ca3af; margin-top:2px; }

    .btn-create { width:100%; padding:0.9rem; background:var(--orange); color:#fff; border:none; border-radius:8px; font-family:inherit; font-size:1rem; font-weight:700; letter-spacing:0.03em; cursor:pointer; transition:background 0.2s, transform 0.15s, box-shadow 0.2s; margin-top:0.5rem; }
    .btn-create:hover { background:var(--orange-dark); transform:translateY(-2px); box-shadow:0 6px 20px rgba(255,107,53,0.35); }
    .btn-create:active { transform:translateY(0); }
    .btn-create:disabled { opacity:0.6; cursor:not-allowed; transform:none; }

    #error-msg { background:#fff3f0; color:#c0392b; border-left:4px solid #e74c3c; padding:0.75rem 1rem; border-radius:6px; font-size:0.9rem; margin-bottom:1rem; display:none; }
    #success-msg { background:#f0faf4; color:#1B4332; border-left:4px solid #1B4332; padding:0.75rem 1rem; border-radius:6px; font-size:0.9rem; margin-bottom:1rem; display:none; }
    .footer-link { text-align:center; margin-top:1.25rem; font-size:0.88rem; color:#6b7280; }
    .footer-link a { color:var(--green); font-weight:600; text-decoration:none; }
    .footer-link a:hover { text-decoration:underline; }

    @media (max-width:750px) {
      body { flex-direction:column; }
      .left-panel { padding:2rem 1.5rem; min-height:200px; }
      .left-tagline { display:none; }
      .right-panel { width:100%; padding:2rem 1.5rem; }
      .form-row { grid-template-columns:1fr; }
    }
  </style>
</head>
<body>

  <div class="left-panel">
    <img class="left-logo"
         src="https://dadnonprofit-kfp2ps9o.manus.space/manus-storage/dad-logo_0ef8f3a8.png"
         onerror="this.style.display='none'" alt="D.A.D. Logo"/>
    <h1>Join<br><span>D.A.D.</span><br>Today</h1>
    <p>Create your account and start your journey of exceptional achievement.</p>
    <div class="left-tagline">
      <div class="left-tagline-item">Track and submit your deeds</div>
      <div class="left-tagline-item">Connect with the community</div>
      <div class="left-tagline-item">Access exclusive programs</div>
    </div>
  </div>

  <div class="right-panel">
    <div class="form-card">
      <h2>Create account</h2>
      <p class="subtitle">It's free and only takes a moment</p>

      <div id="error-msg"></div>
      <div id="success-msg"></div>

      <form id="signup-form">
        <div class="form-row">
          <div class="form-group no-margin">
            <label for="name">Full Name</label>
            <input id="name" type="text" placeholder="Jane Doe" required autocomplete="name"/>
          </div>
          <div class="form-group no-margin">
            <label for="uid">User ID</label>
            <input id="uid" type="text" placeholder="janedoe" required autocomplete="username"/>
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email <span style="font-weight:400;text-transform:none;color:#9ca3af">(optional)</span></label>
          <input id="email" type="email" placeholder="jane@example.com" autocomplete="email"/>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="At least 8 characters" required autocomplete="new-password"/>
          <span class="hint">Minimum 8 characters</span>
        </div>

        <div class="form-group">
          <label for="confirm">Confirm Password</label>
          <input id="confirm" type="password" placeholder="Repeat your password" required autocomplete="new-password"/>
        </div>

        <button type="submit" class="btn-create" id="submit-btn">Create Account</button>
      </form>

      <p class="footer-link">Already have an account? <a href="/login">Sign in</a></p>
      <p class="footer-link"><a href="/dad">&larr; Back to site</a></p>
    </div>
  </div>

  <script type="module">
    import { pythonURI, fetchOptions } from '/assets/js/api/config.js';

    const form   = document.getElementById('signup-form');
    const errBox = document.getElementById('error-msg');
    const sucBox = document.getElementById('success-msg');
    const btn    = document.getElementById('submit-btn');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      errBox.style.display = 'none';
      sucBox.style.display = 'none';

      const name     = document.getElementById('name').value.trim();
      const uid      = document.getElementById('uid').value.trim();
      const email    = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirm  = document.getElementById('confirm').value;

      if (name.length < 2) { errBox.textContent = 'Name must be at least 2 characters.'; errBox.style.display='block'; return; }
      if (uid.length  < 2) { errBox.textContent = 'User ID must be at least 2 characters.'; errBox.style.display='block'; return; }
      if (password.length < 8) { errBox.textContent = 'Password must be at least 8 characters.'; errBox.style.display='block'; return; }
      if (password !== confirm)  { errBox.textContent = 'Passwords do not match.'; errBox.style.display='block'; return; }

      btn.disabled = true;
      btn.textContent = 'Creating account…';

      try {
        const payload = { name, uid, password };
        if (email) payload.email = email;

        const resp = await fetch(pythonURI + '/api/user', {
          ...fetchOptions, method: 'POST', body: JSON.stringify(payload)
        });
        const data = await resp.json().catch(() => ({}));

        if (resp.ok) {
          // Auto-login after signup
          const loginResp = await fetch(pythonURI + '/api/authenticate', {
            ...fetchOptions, method: 'POST', body: JSON.stringify({ uid, password })
          });
          sucBox.textContent = 'Account created! Redirecting…';
          sucBox.style.display = 'block';
          setTimeout(() => { window.location.href = loginResp.ok ? '/dad' : '/login'; }, 1200);
        } else {
          errBox.textContent = data.message || 'Could not create account. That User ID may already be taken.';
          errBox.style.display = 'block';
          btn.disabled = false;
          btn.textContent = 'Create Account';
        }
      } catch(err) {
        errBox.textContent = 'Cannot reach server. Make sure the backend is running.';
        errBox.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Create Account';
      }
    });
  </script>
</body>
</html>
