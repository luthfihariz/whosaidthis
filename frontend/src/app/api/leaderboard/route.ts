import { NextResponse } from "next/server";
import { LeaderboardResponse } from "@/data/types/leaderboard";

export async function GET() {
  try {
    const apiBaseUrl = process.env.API_BASE_URL;

    const response = await fetch(`${apiBaseUrl}/leaderboard`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Failed to fetch leaderboard from backend:", errorData);
      return NextResponse.json(
        { message: "Failed to fetch leaderboard" },
        { status: response.status }
      );
    }

    const data: LeaderboardResponse = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
