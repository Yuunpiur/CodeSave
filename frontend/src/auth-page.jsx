import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, login } from "./utils/register";
import "./main.css"; // Reusing your global styles

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accessToken, setAccessToken] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (isLogin) {
      console.log("LOGGIN IN..");

      const jwt = await login(formData.email, formData.password);
      if (jwt) {
        setAccessToken(jwt);

        // load the page and the users data
        navigate("/dashboard");
      }
    } else if (!isLogin) {
      const jwt = await signUp(formData.email, formData.password);

      if (jwt) {
        setAccessToken(jwt);

        // load the page and the users data
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="parent-container w-screen h-screen bg-[#0C0C0C] overflow-hidden flex items-center justify-center p-4">
      {/* Auth Card Container */}
      <div className="w-full max-w-150 bg-[#181818] border border-white/10 rounded-[14px] overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div className="px-6 md:px-8 pt-7 pb-5 border-b border-white/5">
          <div
            onClick={() => navigate("/")}
            className="text-[11px] tracking-[0.18em] uppercase text-[#C5A882]/60 mb-2 font-noto cursor-pointer hover:text-[#C5A882] transition-colors inline-block"
          >
            ← CodeSave
          </div>
          <h2 className="text-[26px] md:text-[28px] text-[#E8E5DC] tracking-wide font-noto font-normal">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-[12px] text-white/30 tracking-wide mt-1">
            {isLogin
              ? "Sign in to access your saved snippets"
              : "Get started saving and sharing code snaps"}
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="px-6 md:px-8 pt-6 pb-8 flex flex-col gap-5"
        >
          {/* Email input */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-[11px] tracking-[0.14em] uppercase text-[#C5A882]/70 mb-2 font-noto"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="name@domain.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#242424] border border-white/10 rounded-lg text-[#E8E5DC] text-sm px-3.5 py-2.5 outline-none focus:border-[#C5A882]/45 transition-colors font-noto tracking-wide placeholder-white/20"
            />
          </div>

          {/* Password input */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="text-[11px] tracking-[0.14em] uppercase text-[#C5A882]/70 font-noto"
              >
                Password
              </label>
              {isLogin && (
                <a
                  href="#"
                  className="text-[11px] text-white/20 hover:text-[#C5A882]/70 transition-colors tracking-wide"
                >
                  Forgot?
                </a>
              )}
            </div>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#242424] border border-white/10 rounded-lg text-[#E8E5DC] text-sm px-3.5 py-2.5 outline-none focus:border-[#C5A882]/45 transition-colors font-noto tracking-wide placeholder-white/20"
            />
          </div>

          {/* Confirm Password input (only visible when toggled to Sign Up) */}
          {!isLogin && (
            <div className="flex flex-col transition-all duration-200">
              <label
                htmlFor="confirmPassword"
                className="text-[11px] tracking-[0.14em] uppercase text-[#C5A882]/70 mb-2 font-noto"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#242424] border border-white/10 rounded-lg text-[#E8E5DC] text-sm px-3.5 py-2.5 outline-none focus:border-[#C5A882]/45 transition-colors font-noto tracking-wide placeholder-white/20"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-2 flex flex-col gap-4">
            <button
              type="submit"
              className="w-full bg-[#C5A882] hover:bg-[#d4bc9a] border-none text-[#0C0C0C] rounded-lg py-2.5 text-[14px] tracking-widest uppercase font-noto font-medium transition-all duration-150 cursor-pointer text-center"
            >
              {isLogin ? "LOG IN" : "REGISTER"}
            </button>

            {/* Form Toggle Switcher */}
            <div className="text-center">
              <span className="text-[12px] text-white/25 tracking-wide">
                {isLogin ? "New to CodeSave? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({ email: "", password: "", confirmPassword: "" });
                }}
                className="text-[12px] text-[#C5A882]/70 hover:text-[#C5A882] transition-colors font-medium underline underline-offset-4 bg-transparent border-none cursor-pointer p-0 inline"
              >
                {isLogin ? "Create an account" : "Sign in here"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
