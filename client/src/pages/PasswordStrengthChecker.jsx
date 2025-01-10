import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarsBackground from './StarsBackground';
import zxcvbn from 'zxcvbn';

function PasswordStrengthChecker() {
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [feedback, setFeedback] = useState('');

    const updateStrengthIndicator = (password) => {
        const result = zxcvbn(password);
        setStrength(result.score);
        setFeedback(result.feedback.suggestions.join(' ') || 'Password is strong!');
    };

    const handleChange = (event) => {
        const input = event.target.value;
        setPassword(input);
        updateStrengthIndicator(input);
    };

    const getStrengthClass = (score) => {
        const classes = ["bg-danger", "bg-warning", "bg-info", "bg-primary", "bg-success"];
        return classes[score] || "bg-secondary";
    };

    const getStrengthText = (score) => {
        const texts = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
        return texts[score] || "None";
    };

    const generatePassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let generatedPassword = '';
        for (let i = 0; i < 12; i++) {
            generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setPassword(generatedPassword);
        updateStrengthIndicator(generatedPassword);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        alert('Password copied to clipboard!');
    };

    return (
        <div>
            <StarsBackground />
            <div className="container mt-5">
                <div className="card p-4 shadow">
                    <h2 className="text-center">Password Strength Checker</h2>
                    <div className="mb-3">
                        <small className="text-muted">Password Policies: At least 8 characters, including uppercase, lowercase, numbers, and special characters.</small>
                    </div>
                    <input
                        type="password"
                        className="form-control my-3"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handleChange}
                    />
                    <div className="progress mb-2">
                        <div
                            className={`progress-bar ${getStrengthClass(strength)}`}
                            role="progressbar"
                            style={{ width: `${(strength / 4) * 100}%` }}
                            aria-valuenow={strength}
                            aria-valuemin="0"
                            aria-valuemax="4"
                        ></div>
                    </div>
                    <div className="text-center font-weight-bold mb-2">
                        Strength: {getStrengthText(strength)}
                    </div>
                    <div className="text-muted mb-3">{feedback}</div>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary" onClick={generatePassword}>Generate Password</button>
                        <button className="btn btn-secondary" onClick={copyToClipboard}>Copy to Clipboard</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordStrengthChecker;
