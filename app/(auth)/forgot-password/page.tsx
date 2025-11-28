"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";
import Link from "next/link";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success("Reset link sent", {
        description: "Check your email for password reset instructions",
      });
    } catch (error: any) {
      toast.error("Failed to send reset link", {
        description: error.message || "Please try again",
      });
    }
  };

  if (isSubmitted) {
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
            <FaEnvelope className="w-8 h-8" style={{ color: "#000000" }} />
          </div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Check Your Email
          </h1>
          <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
            We&apos;ve sent password reset instructions to your email address
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
          style={{ color: "#000080" }}
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
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
          Forgot Password?
        </h1>
        <p style={{ color: "#808080", fontFamily: "Inter, sans-serif" }}>
          Enter your email address and we&apos;ll send you a link to reset your password
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
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
          style={{ color: "#000080" }}
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
}


