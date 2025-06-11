"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        throw new Error("Tên đăng nhập hoặc mật khẩu không đúng.");
      }
      const data = await res.json();
      // Lưu access và refresh token vào cookies
      Cookies.set("access", data.access, { expires: 7 });
      Cookies.set("refresh", data.refresh, { expires: 7 });
      Cookies.set("role", data.role, { expires: 7 });
      Cookies.set("user_id", data.id, { expires: 7 });
      alert("Đăng nhập thành công!");
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#B2DDED] overflow-hidden flex items-center justify-center">
      {/* White blobs */}
      <div className="absolute -top-24 -left-32 w-96 h-96 bg-white opacity-30 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-24 -right-32 w-96 h-96 bg-white opacity-40 rounded-full blur-3xl z-0"></div>
      {/* Blue blur points */}
      <div className="absolute top-1/2 left-0 w-40 h-40 bg-[#eaf6fb] opacity-40 rounded-full blur-2xl z-0"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#b2dded] opacity-30 rounded-full blur-2xl z-0"></div>
      {/* Decorative dots top-left */}
      <div className="absolute top-10 left-10 grid grid-cols-4 gap-2 opacity-20 z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 bg-white rounded-full inline-block"
          />
        ))}
      </div>
      {/* Decorative dots bottom-right */}
      <div className="absolute bottom-10 right-10 grid grid-cols-4 gap-2 opacity-20 z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 bg-[#eaf6fb] rounded-full inline-block"
          />
        ))}
      </div>
      {/* Form */}
      <div className="relative z-10 w-full flex items-center justify-center min-h-screen">
        <form
          className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md space-y-6 animate-fade-in border border-[#eaf6fb]"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h2 className="text-2xl font-bold text-center text-[#23408e] mb-4">
            Đăng nhập
          </h2>
          <div>
            <label
              htmlFor="username"
              className="block text-[#1a3365] font-medium mb-1"
            >
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-2 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#b2dded] transition"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-[#1a3365] font-medium mb-1"
            >
              Mật khẩu
            </label>
            <div className="relative flex items-center">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-[#b2dded] transition"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 hover:text-gray-700 transition"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label="Hiện/ẩn mật khẩu"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-center animate-shake text-sm">
              {error}
            </div>
          )}
          <button
            className={`w-full py-2 rounded-full font-semibold text-white bg-gradient-to-r from-[#23408e] to-[#1B71A1] hover:from-[#2176ae] hover:to-[#1B71A1] transition-all shadow-lg ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-gray-200 border-t-[#b2dded] rounded-full animate-spin align-middle"></span>
            ) : (
              "Đăng nhập"
            )}
          </button>
          <style jsx>{`
            .animate-fade-in {
              animation: fadeIn 0.8s;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-shake {
              animation: shake 0.4s;
            }
            @keyframes shake {
              10%,
              90% {
                transform: translateX(-2px);
              }
              20%,
              80% {
                transform: translateX(4px);
              }
              30%,
              50%,
              70% {
                transform: translateX(-8px);
              }
              40%,
              60% {
                transform: translateX(8px);
              }
            }
          `}</style>
        </form>
      </div>
    </section>
  );
}
