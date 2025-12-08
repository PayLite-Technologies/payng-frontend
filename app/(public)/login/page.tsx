"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setStudents } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // TODO: Replace with real API call
      const mockUser = {
        id: "1",
        name: "John Doe",
        email: data.email,
        role: "parent" as const,
        institutionId: "inst-1",
        institutionName: "Sample School",
      };

      const mockStudents = [
        {
          id: "student-1",
          name: "Emma Wilson",
          grade: "Grade 10",
          studentId: "STU-2024-0234",
          institutionId: "inst-1",
          parentId: "1",
        },
      ];

      setUser(mockUser);
      setStudents(mockStudents);

      if (typeof window !== "undefined") {
        const sessionToken = btoa(`${mockUser.id}:${mockUser.role}:${Date.now()}`);
        window.localStorage.setItem("authToken", sessionToken);
        window.localStorage.setItem("payng-role", mockUser.role);
        document.cookie = `authToken=${sessionToken}; path=/`;
        document.cookie = `payng-role=${mockUser.role}; path=/`;
      }

      toast.success("Login successful", {
        description: `Welcome back, ${mockUser.name}!`,
      });

      router.push(redirect);
    } catch (error: any) {
      toast.error("Login failed", {
        description: error.message || "Invalid credentials",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E0E0E0] rounded-lg p-8 w-full max-w-md"
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        <div className="mb-8 text-center">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Welcome to Payng
          </h1>
          <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#666666", fontFamily: "Inter, sans-serif" }}
            >
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: "#808080" }}
              />
              <input
                type="email"
                {...register("email")}
                className="w-full pl-10 pr-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-sm mt-1" style={{ color: "#FF6B6B" }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#666666", fontFamily: "Inter, sans-serif" }}
            >
              Password
            </label>
            <div className="relative">
              <FaLock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: "#808080" }}
              />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full pl-10 pr-12 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" style={{ color: "#808080" }} />
                ) : (
                  <FaEye className="w-5 h-5" style={{ color: "#808080" }} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm mt-1" style={{ color: "#FF6B6B" }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded"
                style={{ accentColor: "#000080" }}
              />
              <span className="text-sm" style={{ color: "#666666" }}>
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-medium transition-colors hover:underline"
              style={{ color: "#000080" }}
            >
              Forgot password?
            </Link>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 rounded-[24px] text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "#000080",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: "#808080" }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium transition-colors hover:underline"
              style={{ color: "#000080" }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

