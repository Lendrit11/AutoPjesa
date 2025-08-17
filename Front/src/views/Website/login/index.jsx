import React, { useState } from "react";
import "./LoginRegisterPage.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  // Reset password states
  const [resetStep, setResetStep] = useState(1);
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5298/api/center/login", {
          email: formData.email,
          password: formData.password
        });

        const { token, user } = res.data;
        document.cookie = `token=${token}; path=/;`;

        toast.success("✅ Login successful!");
        console.log("User:", user);
      } else {
        const res = await axios.post("http://localhost:5298/api/center/register", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phoneNumber: formData.phoneNumber
        });

        toast.success("🎉 Registration successful!");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      toast.error(`❌ ${err.response?.data || "Something went wrong"}`);
    }
  };

  // STEP 1: Send reset code
  const handleSendResetCode = async () => {
    try {
      await axios.post("http://localhost:5298/api/center/request-password-reset", {
        email: resetEmail
      });
      toast.success("📩 Code sent to your email.");
      setResetStep(2);
    } catch (err) {
      toast.error(err.response?.data || "Failed to send code");
    }
  };

  // STEP 2: Reset password with code
  const handleResetPassword = async () => {
    try {
      await axios.post("http://localhost:5298/api/center/reset-password", {
        email: resetEmail,
        code: resetCode,
        newPassword: newPassword
      });
      toast.success("🔐 Password has been reset.");
      setShowResetPassword(false);
      setResetStep(1);
      setResetEmail("");
      setResetCode("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data || "Reset failed");
    }
  };

  return (
    <div className="dark-auth-container">
      <div className="dark-auth-card">
        {showResetPassword ? (
          <>
            <h2 className="dark-auth-title">Reset Password</h2>

            {resetStep === 1 ? (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="dark-auth-input"
                />
                <button className="dark-auth-btn" onClick={handleSendResetCode}>
                  Send Reset Code
                </button>
                <p className="back-link" onClick={() => setShowResetPassword(false)}>← Back to login</p>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter code from email"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  className="dark-auth-input"
                />
                <div className="password-wrapper">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="dark-auth-input"
                  />
                  <span className="toggle-eye" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button className="dark-auth-btn" onClick={handleResetPassword}>
                  Reset Password
                </button>
                <p className="back-link" onClick={() => setShowResetPassword(false)}>← Back to login</p>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="dark-auth-title">{isLogin ? "Login To FixFlow-Auto" : "Register To FixFlow-Auto"}</h2>

            <div className="switch-text">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <span onClick={() => setIsLogin(false)} className="switch-link">Register</span>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <span onClick={() => setIsLogin(true)} className="switch-link">Login</span>
                </>
              )}
            </div>

            <form className="dark-auth-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-row">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="dark-auth-input"
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="dark-auth-input"
                  />
                </div>
              )}

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="dark-auth-input"
              />

              <div className="password-wrapper">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="dark-auth-input"
                />
                <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {!isLogin && (
                <>
                  <div className="password-wrapper">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="dark-auth-input"
                    />
                    <span className="toggle-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>

                  <input
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="dark-auth-input"
                  />
                </>
              )}

              {isLogin && (
                <div className="form-options">
                  <label>
                    <input type="checkbox" /> Remember me
                  </label>
                  <span className="forgot-link" onClick={() => setShowResetPassword(true)}>Forgot password?</span>
                </div>
              )}

              <button className="dark-auth-btn" type="submit">
                {isLogin ? "Login" : "Register"}
              </button>
            </form>
          </>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
    </div>
  );
};

export default LoginRegisterPage;
