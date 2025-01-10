import React, { useState } from "react";
import { Link } from "react-router-dom";
import zxcvbn from "zxcvbn";
import "./securityAnimation.css";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [feedback, setFeedback] = useState({});
  const [realTimeFeedback, setRealTimeFeedback] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const evaluateStrength = (password) => {
    const result = zxcvbn(password);
    const strengthLabels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
    setStrength(strengthLabels[result.score]);

    // Update feedback from zxcvbn
    setFeedback({
      warning: result.feedback.warning,
      suggestions: result.feedback.suggestions,
    });

    // Real-time feedback
    const feedbackMessages = [];
    if (!/[A-Z]/.test(password)) feedbackMessages.push("Include at least one uppercase letter.");
    if (!/[a-z]/.test(password)) feedbackMessages.push("Include at least one lowercase letter.");
    if (!/[0-9]/.test(password)) feedbackMessages.push("Include at least one number.");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      feedbackMessages.push("Include at least one special character.");
    if (password.length < 8)
      feedbackMessages.push("Password should be at least 8 characters long.");
    setRealTimeFeedback(feedbackMessages);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    evaluateStrength(newPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const generatedPassword = Array.from({ length: 12 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
    setPassword(generatedPassword);
    evaluateStrength(generatedPassword);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="password-checker-container">
      {/* Animated Security Lock */}
      <div className="animation-container">
        <div className="lock-icon"></div>
        <div className="wave"></div>
      </div>

      {/* Password Strength Checker Form */}
      <div className="form-container">
        <h1>Password Strength Checker</h1>
        <div className="input-group">
          <label htmlFor="password">Enter your password:</label>
          <div className="password-input-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Type your password"
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Real-Time Feedback */}
          <div className={`strength strength-${strength.toLowerCase()}`}>
            Strength: <strong>{strength || "Enter a password"}</strong>
          </div>
          {feedback.warning && <p className="feedback-warning">⚠️ {feedback.warning}</p>}
          {feedback.suggestions?.length > 0 && (
            <ul className="feedback-suggestions">
              {feedback.suggestions.map((suggestion, index) => (
                <li key={index}>💡 {suggestion}</li>
              ))}
            </ul>
          )}

          {/* Real-Time Requirement Feedback */}
          {realTimeFeedback.length > 0 && (
            <ul className="real-time-feedback">
              {realTimeFeedback.map((message, index) => (
                <li key={index}>🔑 {message}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Strength Progress Bar */}
        <div className="progress-bar">
          <div className={`progress-fill strength-${strength.toLowerCase()}`}></div>
        </div>

        <button onClick={copyPassword} className="btn btn-secondary">
          Copy Password
        </button>
        <button onClick={generatePassword} className="btn btn-primary">
          Generate Strong Password
        </button>

        {/* Back to Homepage Button */}
        <Link to="/" className="btn btn-link">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;