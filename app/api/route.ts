import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");

  // Mock data - replace with actual database queries
  const dashboardData = {
    fees: {
      total: 2500.0,
      paid: 1500.0,
      outstanding: 1000.0,
      overdueFees: 200.0,
      breakdown: [
        {
          category: "Tuition Fee",
          amount: 1200.0,
          dueDate: "2024-11-01",
          status: "pending",
        },
        {
          category: "Lab Fee",
          amount: 300.0,
          dueDate: "2024-10-15",
          status: "paid",
        },
        {
          category: "Sports Fee",
          amount: 200.0,
          dueDate: "2024-09-30",
          status: "overdue",
        },
      ],
    },
    recentPayments: [
      {
        id: "PAY-001",
        amount: 300.0,
        date: "2024-10-15",
        status: "completed",
        method: "Credit Card",
        reference: "REF-20241015-001",
      },
    ],
  };

  return NextResponse.json(dashboardData);
}
