import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRecoveryPhrase, setShowRecoveryPhrase] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show the recovery phrase boxes on submit
    setShowRecoveryPhrase(true);
  };

  return (
    <div className="container mt-5 text-white">
      <h2 className="text-center">Register</h2>

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {/* Display Recovery Phrase Boxes after form submit */}
      {showRecoveryPhrase && (
        <div className="mt-4 text-center">
          <h4>Your Recovery Phrase</h4>
          <div className="d-flex flex-wrap justify-content-center">
            {Array.from({ length: 12 }, (_, index) => (
              <div 
                key={index} 
                className="m-2 p-3 border bg-white text-center"
                style={{ width: '120px', height: '60px', lineHeight: '60px' }} // Styling the box
              >
                Placeholder {index + 1}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
