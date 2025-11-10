import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    image: null
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setForm({ ...form, [name]: val });
    validateField(name, val);
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "name" && value.length < 2) error = "Name must be at least 2 characters.";
    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) error = "Invalid email format.";
    if (name === "password" && value.length < 8) error = "Password must be at least 8 characters.";
    if (name === "confirmPassword" && value !== form.password) error = "Passwords do not match.";

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    return (
      form.name.length >= 2 &&
      /^\S+@\S+\.\S+$/.test(form.email) &&
      form.password.length >= 8 &&
      form.password === form.confirmPassword &&
      form.terms
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setSubmitted(true);
    }
  };

  const getPasswordStrength = () => {
    const length = form.password.length;
    if (length >= 12) return "Strong";
    if (length >= 8) return "Medium";
    return "Weak";
  };

  return (
    <div className="container">
      <h1>🎉 Mini Greeting App</h1>
      {submitted ? (
        <div className="success">
          <h2>Welcome, {form.name}!</h2>
          <p>Your registration was successful.</p>
          {form.image && <img src={URL.createObjectURL(form.image)} alt="Uploaded" />}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={form.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>

          <label>
            Email:
            <input type="email" name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>

          <label>
            Password:
            <input type="password" name="password" value={form.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
            <div className="strength">Strength: {getPasswordStrength()}</div>
          </label>

          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </label>

          <label>
            Upload Picture:
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          </label>

          <label className="checkbox">
            <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} />
            I agree to the terms and conditions
          </label>

          <button type="submit" disabled={!isFormValid()}>Register</button>
        </form>
      )}
    </div>
  );
}

export default App;