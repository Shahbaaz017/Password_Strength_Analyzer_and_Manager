import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import './register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [vaultPassword, setVaultPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [mnemonic, setMnemonic] = useState([]);

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Updates the mnemonic state at the given index with the new value.
   * @param {number} index The index in the mnemonic array to update.
   * @param {string} value The new value to set at the given index.
   */
/******  718f1d27-8acd-4a4a-b972-9895808fc964  *******/  const handleSubmit = async (e) => {
    e.preventDefault();

    if (vaultPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          vault_password: vaultPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setShowMnemonic(true);
        setMnemonic(data.mnemonic.split(" ")); // Split the mnemonic into words
      } else {
        alert(data.message || "Error registering user!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleMnemonicSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted mnemonic:", mnemonic);
    alert("Mnemonic saved successfully!");
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      {/* Registration Form */}
      {!showMnemonic && (
        <form onSubmit={handleSubmit} className="form-center">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="vaultPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="vaultPassword"
              value={vaultPassword}
              onChange={(e) => setVaultPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">Register</button>
        </form>
      )}

      {/* Mnemonic Input */}
      {showMnemonic && (
        <form onSubmit={handleMnemonicSubmit} className="form-center">
          <h5>Your 12-Word Recovery Phrase</h5>
          <div className="row">
            {mnemonic.map((word, index) => (
              <div className="col-4 mb-3" key={index}>
                <input
                  type="text"
                  className="form-control"
                  value={word}
                  readOnly
                />
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary mt-4">Finish</button>
        </form>
      )}
    </div>
  );
};

export default Register;
