import React, { useState } from 'react';
import '../styles/Login.css';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({
        username: '',
        password: '',
        general: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = { username: '', password: '', general: '' };
        let hasError = false;

        if (!username.trim()) {
            newErrors.username = "This field cannot be empty";
            hasError = true;
        }

        if (!password.trim()) {
            newErrors.password = "This field cannot be empty";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        if (username === "student" && password === "password") {
            onLoginSuccess(username, "student");
        } else if (username === "teacher" && password === "password") {
            onLoginSuccess(username, "teacher");
        } else {
            setErrors({ ...newErrors, general: "Invalid username or password." });
        }
    };

    return (
        <div style={{display: 'flex', height: '100vh', alignItems: 'center'}}>
            <div className="login-container">
                <h2>Authentication</h2>

                {errors.general && <div className="global-error-box">{errors.general}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className={errors.username ? 'input-error' : ''}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                        {errors.username && <span className="field-error-text">{errors.username}</span>}
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className={errors.password ? 'input-error' : ''}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                        {errors.password && <span className="field-error-text">{errors.password}</span>}
                    </div>

                    <button type="submit" className="login-btn">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;