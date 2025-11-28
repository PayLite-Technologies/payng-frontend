"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { toast } from "sonner";
import Link from "next/link";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid reset token", {
        description: "Please request a new password reset link",
      });
      return;
    }

    try {
      // TODO: Replace with real API call
      // await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token, password: data.password }),
      // });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      toast.success("Password reset successful", {
        description: "You can now login with your new password",
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      toast.error("Password reset failed", {
        description: error.message || "Please try again",
      });
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#E0E0E0] rounded-lg p-8 text-center"
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        <div className="mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "#90EE90" }}
          >
            <FaCheckCircle className="w-8 h-8" style={{ color: "#000000" }} />
          </div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Password Reset Successful
          </h1>
          <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
            Redirecting to login...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#E0E0E0] rounded-lg p-8"
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
        >
          Reset Password
        </h1>
        <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
          Enter your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#666666", fontFamily: "Inter, sans-serif" }}
          >
            New Password
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
              placeholder="Enter new password"
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
              placeholder="Confirm new password"
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

        <motion.button
          type="submit"
          disabled={isSubmitting || !token}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 rounded-[24px] text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "#000080",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm font-medium transition-colors hover:underline"
          style={{ color: "#000080" }}
        >
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
}


