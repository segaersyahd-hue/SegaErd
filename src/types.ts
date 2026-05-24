export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  businessName?: string;
  tier?: "Starter" | "Pro" | "Enterprise";
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ContentDraft {
  id: string;
  title: string;
  content: string;
  hashtags: string[];
  platform: "instagram" | "facebook" | "tiktok";
  status: "draft" | "scheduled" | "published";
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: "active" | "completed" | "draft";
  reach: number;
  clicks: number;
  conversions: number;
}
