import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signup({ username, email, password });
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } catch (signupError) {
      setError(signupError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="app-page flex min-h-screen w-full items-center justify-center px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 border border-black/10 bg-[#FBF9F1] p-6 sm:p-8"
      >
        <div className="text-center">
          <Link
            to="/"
            aria-label="LearnFlow home"
            className="inline-flex items-center text-xl font-semibold tracking-tight"
          >
            <span className="text-[#201F1A]">Learn</span>
            <span className="text-[#77746A]">Flow.</span>
          </Link>
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-black/60">
            Sign up to save and access your learning materials.
          </p>
        </div>

        <label className="block text-sm text-black/75">
          Username
          <input
            type="text"
            name="username"
            autoComplete="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="mt-2 w-full border border-black/15 bg-[#FFFDF7] px-3 py-2.5 text-[#201F1A] outline-none focus:border-black"
          />
        </label>

        <label className="block text-sm text-black/75">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full border border-black/15 bg-[#FFFDF7] px-3 py-2.5 text-[#201F1A] outline-none focus:border-black"
          />
        </label>

        <label className="block text-sm text-black/75">
          Password
          <input
            type="password"
            name="new-password"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full border border-black/15 bg-[#FFFDF7] px-3 py-2.5 text-[#201F1A] outline-none focus:border-black"
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-800">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#201F1A] px-4 py-2.5 font-medium text-[#FFFDF2] transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>

        <p className="text-center text-sm text-black/60">
          Already have an account?{" "}
          <Link
            to="/login"
            state={location.state}
            className="font-medium text-black underline decoration-black/30 underline-offset-4 hover:decoration-black"
          >
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Signup;
