import React, { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const { createUser, userProfile, user, logOut, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (emailError) {
      e.target.email.focus();
      return;
    } else if (passwordError) {
      e.target.password.focus();
      return;
    }
    createUser(email, password)
      .then((result) => {
        setErrorMessage("");
        const loggedUser = result.user;
        setUser(loggedUser);
        form.reset();
        userProfile(name, photo)
          .then(() => {
            console.log("hello");
            setErrorMessage("");
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
        logOut();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });

    errorMessage || navigate("/login");
  };
  const handleEmail = (e) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const input = e.target.value;
    setEmail(input);
    if (!emailRegex.test(input)) {
      setEmailError("Please provide a valid email");
    } else {
      setEmailError("");
    }
  };
  const handlePassword = (e) => {
    const input = e.target.value;
    setPassword(input);
    if (input.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else if (!/\d/.test(input)) {
      setPasswordError("Password must contain at least one digit");
    } else if (!/[a-z]/.test(input)) {
      setPasswordError("Password must contain at least one lowercase letter");
    } else if (!/[A-Z]/.test(input)) {
      setPasswordError("Password must contain at least one uppercase letter");
    } else {
      setPasswordError("");
    }
  };
  return (
    <div>
      <div className="title-body mt-4">
        <h1 className="title">Register</h1>
        <p className="para">
          Explore Global Cuisine & Celebrity Chefs' Recipes
        </p>
      </div>
      <form className="w-full max-w-sm mx-auto mb-10" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="input-field"
            id="name"
            type="text"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="input-field"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={handleEmail}
          />
          {emailError && <span className="text-red-500">{emailError}</span>}
        </div>
        <div className="mb-6">
          <label className="block font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="input-field"
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={handlePassword}
          />
          {passwordError && (
            <span className="text-red-500">{passwordError}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="photoUrl">
            Photo URL
          </label>
          <input
            className="input-field"
            id="photoUrl"
            type="text"
            placeholder="Enter your photoURL"
            required
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
        </div>
        <p className="mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-600">
            Please Login
          </Link>
        </p>
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <button className="btn w-full" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
