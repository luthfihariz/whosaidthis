export interface LeaderboardItem {
  username: string;
  score: string;
}

export interface LeaderboardResponse {
  items: LeaderboardItem[];
}
