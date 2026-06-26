"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { Check } from "@gravity-ui/icons";

// Imported react-toastify components and styles
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authClient } from "@/lib/auth-client";
import { googleSignIn, registerUser } from "@/lib/actions/authentication";

// Assuming standard Better Auth client usage setup:
// import { authClient } from "@/lib/auth-client"; 

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  // Form Submission Handler
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const registerData = {
      ...Object.fromEntries(formData.entries()),
      plan: "free",
      role: "user",
    };

    try {
      // Integration Example with Better Auth:
      const {data,error} = await registerUser(registerData);

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
      }
      if(data){

        toast.success("Account created successfully!");
        console.log("Registration payload prepared:", registerData);
      }

      // Using React Toastify with explicit dark theme config

    } catch (err) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Provider Authentication handler
  const handleGoogleLogin = async () => {
    try {
      await googleSignIn()
      toast.info("Redirecting to Google...", { theme: "dark" });
    } catch (err) {
      toast.error("Google authentication failed.", { theme: "dark" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex flex-col justify-center items-center px-4 relative selection:bg-green-500/30 py-20">
      {/* Toast Notification Container with Dark Theme defaults */}
      <ToastContainer position="top-center" autoClose={4000} theme="dark" />

      {/* Decorative Radial Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Create an <span className="text-green-400">Account</span>
          </h1>
          <p className="text-zinc-500 text-sm mt-2 font-light">
            Join us to start preserving and tracking life lessons.
          </p>
        </div>

        {/* Hero UI Form wrapper */}
        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>

          {/* Name Field */}
          <TextField isRequired name="name" type="text" className="w-full">
            <Label className="text-zinc-300 text-sm font-medium">Full Name</Label>
            <Input
              placeholder="John Doe"
              className="bg-zinc-950 text-white border-zinc-800 focus:border-green-500"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-zinc-300 text-sm font-medium">Email Address</Label>
            <Input
              placeholder="john@example.com"
              className="bg-zinc-950 text-white border-zinc-800 focus:border-green-500"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Photo URL Field */}
          <TextField isRequired name="photoUrl" type="url" className="w-full">
            <Label className="text-zinc-300 text-sm font-medium">Photo URL</Label>
            <Input
              placeholder="https://example.com/avatar.jpg"
              className="bg-zinc-950 text-white border-zinc-800 focus:border-green-500"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Password Field with strict validation requirements */}
          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              return null;
            }}
          >
            <Label className="text-zinc-300 text-sm font-medium">Password</Label>
            <Input
              placeholder="••••••••"
              className="bg-zinc-950 text-white border-zinc-800 focus:border-green-500"
            />
            <FieldError className="text-xs text-red-400 mt-1" />
          </TextField>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-white/5"
            >
              {!loading && <Check className="w-4 h-4" />}
              Register Account
            </Button>

            {/* Separator */}
            <div className="relative my-2 flex items-center justify-center">
              <div className="absolute w-full border-t border-zinc-800" />
              <span className="relative bg-zinc-900/40 px-3 text-xs uppercase text-zinc-600 tracking-wider">
                Or Continue With
              </span>
            </div>

            {/* Google Authentication */}
            <Button
              type="button"
              onPress={handleGoogleLogin}
              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-medium py-6 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Sign up with Google
            </Button>
          </div>
        </Form>

        {/* Auth Navigation Link */}
        <p className="text-zinc-500 text-center text-sm mt-6 font-light">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-green-400 hover:underline font-medium ml-1">
            Log In
          </Link>
        </p>

      </div>
    </div>
  );
}