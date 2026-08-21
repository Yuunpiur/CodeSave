import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, login } from "./utils/register";
import "./main.css";
import { useAccessToken } from "./utils/client-utils";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const accessToken = useAccessToken((state) => state.accessToken);
  const updateAccessToken = useAccessToken((state) => state.updateAccessToken);

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
      const jwt = await login(formData.username, formData.password);
      if (jwt) {
        updateAccessToken(jwt);

        // load the page and the users data
        navigate("/library");
      }
    } else if (!isLogin) {
      const jwt = await signUp(formData.username, formData.password);
      if (jwt) {
        updateAccessToken(jwt);

        // load the page and the users data
        navigate("/library");
      }
    }
  };

  return (
    <div className="parent-container w-screen h-screen bg-white overflow-hidden flex items-center justify-center p-4 ">
      {/* Auth Card Container */}
      <div className="w-full max-w-150 bg-[#FFFFFF] border overflow-hidden shadow-2xl">
        {/* Header Section */}
        <div className="px-6 md:px-8 pt-7 pb-5">
          <div
            onClick={() => navigate("/")}
            className="text-[11px] tracking-[0.18em] uppercase mb-2 font-noto cursor-pointer  transition-colors inline-block"
          >
            ← CodeSave
          </div>
          <h2 className="text-[26px] md:text-[28px] text-[#252525] tracking-wide font-noto font-normal">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-[12px] text-[#252525]/40 tracking-wide mt-1">
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
          {/* Username input */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-[11px] tracking-[0.14em] uppercase text-black mb-2 font-noto"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-[#dcdcdc]/40 text-[#252525] text-sm px-3.5 py-2.5 outline-none transition-colors font-noto tracking-wide placeholder-[#252525]/30"
            />
          </div>

          {/* Password input */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="password"
                className="text-[11px] tracking-[0.14em] uppercase text-black font-noto"
              >
                Password
              </label>
              {isLogin && (
                <a
                  href="#"
                  className="text-[11px] text-[#252525]/30 hover:text-black transition-colors tracking-wide"
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
              className="w-full bg-[#dcdcdc]/40 text-[#252525] text-sm px-3.5 py-2.5 outline-none transition-colors font-noto tracking-wide placeholder-[#252525]/30"
            />
          </div>

          {/* Confirm Password input (only visible when toggled to Sign Up) */}
          {!isLogin && (
            <div className="flex flex-col transition-all duration-200">
              <label
                htmlFor="confirmPassword"
                className="text-[11px] tracking-[0.14em] uppercase text-black mb-2 font-noto"
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
                className="w-full bg-[#dcdcdc]/40 text-[#252525] text-sm px-3.5 py-2.5 outline-none transition-colors font-noto tracking-wide placeholder-[#252525]/30"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-2 flex flex-col gap-4">
            <button
              type="submit"
              className="w-full bg-[#ffb522] hover:bg-[#ffd15b] border-none text-[#252525] py-2.5 text-[14px] tracking-widest uppercase font-noto font-medium transition-all duration-150 cursor-pointer text-center"
            >
              {isLogin ? "LOG IN" : "REGISTER"}
            </button>

            {/* Form Toggle Switcher */}
            <div className="text-center">
              <span className="text-[12px] text-[#252525]/40 tracking-wide">
                {isLogin ? "New to CodeSave? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    username: "",
                    password: "",
                    confirmPassword: "",
                  });
                }}
                className="text-[12px] text-black hover:text-[#ffb522] transition-colors font-medium underline underline-offset-4 bg-transparent border-none cursor-pointer p-0 inline"
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
