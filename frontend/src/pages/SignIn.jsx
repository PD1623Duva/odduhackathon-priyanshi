import "./SignIn.css";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="input-icon">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="input-icon">
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 018 0v3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="eye-icon">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M4 20L20 4" />
    </svg>
  );
}

function SignIn() {
  return (
    <div className="signin-page">

      {/* NAVBAR */}
      <header className="navbar">

        <div className="navbar-logo">
          StockSense
        </div>

        <nav className="navbar-links">
          <a href="/" className="active">Home</a>
          <a href="#about">About Us</a>
          <a href="#test">Test</a>
          <a href="#feedback">Feedback</a>
        </nav>

      </header>

      {/* MAIN CONTENT */}
      <main className="signin-main">

        {/* LEFT ILLUSTRATION */}
        <section className="illustration-section">

          <div className="illustration-wrapper">
            <img
              src="/inventory-illustration.svg"
              alt="Inventory management illustration"
              className="inventory-image"
            />
          </div>

        </section>

        {/* RIGHT LOGIN CARD */}
        <section className="login-section">

          <div className="login-card">

            <h1>Welcome back</h1>

            <p className="login-subtitle">
              Sign in to manage your inventory
            </p>

            <form>

              {/* EMAIL */}
              <div className="input-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="input-wrapper">
                  <MailIcon />

                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>

              </div>

              {/* PASSWORD */}
              <div className="input-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="input-wrapper">
                  <LockIcon />

                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    aria-label="Show password"
                  >
                    <EyeIcon />
                  </button>
                </div>

              </div>

              {/* OPTIONS */}
              <div className="login-options">

                <label className="remember-me">

                  <input
                    type="checkbox"
                    id="remember"
                  />

                  <span className="custom-checkbox">
                    ✓
                  </span>

                  <span>Remember me</span>

                </label>

                <button
                  type="button"
                  className="forgot-password"
                >
                  Forgot Password?
                </button>

              </div>

              {/* SIGN IN BUTTON */}
              <button
                type="submit"
                className="signin-button"
              >
                <span>Sign In</span>
                <span className="arrow">→</span>
              </button>

            </form>

            {/* DIVIDER */}
            <div className="divider">
              <span></span>
              <p>or</p>
              <span></span>
            </div>

            {/* SIGN UP */}
            <p className="signup-text">
              Don't have an account?
              <button type="button">
                Sign Up
              </button>
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default SignIn;