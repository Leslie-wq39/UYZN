import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import Seo from "../components/Seo";
import { registerUser } from "../api/auth";

// Optional phone check (lenient)
const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;

const Schema = z
  .object({
    role: z.enum(["applicant", "employer"]),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().optional().refine((v) => !v || phoneRegex.test(v), {
      message: "Enter a valid phone",
    }),
    password: z.string().min(8, "Minimum 8 characters"),
    password_confirmation: z.string().min(8, "Minimum 8 characters"),
    org_name: z.string().optional(),
    org_slug: z.string().optional(),
  })
  .refine((v) => v.password === v.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  })
  .superRefine((v, ctx) => {
    if (v.role === "employer" && !v.org_name?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["org_name"],
        message: "Organization name is required for employer/sponsor",
      });
    }
  });

export default function Register() {
  const navigate = useNavigate();
  const [serverErr, setServerErr] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register: rhfRegister,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: { role: "applicant" },
  });

  const role = watch("role");

  async function onSubmit(values) {
    setServerErr(null);
    setSuccessMsg("");

    try {
      const { password_confirmation, ...payload } = values;

      // Call your API. registerUser may store a token; we clear it right after.
      await registerUser({ ...payload, password_confirmation });

      // Ensure they are NOT logged in after registration
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setSuccessMsg(
        "Account created successfully! You can now sign in to your new account."
      );
      // (Optional) scroll to top of form so the banner is visible
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setServerErr(e?.message || "Registration failed");
    }
  }

  return (
    <>
      <Seo
        title="Create account | UYZN"
        description="Create an account to apply for jobs, scholarships, trainee, and NSS."
        path="/register"
      />

      <main className="signin" id="main">
        <section className="si-hero">
          <div className="si-wrap py-10">
            <h1 className="si-h1">Create account | UYZN.</h1>
            <p className="si-sub">
              Create an account to apply for jobs, scholarships, trainee, and NSS.
            </p>
          </div>
        </section>

        <section className="si-section">
          <div className="si-wrap si-grid">
            <div className="si-card">
              {/* Success banner */}
              {successMsg && (
                <div
                  className="si-success mb-4"
                  role="status"
                >
                  <p>{successMsg}</p>
                  <div className="mt-3 flex gap-2">
                    <Link to="/login" className="btn-primary h-10">
                      Sign in
                    </Link>
                    <button
                      type="button"
                      className="btn-ghost h-10"
                      onClick={() => {
                        setSuccessMsg("");
                        navigate("/login");
                      }}
                    >
                      Go to Sign-in
                    </button>
                  </div>
                </div>
              )}

              {/* Show form only if not successful yet */}
              {!successMsg && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  aria-describedby={serverErr ? "form-error" : undefined}
                >
                  <h1 className="signup__h1 mb-2">Create your account</h1>

                  <label className="si-field">
                    <span className="si-label">I am</span>
                    <div className="flex gap-3">
                      <label>
                        <input type="radio" value="applicant" {...rhfRegister("role")} /> Applicant
                      </label>
                      <label>
                        <input type="radio" value="employer" {...rhfRegister("role")} /> Employer / Sponsor
                      </label>
                    </div>
                    {errors.role && (
                      <p className="si-error si-error-inline">{errors.role.message}</p>
                    )}
                  </label>

                  {role === "employer" && (
                    <>
                      <label className="si-field">
                        <span className="si-label">Organization Name</span>
                        <input type="text" {...rhfRegister("org_name")} />
                        {errors.org_name && (
                          <p className="si-error si-error-inline">{errors.org_name.message}</p>
                        )}
                      </label>
                      <label className="si-field">
                        <span className="si-label">Organization Slug (optional)</span>
                        <input type="text" {...rhfRegister("org_slug")} />
                        {errors.org_slug && (
                          <p className="si-error si-error-inline">{errors.org_slug.message}</p>
                        )}
                      </label>
                    </>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="si-field">
                      <span className="si-label">First name</span>
                      <input type="text" {...rhfRegister("first_name")} />
                      {errors.first_name && (
                        <p className="si-error si-error-inline">{errors.first_name.message}</p>
                      )}
                    </label>
                    <label className="si-field">
                      <span className="si-label">Last name</span>
                      <input type="text" {...rhfRegister("last_name")} />
                      {errors.last_name && (
                        <p className="si-error si-error-inline">{errors.last_name.message}</p>
                      )}
                    </label>
                  </div>

                  <label className="si-field">
                    <span className="si-label">Email</span>
                    <input type="email" autoComplete="email" {...rhfRegister("email")} />
                    {errors.email && (
                      <p className="si-error si-error-inline">{errors.email.message}</p>
                    )}
                  </label>

                  <label className="si-field">
                    <span className="si-label">Phone (optional)</span>
                    <input type="tel" autoComplete="tel" {...rhfRegister("phone")} />
                    {errors.phone && (
                      <p className="si-error si-error-inline">{errors.phone.message}</p>
                    )}
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="si-field">
                      <span className="si-label">Password</span>
                      <input
                        type="password"
                        autoComplete="new-password"
                        {...rhfRegister("password")}
                        aria-invalid={!!errors.password}
                      />
                      {errors.password && (
                        <p className="si-error si-error-inline">{errors.password.message}</p>
                      )}
                    </label>
                    <label className="si-field">
                      <span className="si-label">Confirm password</span>
                      <input
                        type="password"
                        autoComplete="new-password"
                        {...rhfRegister("password_confirmation")}
                        aria-invalid={!!errors.password_confirmation}
                      />
                      {errors.password_confirmation && (
                        <p className="si-error si-error-inline">
                          {errors.password_confirmation.message}
                        </p>
                      )}
                    </label>
                  </div>

                  {serverErr && (
                    <div id="form-error" className="si-error mt-2" role="alert">
                      {serverErr}
                    </div>
                  )}

                  <button className="btn-primary h-11 mt-2" disabled={isSubmitting}>
                    {isSubmitting ? "Creating…" : "Create account"}
                  </button>

                  <p className="si-legal mt-2">
                    Already have an account?{" "}
                    <Link to="/login" className="si-link">Sign in</Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
