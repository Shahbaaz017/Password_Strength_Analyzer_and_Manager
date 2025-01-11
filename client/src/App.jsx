import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PasswordStrengthChecker from "./pages/PasswordStrengthChecker";
import Register from "./pages/Register";
import Login from "./pages/Login";
import WhyUseUs from "./pages/WhyUseUs";
import MainPage from "./pages/MainPage";
import AddPass from "./pages/add_pass";
import AnalyticsPage from "./pages/AnalyticsPage";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the route for Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Define the route for Password Strength Checker */}
        <Route path="/password-checker" element={<PasswordStrengthChecker />} />

        <Route path="/Register" element={<Register />} />
        <Route path="/Analytics" element={<AnalyticsPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/WhyUseUs" element={<WhyUseUs />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/add-password" element={<AddPass />} />
      </Routes>
    </Router>
  );
};

export default App;
