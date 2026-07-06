export type Role = "CLIENTE" | "LOJISTA" | "ADMIN_PLATAFORMA";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  tenantId?: string | null;
  avatarUrl?: string | null;
  isVerified: boolean;
};

export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
  user: User;
};
