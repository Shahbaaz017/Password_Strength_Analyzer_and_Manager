import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './add_pass.css';
import axios from "axios";  // Import Axios

const ManagePass = () => {
  const [serviceLink, setServiceLink] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Add a field for the user's email
  const [vaultPassword, setVaultPassword] = useState(""); // Add a field for the vault password

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the POST request to the Flask server
      const response = await axios.post("http://localhost:5000/api/passwords/add", {
        email: email,          // Send the email
        vault_password: vaultPassword,  // Send the vault password
        password_name: serviceLink,  // Use serviceLink as the name for the password
        password: password,  // Send the password to be stored
      });

      console.log("Password added:", response.data);
      alert("Password added successfully!");
    } catch (error) {
      console.error("Error adding password:", error);
      alert("Error adding password.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Enter Details</h2>

      {/* Password Management Form */}
      <form onSubmit={handleSubmit} className="form-center">
        <div className="mb-3">
          <label htmlFor="serviceLink" className="form-label">Service Link</label>
          <input
            type="text"
            className="form-control"
            id="serviceLink"
            value={serviceLink}
            onChange={(e) => setServiceLink(e.target.value)}
            required
          />
        </div>

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
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <label htmlFor="vaultPassword" className="form-label">Vault Password</label>
          <input
            type="password"
            className="form-control"
            id="vaultPassword"
            value={vaultPassword}
            onChange={(e) => setVaultPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Password</button>
      </form>
    </div>
  );
};

export default ManagePass;
