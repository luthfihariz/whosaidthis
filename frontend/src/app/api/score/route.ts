import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { score, username } = await req.json();

    if (typeof score !== "number" || typeof username !== "string") {
      return NextResponse.json(
        { message: "Invalid score or username" },
        { status: 400 }
      );
    }

    console.log(`Score received: ${score} for user ${username}`);

    const apiBaseUrl = process.env.API_BASE_URL;

    const response = await fetch(`${apiBaseUrl}/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score, username }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Failed to save score to backend:", errorData);
      return NextResponse.json(
        { message: "Failed to save score" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Score saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving score:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
