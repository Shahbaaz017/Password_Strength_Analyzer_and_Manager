import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import StarsBackground from "./StarsBackground";

const Homepage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4">
        <a className="navbar-brand" href="#">Password Manager</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Register</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Why Use Us</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Background Animation */}
      <StarsBackground />

      {/* Homepage Content */}
      <div className="homepage-container text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-4 text-light">Welcome to Password Manager</h1>
        <p className="lead text-light">
          Simplify and secure your digital life. Analyze password strength and manage them effortlessly!
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-center text-white py-3 mt-auto">
        <p>&copy; 2025 Password Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
