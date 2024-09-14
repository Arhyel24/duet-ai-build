"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle, FaFacebookF, FaEnvelope } from "react-icons/fa";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password) {
        setError("Please fill all the fields");
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

      const res = await signIn("credentials", {
        email: email.toLowerCase(),
        password: password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        setError("");
        router.replace("/");
        // router.push("/userprofile");
      }
    } catch (error) {
      setError("An unexpected error occurred");

      // Clear error message after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center background-pattern"></div>
      <div className="relative z-10 p-8 bg-white rounded-lg shadow-lg max-w-sm mx-auto w-full">
        <h1 className="text-2xl text-center font-semibold mb-2">
          Welcome back!
        </h1>
        <p className="mb-4 text-gray-600 text-center">
          We're really happy to see you again!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type={"email"}
            placeholder="example@123.com"
            name="email"
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={"password"}
            placeholder="**********"
            name="password"
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-center max-w-sm">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
          <p className="text-center mt-4">Or Log In With</p>
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
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
