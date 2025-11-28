import { NextRequest, NextResponse } from "next/server";

/**
 * API Route: /api/payments
 * Proxies payment requests to backend
 * Handles both Flutterwave and Arca payment processing
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentMethod, amount, studentId, feeTypes, ...paymentData } = body;

    // Get backend URL from environment
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

    // Route to appropriate payment gateway handler
    if (paymentMethod === "arca") {
      // Proxy Arca payment to backend
      const response = await fetch(`${backendUrl}/api/payments/arca`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
        body: JSON.stringify({
          amount,
          studentId,
          feeTypes,
          ...paymentData,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return NextResponse.json(
          { error: error.message || "Payment processing failed" },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    } else if (paymentMethod === "flutterwave") {
      // Flutterwave is handled client-side, but we can log/verify here
      const response = await fetch(`${backendUrl}/api/payments/flutterwave/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.get("Authorization") || "",
        },
        body: JSON.stringify({
          transactionId: paymentData.transactionId,
          amount,
          studentId,
          feeTypes,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        return NextResponse.json(
          { error: error.message || "Payment verification failed" },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    return NextResponse.json(
      { error: "Invalid payment method" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Payment API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const status = searchParams.get("status");

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
    const queryParams = new URLSearchParams();
    if (studentId) queryParams.append("studentId", studentId);
    if (status) queryParams.append("status", status);

    const response = await fetch(
      `${backendUrl}/api/payments?${queryParams.toString()}`,
      {
        headers: {
          Authorization: request.headers.get("Authorization") || "",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch payments" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Payment fetch error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}


