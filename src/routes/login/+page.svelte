<script lang="ts">
  export let form;
</script>

<div class="auth-container">
  <div class="auth-card">
    <div class="auth-header">
      <div class="auth-icon">🌤️</div>
      <h2 class="auth-title">Welcome Back</h2>
      <p class="auth-subtitle">Sign in to your weather account</p>
    </div>

    <form method="POST" class="auth-form">
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
          placeholder="Enter your password" 
          class="form-input"
          required 
        />
      </div>

      <button type="submit" class="auth-button">
        <span class="button-text">Sign In</span>
        <span class="button-icon">→</span>
      </button>
    </form>

    {#if form?.error}
      <div class="error-message">
        <span class="error-icon">⚠️</span>
        <p>{form.error}</p>
      </div>
    {/if}

    <div class="auth-footer">
      <p class="footer-text">
        Don't have an account? 
        <a href="/signup" class="auth-link">Sign up here</a>
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .auth-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    padding: 40px;
    width: 100%;
    max-width: 400px;
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    gap: 20px;
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
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .form-input::placeholder {
    color: #9ca3af;
  }

  .auth-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  .auth-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
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
    transform: translateX(2px);
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
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .auth-link:hover {
    color: #764ba2;
    text-decoration: underline;
  }

  /* Responsive Design */
  @media (max-width: 480px) {
    .auth-container {
      padding: 16px;
    }

    .auth-card {
      padding: 32px 24px;
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
  }

  /* Accessibility */
  .auth-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  }

  .auth-link:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
    border-radius: 4px;
  }

  .auth-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
</style>