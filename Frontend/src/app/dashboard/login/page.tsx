// app/dashboard/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  LockPasswordIcon,
  ViewIcon,
  ViewOffSlashIcon,
  Login03Icon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  DashboardSquare01Icon,
} from "@hugeicons-pro/core-stroke-rounded";

export default function DashboardLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    adminEmail: "",
    adminPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminEmail: formData.adminEmail,
          adminPassword: formData.adminPassword,
        }),
      });



      const data = await response.json();

      console.log(data);
      
      if (!response.ok || !data.success) {
        setSuccess(false);
        setMessage(data.message || "Login failed");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("authToken", data.token);

      setSuccess(true);
      setMessage(data.message || "Admin logged in successfully");

      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 800);
    } catch (error) {
      setSuccess(false);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617] px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-2">
          <div className="relative hidden overflow-hidden border-r border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-950 to-indigo-500/10 p-10 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.12),transparent_35%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <HugeiconsIcon
                      icon={DashboardSquare01Icon}
                      size={24}
                      strokeWidth={1.8}
                      className="text-cyan-300"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">
                      Admin Access
                    </p>
                    <h2 className="text-lg font-semibold text-white">
                      Dashboard Login
                    </h2>
                  </div>
                </div>

                <h1 className="max-w-md text-4xl font-bold leading-tight text-white">
                  Secure access for your professional dashboard.
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                  Sign in to manage careers, client feedback, dashboard content,
                  and all your admin operations from one place.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm font-medium text-cyan-200">
                    Fast admin workflow
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Login token is stored in sessionStorage with key:
                    <span className="ml-2 rounded-md bg-white/10 px-2 py-1 font-semibold text-white">
                      authToken
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-sm font-medium text-cyan-200">
                    Protected dashboard access
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    After successful login, user is redirected to
                    <span className="ml-2 rounded-md bg-white/10 px-2 py-1 font-semibold text-white">
                      /dashboard
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-5 sm:p-8 lg:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <div className="mb-4 inline-flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
                  <HugeiconsIcon
                    icon={DashboardSquare01Icon}
                    size={22}
                    strokeWidth={1.8}
                    className="text-cyan-300"
                  />
                  <span className="text-sm font-semibold text-white">
                    Dashboard Login
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white">
                  Welcome back
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Login with your admin email and password.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Admin Email
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition focus-within:border-cyan-400/40 focus-within:bg-white/[0.06]">
                    <HugeiconsIcon
                      icon={Mail01Icon}
                      size={20}
                      strokeWidth={1.8}
                      className="text-slate-400"
                    />
                    <input
                      type="email"
                      name="adminEmail"
                      value={formData.adminEmail}
                      onChange={handleChange}
                      placeholder="Enter admin email"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Admin Password
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition focus-within:border-cyan-400/40 focus-within:bg-white/[0.06]">
                    <HugeiconsIcon
                      icon={LockPasswordIcon}
                      size={20}
                      strokeWidth={1.8}
                      className="text-slate-400"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="adminPassword"
                      value={formData.adminPassword}
                      onChange={handleChange}
                      placeholder="Enter admin password"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-slate-400 transition hover:text-cyan-300"
                    >
                      <HugeiconsIcon
                        icon={showPassword ? ViewOffSlashIcon : ViewIcon}
                        size={20}
                        strokeWidth={1.8}
                      />
                    </button>
                  </div>
                </div>

                {message ? (
                  <div
                    className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${
                      success
                        ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                        : "border-red-400/20 bg-red-500/10 text-red-200"
                    }`}
                  >
                    <HugeiconsIcon
                      icon={success ? CheckmarkCircle02Icon : Alert02Icon}
                      size={20}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0"
                    />
                    <span>{message}</span>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-500/15 px-5 py-3.5 text-sm font-semibold text-cyan-100 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <HugeiconsIcon
                    icon={Login03Icon}
                    size={20}
                    strokeWidth={1.8}
                  />
                  {loading ? "Logging in..." : "Login to Dashboard"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}