import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './add_pass.css';

const ManagePass = () => {
  const [serviceLink, setServiceLink] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password management submission logic here
    console.log("Adding password for:", { serviceLink, username, password });
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

        <button type="submit" className="btn btn-primary">Add Password</button>
      </form>
    </div>
  );
};

export default ManagePass;