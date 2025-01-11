import React from "react";
import { Link } from "react-router-dom";
import NavForAll from "../components/NavForAll";
import Footer from "../components/Footer";
import StarsBackground from "./StarsBackground";

const MainPage = () => {
  const managedPasswords = [
    {
      website: "Facebook",
      username: "john_doe",
      password: "********",
      link: "https://www.facebook.com",
    },
    {
      website: "Google",
      username: "jane.doe@gmail.com",
      password: "********",
      link: "https://www.google.com",
    },
    {
      website: "Twitter",
      username: "janedoe123",
      password: "********",
      link: "https://www.twitter.com",
    },
  ];

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
                <Link to="/password-checker" className="btn btn-dark w-100 text-start text-white">
                  Password Strength Checker
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/manage-passwords" className="btn btn-dark w-100 text-start text-white">
                  Manage Passwords
                </Link>
              </li>
              <li className="mb-3">
                <Link to="/analytics" className="btn btn-dark w-100 text-start text-white">
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
