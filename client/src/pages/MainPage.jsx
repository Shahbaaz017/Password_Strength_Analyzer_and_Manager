import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import NavForAll from "../components/NavForAll";
import Footer from "../components/Footer";
import StarsBackground from "./StarsBackground";

const MainPage = () => {
  const [managedPasswords, setManagedPasswords] = useState([]);
  const [email, setEmail] = useState("");
  const [vaultPassword, setVaultPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userVaultPassword, setUserVaultPassword] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedVaultPassword = localStorage.getItem("vaultPassword");

    if (storedEmail && storedVaultPassword) {
      setEmail(storedEmail);
      setVaultPassword(storedVaultPassword);
      fetchPasswords(storedEmail, storedVaultPassword);
    } else {
      setShowPopup(true);
    }
  }, []);

  const fetchPasswords = async (userEmail, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/passwords/get-all", {
        email: userEmail,
        vault_password: password,
      });
      setManagedPasswords(response.data.passwords);
    } catch (error) {
      console.error("Error fetching passwords:", error);
      alert("Error fetching passwords.");
    }
  };

  const handleSaveCredentials = () => {
    if (userEmail && userVaultPassword) {
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("vaultPassword", userVaultPassword);
      setEmail(userEmail);
      setVaultPassword(userVaultPassword);
      setShowPopup(false);
      fetchPasswords(userEmail, userVaultPassword);
    } else {
      alert("Please provide both email and vault password.");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => alert("Password copied to clipboard!"),
      (err) => console.error("Could not copy text: ", err)
    );
  };

  return (
    <div className="position-relative">
      <StarsBackground />
      <div className="d-flex flex-column min-vh-100 position-relative" style={{ zIndex: 1 }}>
        <NavForAll />
        <div className="container-fluid d-flex flex-grow-1">
          <div className="col-md-3 p-4 text-white border-end bg-dark">
            <h4 className="mb-4">Navigation</h4>
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link to="/password-checker" className="btn btn-primary w-100 text-start text-white">
                  Password Strength Checker
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/add-password" className="btn btn-primary w-100 text-start text-white">
                  Add Password
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/analytics" className="btn btn-primary w-100 text-start text-white">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-9 p-4 text-white">
            <h1 className="mb-4">Welcome to Password Manager</h1>
            <h3 className="mb-3">Your Managed Passwords</h3>
            <div className="table-responsive">
              <table className="table table-dark table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Website</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Website Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {managedPasswords.map((item, index) => (
                    <tr key={index}>
                      <td>{item.website}</td>
                      <td>{item.username}</td>
                      <td>
                        <span>{'*'.repeat(item.password.length)}</span>{" "}
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => copyToClipboard(item.password)}
                          title="Copy Password"
                        >
                          🗒️
                        </span>
                      </td>
                      <td>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-info"
                        >
                          Visit
                        </a>
                      </td>
                      <td>
                        <Link
                          to={`/modify-password/${index}`}
                          className="btn btn-sm me-2"
                          style={{
                            backgroundColor: "#17a2b8",
                            color: "#fff",
                          }}
                        >
                          Modify
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      <Modal show={showPopup} onHide={() => setShowPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Missing Credentials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
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
                value={userVaultPassword}
                onChange={(e) => setUserVaultPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveCredentials}
            >
              Save Credentials
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MainPage;
