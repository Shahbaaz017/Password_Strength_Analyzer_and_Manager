import React, { useEffect, useState } from "react";

const NavForAll = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setEmail] = useState("");

  // Fetch email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Password Manager</span>
      <div className="position-relative">
        <button
          className="btn btn-secondary"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          User
        </button>
        {showDropdown && (
          <div
            className="dropdown-menu dropdown-menu-end show position-absolute"
            style={{ right: 0 }}
          >
            <div className="px-3 py-2">
              <p className="mb-1">
                <strong>{email ? email : "Guest"}</strong>
              </p>
              <button
                className="btn btn-sm btn-outline-secondary w-100 mb-2"
                onClick={() => setShowDropdown(false)}
              >
                Close
              </button>
              <button className="btn btn-sm btn-danger w-100">Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavForAll;
