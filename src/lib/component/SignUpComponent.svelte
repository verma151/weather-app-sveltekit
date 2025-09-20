<script lang="ts">
export let form;
</script>



<div class="auth-container">
  <div class="auth-card">
    <div class="auth-header">
      <div class="auth-icon">🌤️</div>
      <h2 class="auth-title">Create Account</h2>
      <p class="auth-subtitle">Join us to track your weather</p>
    </div>

    {#if form?.success}
      <div class="success-message" style="background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 16px; text-align:center; margin-bottom:16px;">
        <span style="font-size:1.5rem;">✅</span>
        <p style="margin:0; color:#065f46; font-weight:500;">
          Signup successful! <a href="/login" class="auth-link">Go to Login</a>
        </p>
      </div>
    {:else}
      <form method="POST" class="auth-form">
        <div class="form-group">
          <label for="name" class="form-label">Full Name</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            placeholder="Enter your full name" 
            class="form-input"
            required 
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            placeholder="Enter your email" 
            class="form-input"
            required 
          />
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input 
            type="password" 
            id="password"
            name="password" 
            placeholder="Create a password" 
            class="form-input"
            required 
          />
        </div>

        <button type="submit" class="auth-button">
          <span class="button-text">Create Account</span>
          <span class="button-icon">✨</span>
        </button>
      </form>

      {#if form?.error}
        <div class="error-message">
          <span class="error-icon">⚠️</span>
          <p>{form.error}</p>
        </div>
      {/if}
    {/if}

    <div class="auth-footer">
      <p class="footer-text">
        Already have an account? 
        <a href="/login" class="auth-link">Sign in here</a>
      </p>
    </div>
  </div>
</div>

<style>
  .auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .auth-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    padding: 40px;
    width: 100%;
    max-width: 420px;
    position: relative;
    overflow: hidden;
  }

  .auth-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  .auth-header {
    text-align: center;
    margin-bottom: 32px;
  }

  .auth-icon {
    font-size: 3rem;
    margin-bottom: 16px;
  }

  .auth-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 8px 0;
  }

  .auth-subtitle {
    color: #64748b;
    font-size: 1rem;
    margin: 0;
    line-height: 1.5;
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 24px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-label {
    font-weight: 600;
    color: #374151;
    font-size: 0.9rem;
  }

  .form-input {
    padding: 14px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: #fafafa;
  }

  .form-input:focus {
    outline: none;
    border-color: #10b981;
    background: white;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  .form-input::placeholder {
    color: #9ca3af;
  }

  .auth-button {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 16px 24px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 8px;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  }

  .auth-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  }

  .auth-button:active {
    transform: translateY(0);
  }

  .button-text {
    flex: 1;
  }

  .button-icon {
    font-size: 1.2rem;
    transition: transform 0.2s ease;
  }

  .auth-button:hover .button-icon {
    transform: rotate(10deg) scale(1.1);
  }

  .error-message {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .error-icon {
    font-size: 1.2rem;
  }

  .error-message p {
    color: #dc2626;
    font-size: 0.9rem;
    margin: 0;
    font-weight: 500;
  }

  .auth-footer {
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid #e2e8f0;
  }

  .footer-text {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0;
  }

  .auth-link {
    color: #10b981;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .auth-link:hover {
    color: #059669;
    text-decoration: underline;
  }

  /* Responsive Design */
  @media (max-width: 480px) {
    .auth-container {
      padding: 16px;
    }

    .auth-card {
      padding: 32px 24px;
      max-width: 100%;
    }

    .auth-title {
      font-size: 1.75rem;
    }

    .auth-icon {
      font-size: 2.5rem;
    }

    .form-input {
      padding: 12px 14px;
    }

    .auth-button {
      padding: 14px 20px;
      font-size: 1rem;
    }

    .auth-form {
      gap: 16px;
    }
  }

  /* Accessibility */
  .auth-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
  }

  .auth-link:focus {
    outline: 2px solid #10b981;
    outline-offset: 2px;
    border-radius: 4px;
  }

  .auth-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  /* Password strength indicator could be added here */
  .form-input[type="password"]:focus {
    border-color: #10b981;
  }

  /* Name field specific styling */
  .form-input[name="name"]:valid {
    border-color: #d1fae5;
  }
</style>


