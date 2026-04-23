import { NextRequest, NextResponse } from "next/server";

const TARGET_URL = "https://jobjunction4u.com/api/admin/jobs/fetchjob";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(TARGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch jobs from external API",
      },
      { status: 500 }
    );
  }
}