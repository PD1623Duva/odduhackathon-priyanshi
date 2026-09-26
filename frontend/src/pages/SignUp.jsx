import "./SignUp.css";

function SignUp() {
  return (
    <div className="signup-page">

      <div className="signup-card">

        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Join StockSense and manage your inventory smarter</p>
        </div>

        <form className="signup-form">

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
              />
            </div>

          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              placeholder="Enter your contact number"
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>State</label>
              <select>
                <option value="">Select State</option>
                <option>Jammu & Kashmir</option>
                <option>Haryana</option>
                <option>Delhi</option>
                <option>Punjab</option>
                <option>Maharashtra</option>
              </select>
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                placeholder="Enter your city"
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Gender</label>

              <div className="gender-options">
                <label>
                  <input type="radio" name="gender" value="male" />
                  Male
                </label>

                <label>
                  <input type="radio" name="gender" value="female" />
                  Female
                </label>

                <label>
                  <input type="radio" name="gender" value="other" />
                  Other
                </label>
              </div>

            </div>

          </div>

          <div className="terms">
            <label>
              <input type="checkbox" />
              <span>
                I agree to the Terms & Conditions
              </span>
            </label>
          </div>

          <button type="submit" className="signup-button">
            Create Account →
          </button>

        </form>

        <div className="login-link">
          Already have an account?
          <a href="#"> Sign In</a>
        </div>

      </div>

    </div>
  );
}

export default SignUp;