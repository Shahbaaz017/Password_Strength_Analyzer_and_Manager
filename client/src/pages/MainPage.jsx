import axios from "axios"; // Import Axios
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import NavForAll from "../components/NavForAll";
import StarsBackground from "./StarsBackground";

const MainPage = () => {
  const [managedPasswords, setManagedPasswords] = useState([]);
  const [email, setEmail] = useState(""); // Add email state
  const [vaultPassword, setVaultPassword] = useState(""); // Add vault password state

  // Fetch passwords when the component is mounted
  useEffect(() => {
    if (email && vaultPassword) {
      fetchPasswords();
    }
  }, [email, vaultPassword]);

  const fetchPasswords = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/passwords/get-all", {
        email: email,
        vault_password: vaultPassword,
      });
      setManagedPasswords(response.data.passwords);
    } catch (error) {
      console.error("Error fetching passwords:", error);
      alert("Error fetching passwords.");
    }
  };

  const handleDelete = (index) => {
    console.log(`Delete item at index: ${index}`);
    // Add delete logic here
  };

  return (
    <div className="position-relative">
      {/* Background Animation */}
      <StarsBackground />

      {/* Main Content */}
      <div className="d-flex flex-column min-vh-100 position-relative" style={{ zIndex: 1 }}>
        {/* Navbar */}
        <NavForAll />

        {/* Main Content */}
        <div className="container-fluid d-flex flex-grow-1">
          {/* Sidebar */}
          <div className="col-md-3 p-4 text-white border-end bg-dark">
            <h4 className="mb-4">Navigation</h4>
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link
                  to="/password-checker"
                  className="btn btn-primary w-100 text-start text-white"
                >
                  Password Strength Checker
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/add-password"
                  className="btn btn-primary w-100 text-start text-white"
                >
                  Add Password
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to="/Analytics"
                  className="btn btn-primary w-100 text-start text-white"
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Content Area */}
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
                      <td>{item.password}</td>
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
                            backgroundColor: "#17a2b8", // Custom color for Modify
                            color: "#fff",
                          }}
                        >
                          Modify
                        </Link>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#ffc107", // Custom color for Delete
                            color: "#000",
                          }}
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;
