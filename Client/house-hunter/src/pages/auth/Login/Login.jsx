import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const emailRef = useRef();
  const { signIn, signInWithGoogle, signInWithGitHub, setUser, resetUser } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    signIn(email, password)
      .then((result) => {
        setErrorMessage("");
        const loggedUser = result.user;
        setUser(loggedUser);
        navigate(from, { replace: true });
        form.reset();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  const handleEmail = (e) => {
    const input = e.target.value;
    setEmail(input);
  };
  const handlePassword = (e) => {
    const input = e.target.value;
    setPassword(input);
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        setErrorMessage("");
        const loggedUser = result.user;
        setUser(loggedUser);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  const handleGitHubSignIn = () => {
    signInWithGitHub()
      .then((result) => {
        setErrorMessage("");
        const loggedUser = result.user;
        setUser(loggedUser);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  const handleResetPassword = (e) => {
    const em = emailRef.current.value;
    if (!em) {
      toast("Input your email to reset password!");
    } else {
      resetUser(em)
        .then(() => {
          toast("Please check your email!!");
        })
        .catch((err) => {
          setErrorMessage(err.message);
        });
    }
  };
  return (
    <div>
      <div className="title-body mt-4">
        <h1 className="title">Login</h1>
        <p className="para">
          Explore Global Cuisine & Celebrity Chefs' Recipes
        </p>
      </div>
      <form className="w-full max-w-sm mx-auto mb-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="input-field"
            id="email"
            type="email"
            ref={emailRef}
            placeholder="Enter your email"
            required
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="mb-6">
          <label className="block font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="input-field"
            id="password"
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            required
            value={password}
            onChange={handlePassword}
          />
          <p onClick={() => setShow(!show)}>
            <small className="cursor-pointer text-lime-400">
              {show ? <span>Hide Password</span> : <span>Show Password</span>}
            </small>
          </p>
        </div>
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <p>
          Forget Password?{" "}
          <button className="text-lime-600" onClick={handleResetPassword}>
            Click here
          </button>
        </p>
        <p className="mb-4">
          Don't have account?{" "}
          <Link to="/register" className="text-lime-600">
            Please Register
          </Link>
        </p>
        <button className="btn w-full" type="submit">
          Login
        </button>
      </form>
      <div className=" max-w-fit mx-auto mb-5">
        <button
          onClick={handleGoogleSignIn}
          className="inline-flex items-center justify-center h-12 mb-3 font-medium transition duration-200 rounded shadow-md  md:mb-0 bg-lime-500 hover:bg-lime-700 overflow-hidden"
        >
          <span className="mr-4 bg-gray-500 p-3">
            <FaGoogle className=" text-2xl" />
          </span>
          <span className="pr-2">Sign in with Google</span>
        </button>
      </div>
      <div className="max-w-fit mx-auto mb-10">
        <button
          onClick={handleGitHubSignIn}
          className="inline-flex items-center justify-center h-12  mb-3 font-medium transition duration-200 rounded shadow-md  md:mb-0 bg-lime-500 hover:bg-lime-700 overflow-hidden"
        >
          <span className="mr-4 bg-gray-500 p-3">
            <FaGithub className=" text-2xl" />
          </span>
          <span className="pr-2">Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
