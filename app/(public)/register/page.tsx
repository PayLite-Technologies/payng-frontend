"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import Link from "next/link";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["parent", "student", "institution_admin"]),
    acceptTerms: z.boolean().refine((val) => val === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "parent",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // TODO: Replace with real API call
      toast.success("Registration successful", {
        description: "Please check your email to verify your account",
      });
      router.push("/login");
    } catch (error: any) {
      toast.error("Registration failed", {
        description: error.message || "Please try again",
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
            Create Account
          </h1>
          <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
            Sign up to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#666666", fontFamily: "Inter, sans-serif" }}
            >
              Full Name
            </label>
            <div className="relative">
              <FaUser
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: "#808080" }}
              />
              <input
                type="text"
                {...register("name")}
                className="w-full pl-10 pr-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                placeholder="John Doe"
              />
            </div>
            {errors.name && (
              <p className="text-sm mt-1" style={{ color: "#FF6B6B" }}>
                {errors.name.message}
              </p>
            )}
          </div>

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
              I am a
            </label>
            <select
              {...register("role")}
              className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
            >
              <option value="parent">Parent/Guardian</option>
              <option value="student">Student</option>
              <option value="institution_admin">Institution Admin</option>
            </select>
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
                placeholder="Create a password"
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

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#666666", fontFamily: "Inter, sans-serif" }}
            >
              Confirm Password
            </label>
            <div className="relative">
              <FaLock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: "#808080" }}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full pl-10 pr-12 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="w-5 h-5" style={{ color: "#808080" }} />
                ) : (
                  <FaEye className="w-5 h-5" style={{ color: "#808080" }} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm mt-1" style={{ color: "#FF6B6B" }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                {...register("acceptTerms")}
                className="mt-1 w-4 h-4 rounded"
                style={{ accentColor: "#000080" }}
              />
              <span className="text-sm" style={{ color: "#666666" }}>
                I agree to the{" "}
                <Link href="/terms" className="underline" style={{ color: "#000080" }}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline" style={{ color: "#000080" }}>
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-sm mt-1" style={{ color: "#FF6B6B" }}>
                {errors.acceptTerms.message}
              </p>
            )}
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
            {isSubmitting ? "Creating account..." : "Create Account"}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: "#808080" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium transition-colors hover:underline"
              style={{ color: "#000080" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

