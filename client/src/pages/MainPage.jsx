import React from "react";
import { Link } from "react-router-dom";
import NavForAll from "../components/NavForAll";
import Footer from "../components/Footer";
import StarsBackground from "./StarsBackground";

const MainPage = () => {
  const managedPasswords = [
    { website: "Facebook", username: "john_doe", password: "********" },
    { website: "Google", username: "jane.doe@gmail.com", password: "********" },
    { website: "Twitter", username: "janedoe123", password: "********" },
  ];

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
                <Link to="/password-checker" className="btn btn-dark w-100 text-start text-white">
                  Password Strength Checker
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/manage-passwords" className="btn btn-dark w-100 text-start text-white">
                  Manage Passwords
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
                  </tr>
                </thead>
                <tbody>
                  {managedPasswords.map((item, index) => (
                    <tr key={index}>
                      <td>{item.website}</td>
                      <td>{item.username}</td>
                      <td>{item.password}</td>
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
