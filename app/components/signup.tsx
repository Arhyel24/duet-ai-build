"use client";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { FaGoogle, FaFacebookF, FaEnvelope } from "react-icons/fa";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password || !username || !confirmPassword) {
        setError("Please fill all the fields");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords mismatch");
        setLoading(false);
        return;
      }

      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(email)) {
        setError("Invalid email address");
        setLoading(false);
        return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
      if (!passwordRegex.test(password)) {
        setError(
          [
            "Password must be at least 8 characters long",
            "and contain at least one uppercase letter,",
            "one lowercase letter, and one special character.",
          ].join("\n")
        );
        setLoading(false);
        return;
      }

      const res = await fetch("/api/userExist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const { success } = await res.json();

      if (success) {
        setError("User already exist");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      } else {
        const form = e.target;
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      setError("User registration failed");
      setLoading(false);
    }

    // Clear error message after 5 seconds
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center background-pattern"></div>
      <div className="relative z-10 p-8 bg-white rounded-lg shadow-lg max-w-sm mx-auto w-full">
        <h1 className="text-2xl text-center font-semibold mb-2">
          Duet AI Sign Up
        </h1>
        <p className="mb-4 text-gray-600 text-center">
          We're really happy to see you here!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type={"text"}
            placeholder="Enter preferred username"
            name="username"
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type={"email"}
            placeholder="Enter email"
            name="email"
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={"password"}
            placeholder="Create Password"
            name="password"
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type={"password"}
            placeholder="Confirm Password"
            name="comfirm-password"
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-500 max-w-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p className="text-center mt-4">Or Sign In With</p>
          <div className="flex justify-around mt-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaGoogle size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaEnvelope size={24} />
            </a>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
