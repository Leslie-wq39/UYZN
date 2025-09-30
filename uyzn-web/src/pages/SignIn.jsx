import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Seo from "../components/Seo";
import { login } from "../lib/api";

/** Accept either a valid email or a phone number */
const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;

const SignInSchema = z.object({
  identifier: z
    .string()
    .min(1, "Enter your email or phone")
    .refine(
      (val) => z.string().email().safeParse(val).success || phoneRegex.test(val),
      "Enter a valid email or phone"
    ),
  password: z.string().min(8, "Minimum 8 characters"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    mode: "onSubmit",
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (values) => {
    setErr(null);
    setLoading(true);
    try {
      // If your backend expects "identifier", keep this:

      // If your backend expects separate fields instead, use this instead:
      // const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.identifier);
      // const payload = isEmail
      //   ? { email: values.identifier, password: values.password }
      //   : { phone: values.identifier, password: values.password };

      // If you’re using a Vite proxy rewriting /api -> backend, this will hit /auth/login on the server.
      const data = await login(values.identifier, values.password);

      const token = data.token || data.accessToken || data.jwt || data.id_token;
      if (token) localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user || data.profile || {}));
      window.dispatchEvent(new Event("auth:changed"));

      navigate("/account", {
        state: {
          flash: `Welcome back, ${
            (data.user?.name || data.profile?.name || "friend").split(" ")[0]
          }!`,
        },
      });
    } catch (e) {
      setErr(e.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="Sign In | UYZN" description="Secure access to your UYZN account." path="/login" />
      <main className="signin" id="main">
        <section className="si-hero">
          <div className="si-wrap py-10">
            <h1 className="si-h1">Welcome back.</h1>
            <p className="si-sub">Continue your journey to opportunity.</p>
          </div>
        </section>

        <section className="si-section">
          <div className="si-wrap si-grid">
            <form
              className="si-card"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-describedby={err ? "form-error" : undefined}
            >
              {/* Identifier */}
              <label className="si-field" htmlFor="identifier">
                <span className="si-label">Email or Phone</span>
                <input
                  id="identifier"
                  type="text"
                  autoComplete="username"
                  aria-invalid={!!errors.identifier}
                  aria-describedby={errors.identifier ? "identifier-err" : undefined}
                  {...register("identifier")}
                />
                {errors.identifier && (
                  <p id="identifier-err" role="alert" className="si-error si-error-inline">
                    {errors.identifier.message}
                  </p>
                )}
              </label>

              {/* Password + toggle */}
              <label className="si-field" htmlFor="password">
                <span className="si-label">Password</span>
                <div className="si-pass">
                  <input
                    id="password"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-err" : undefined}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="si-toggle"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-err" role="alert" className="si-error si-error-inline">
                    {errors.password.message}
                  </p>
                )}
              </label>

              <div className="si-row">
                <Link className="si-link" to="/forgot">
                  Forgot password?
                </Link>
              </div>

              {err && (
                <div id="form-error" className="si-error" role="alert">
                  {err}
                </div>
              )}

              <button className="btn-primary h-11" disabled={loading || isSubmitting}>
                {loading || isSubmitting ? "Signing in…" : "Sign In"}
              </button>

              <p className="si-legal">
                By signing in, you agree to our <Link to="/legal/terms">Terms</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </form>

            <aside className="si-aside">
              <div className="si-box">
                <h3>New to UYZN?</h3>
                <p>
                  Create a free account to apply for jobs, scholarships, trainee programs, and NSS.
                </p>
                <Link to="/register" className="btn-ghost">
                  Create Account
                </Link>
              </div>

              <div className="si-box">
                <h3>Employers & Sponsors</h3>
                <p>
                  Post jobs, manage trainees, and sponsor scholarships via our secure Partner Portal.
                </p>
                <Link to="/partners" className="btn-ghost">
                  Partner sign-in
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
