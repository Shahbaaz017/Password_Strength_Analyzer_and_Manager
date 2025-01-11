import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [vaultPassword, setVaultPassword] = useState("");
  const [mnemonic, setMnemonic] = useState(Array(12).fill(""));
  const navigate = useNavigate();

  const handleMnemonicChange = (index, value) => {
    const newMnemonic = [...mnemonic];
    newMnemonic[index] = value;
    setMnemonic(newMnemonic);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare mnemonic as a space-separated string
    const mnemonicString = mnemonic.join(" ").trim();

    try {
      const response = await fetch("http://127.0.0.1:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          vault_password: vaultPassword,
          seed_phrase: mnemonicString,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        alert("Login successful!");

        // Navigate to the main page after login
        navigate("/MainPage");
      } else {
        alert(data.error || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="form-center">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
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
          <label htmlFor="vaultPassword" className="form-label">
            Vault Password
          </label>
          <input
            type="password"
            className="form-control"
            id="vaultPassword"
            value={vaultPassword}
            onChange={(e) => setVaultPassword(e.target.value)}
            required
          />
        </div>

        {/* Recovery Phrase */}
        <h5>Enter Your 12-Word Recovery Phrase</h5>
        <div className="row">
          {mnemonic.map((word, index) => (
            <div className="col-4 mb-3" key={index}>
              <input
                type="text"
                className="form-control"
                value={word}
                onChange={(e) => handleMnemonicChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
