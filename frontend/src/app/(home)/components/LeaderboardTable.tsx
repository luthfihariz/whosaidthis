"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaderboardItem, LeaderboardResponse } from "@/data/types/leaderboard";

async function getLeaderboardData(): Promise<LeaderboardItem[]> {
  try {
    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const response = await fetch(`${appUrl}/api/leaderboard`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch leaderboard data:", await response.text());
      return [];
    }

    const data: LeaderboardResponse = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return [];
  }
}

export default function LeaderboardTable() {
  const [data, setData] = useState<LeaderboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const leaderboardData = await getLeaderboardData();
      setData(leaderboardData);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading leaderboard...</div>;
  }

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden w-full max-w-2xl mx-auto p-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
        🏆 Leaderboard
      </h3>

      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[100px] text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </TableHead>
            <TableHead className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </TableHead>
            <TableHead className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.username} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gray-900">
                {index + 1}
              </TableCell>
              <TableCell className="text-gray-900">{item.username}</TableCell>
              <TableCell className="text-right font-semibold text-gray-900">
                {item.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
