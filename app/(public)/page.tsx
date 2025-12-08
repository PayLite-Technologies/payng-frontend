"use client"

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Shield,
  Zap,
  Users,
  Lock,
  CheckCircle,
  TrendingUp,
  CreditCard,
  FileText,
  Bell,
  BarChart3,
  Play,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Counter Component
function Counter({ end, duration = 2 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
}

// Section Wrapper with Animation
function Section({ children, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #000080 0%, #001F3F 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Trust Badge */}
          <motion.div variants={fadeUp} className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/20">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm font-medium">
                Trusted by 5,000+ Schools Across Africa
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Pay School Fees with
            <br />
            <span className="relative inline-block">
              Ease & Confidence
              <motion.div
                className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 rounded-full"
                style={{ backgroundColor: "#90EE90" }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-10 max-w-3xl mx-auto px-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Africa's most trusted school fees payment platform. Secure, simple, and designed for modern parents and institutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#000080",
                borderRadius: "24px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Get Started Free
            </button>
            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
              style={{
                backgroundColor: "#90EE90",
                color: "#000000",
                border: "1px solid #808080",
                borderRadius: "24px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={fadeUp}
            className="mt-8 sm:mt-16 flex flex-wrap justify-center items-center gap-3 sm:gap-8 px-4"
          >
            {["Bank-Grade Security", "Instant Notifications", "24/7 Support"].map((badge, i) => (
              <motion.div
                key={badge}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg text-xs sm:text-sm"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: "#90EE90" }} />
                <span className="text-white whitespace-nowrap">{badge}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

// Stats Section Component
function StatsSection() {
  const stats = [
    { label: "Schools", value: 5000, suffix: "+" },
    { label: "Happy Parents", value: 150000, suffix: "+" },
    { label: "Payments Processed", value: 50, suffix: "M", prefix: "₦" },
    { label: "Countries", value: 12, suffix: "" },
  ];

  return (
    <Section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="text-center p-4 sm:p-6 bg-white rounded-lg"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div
                className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2"
                style={{
                  color: "#000080",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {stat.prefix}
                <Counter end={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-xs sm:text-sm lg:text-base" style={{ color: "#808080" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// How It Works Section Component
function HowItWorksSection() {
  const steps = [
    {
      icon: Users,
      step: "01",
      title: "Create Account",
      description: "Sign up in minutes as a parent or institution. No paperwork, no hassle.",
    },
    {
      icon: CreditCard,
      step: "02",
      title: "Link Students",
      description: "Add your children and their schools. Choose payment plans that work for you.",
    },
    {
      icon: CheckCircle,
      step: "03",
      title: "Pay & Track",
      description: "Make secure payments and get instant confirmation. Track everything in one place.",
    },
  ];

  return (
    <Section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            How Payng Works
          </h2>
          <p className="text-base sm:text-lg" style={{ color: "#808080" }}>
            Three simple steps to stress-free school fee payments
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              className="relative p-6 sm:p-8 bg-white rounded-lg transition-all duration-300"
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "8px",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
            >
              <div
                className="absolute -top-3 sm:-top-4 left-6 sm:left-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold"
                style={{
                  backgroundColor: "#90EE90",
                  color: "#000000",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {item.step}
              </div>
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6 mx-auto mt-3 sm:mt-4"
                style={{ backgroundColor: "#000080" }}
              >
                <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3
                className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center"
                style={{
                  color: "#000080",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-center" style={{ color: "#808080" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Instant Payments",
      description: "Process payments in seconds with multiple payment options including cards, bank transfers, and mobile money.",
    },
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "Never miss a payment deadline with automated SMS and email notifications.",
    },
    {
      icon: FileText,
      title: "Digital Receipts",
      description: "Get instant digital receipts and maintain a complete payment history.",
    },
    {
      icon: BarChart3,
      title: "Payment Analytics",
      description: "Track spending trends and manage budgets with detailed reports and insights.",
    },
    {
      icon: Lock,
      title: "Bank-Grade Security",
      description: "Your data is protected with military-grade encryption and PCI DSS compliance.",
    },
    {
      icon: TrendingUp,
      title: "Flexible Payment Plans",
      description: "Spread payments over time with customizable installment plans.",
    },
  ];

  return (
    <Section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Powerful Features
          </h2>
          <p className="text-base sm:text-lg" style={{ color: "#808080" }}>
            Everything you need for seamless school fee management
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="p-4 sm:p-6 bg-white rounded-lg transition-all duration-300"
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                borderRadius: "8px",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4"
                style={{ backgroundColor: "#000080" }}
              >
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3
                className="text-base sm:text-lg font-bold mb-2"
                style={{
                  color: "#000080",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base" style={{ color: "#808080" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Testimonials Section Component
function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Mrs. Adebayo",
      role: "Parent, Lagos",
      text: "Payng has completely transformed how I manage my children's school fees. No more queues, no more stress. Just simple, secure payments from my phone.",
      avatar: "A",
    },
    {
      name: "Dr. Okonkwo",
      role: "School Administrator, Abuja",
      text: "We've seen a 95% reduction in payment delays since switching to Payng. The reconciliation features save our finance team hours every week.",
      avatar: "O",
    },
    {
      name: "Mr. Mensah",
      role: "Parent, Accra",
      text: "As a busy professional, Payng's payment plans let me spread my daughter's fees across the term. The reminders ensure I never miss a payment.",
      avatar: "M",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <Section className="py-12 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            What Our Users Say
          </h2>
          <p className="text-base sm:text-lg" style={{ color: "#808080" }}>
            Join thousands of satisfied parents and schools
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="p-6 sm:p-8 bg-white rounded-lg text-center"
            style={{
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              borderRadius: "8px",
            }}
          >
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6"
              style={{
                backgroundColor: "#000080",
                color: "#FFFFFF",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {testimonials[activeTestimonial].avatar}
            </div>
            <p
              className="text-base sm:text-lg mb-4 sm:mb-6 italic px-4"
              style={{ color: "#333333", fontFamily: "Merriweather, serif" }}
            >
              "{testimonials[activeTestimonial].text}"
            </p>
            <div>
              <p
                className="font-bold text-base sm:text-lg"
                style={{
                  color: "#000080",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {testimonials[activeTestimonial].name}
              </p>
              <p className="text-sm sm:text-base" style={{ color: "#808080" }}>
                {testimonials[activeTestimonial].role}
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={() =>
                setActiveTestimonial(
                  (prev) => (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: "#000080" }}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === activeTestimonial ? "#000080" : "#E0E0E0",
                  }}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
              }
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ backgroundColor: "#000080" }}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Trust & Security Section Component
function SecuritySection() {
  return (
    <Section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} className="text-center mb-12 sm:mb-16">
          <Lock className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6" style={{ color: "#000080" }} />
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}
          >
            Bank-Grade Security
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "#808080" }}>
            Your payments and personal information are protected with military-grade encryption and PCI DSS Level 1 compliance
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center items-center gap-3 sm:gap-8 mb-8 sm:mb-12"
        >
          {["256-bit SSL", "PCI DSS Compliant", "ISO Certified", "2FA Protected"].map((badge) => (
            <div
              key={badge}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-white rounded-lg text-sm sm:text-base"
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <span style={{ color: "#000080", fontFamily: "Poppins, sans-serif" }}>
                {badge}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="text-center">
          <p className="mb-3 sm:mb-4 text-sm sm:text-base" style={{ color: "#808080" }}>
            Powered by trusted payment partners:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            {["Flutterwave", "Paystack", "Interswitch"].map((partner) => (
              <div
                key={partner}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white rounded-lg font-semibold text-sm sm:text-base"
                style={{
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  color: "#000080",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {partner}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// CTA Section Component
function CTASection() {
  return (
    <section
      className="py-12 sm:py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #000080 0%, #001F3F 100%)",
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Ready to Simplify School Fees?
          </h2>
          <p className="text-base sm:text-lg text-gray-200 mb-8 sm:mb-10">
            Join 5,000+ schools and 150,000+ parents who trust Payng every day
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#000080",
                borderRadius: "24px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Get Started Free
            </button>
            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: "#90EE90",
                color: "#000000",
                border: "1px solid #808080",
                borderRadius: "24px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Contact Sales
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#000080" }}
              >
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span
                className="text-lg sm:text-xl font-bold"
                style={{
                  color: "#FFFFFF",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Payng
              </span>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">
              Africa's most trusted school fees payment platform
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
              Product
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              {["Features", "Pricing", "Security", "API"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              {["About Us", "Careers", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
              Contact
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-all">hello@payng.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>+234 800 PAYNG</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © 2024 Payng. All rights reserved.
          </p>
          <div className="flex gap-3 sm:gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ backgroundColor: "#000080" }}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function LandingPage() {
  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <SecuritySection />
      <CTASection />
      <Footer />
    </div>
  );
}

