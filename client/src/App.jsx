import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PasswordStrengthChecker from "./pages/PasswordStrengthChecker";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the route for Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Define the route for Password Strength Checker */}
        <Route path="/password-checker" element={<PasswordStrengthChecker />} />
      </Routes>
    </Router>
  );
};

export default App;
