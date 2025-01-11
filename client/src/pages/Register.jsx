import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mnemonic, setMnemonic] = useState(Array(12).fill(""));

  const handleMnemonicChange = (index, value) => {
    const newMnemonic = [...mnemonic];
    newMnemonic[index] = value;
    setMnemonic(newMnemonic);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration submission (you can add your registration logic here)
    console.log("Registering with:", { username, email, password, confirmPassword, mnemonic });
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="form-center">
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
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>

        {/* Recovery Phrase */}
        <h5>Your 12-Word Recovery Phrase</h5>
        <div className="row">
          {mnemonic.map((word, index) => (
            <div className="col-4" key={index}>
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

        <button type="submit" className="btn btn-primary mt-4">Register</button>
      </form>
    </div>
  );
};

export default Register;
