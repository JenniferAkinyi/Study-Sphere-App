import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pageImage from "../../assets/authentication-bg.png";
import Input from "../../components/Input";
import { register } from "../../services/api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if(password !== confirmPassword){
      setError('Passwords do not match')
      return
    }
    const userData = {
      name, 
      email,
      password
    }
    try {
      const response = await register(userData);
      navigate("/");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Network error. Please try again.");
      }
    }
  };

  return (
    <main className="flex min-h-screen bg-background-light text-primary-light">
      <section className="flex items-center justify-center w-full p-8 md:w-1/2">
        <div className="flex flex-col items-center w-full max-w-md">
          <p className="mb-6 font-sans md:text-5xl">Create Account</p>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-describedby={error ? "form-error" : undefined}
              />
            </div>
            <div>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby={error ? "form-error" : undefined}
              />
            </div>
            <div>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby={error ? "form-error" : undefined}
              />
            </div>
            <div>
              <Input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-describedby={error ? "form-error" : undefined}
              />
            </div>
            {error && (
              <p id="form-error" className="text-sm text-red-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-2 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-2 md:text-sm">
            Already a member?{" "}
            <button
              onClick={() => navigate("/")}
              className="font-semibold hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </section>
      <aside>
        <img
          src={pageImage}
          alt="signup-image"
          className="object-cover w-full h-full"
        />
      </aside>
    </main>
  );
};

export default Signup;
