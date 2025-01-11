import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mnemonic, setMnemonic] = useState(Array(12).fill(""));
  const navigate = useNavigate();

  const handleMnemonicChange = (index, value) => {
    const newMnemonic = [...mnemonic];
    newMnemonic[index] = value;
    setMnemonic(newMnemonic);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission logic
    console.log("Logging in with:", { username, password, mnemonic });

    // Navigate to the main page
    navigate("/MainPage");
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      {/* Login Form */}
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

        {/* Recovery Phrase */}
        <h5>Enter Your 12-Word Recovery Phrase</h5>
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

        <button type="submit" className="btn btn-primary mt-4">Login</button>
      </form>
    </div>
  );
};

export default Login;
