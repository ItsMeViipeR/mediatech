export interface AppUser {
  githubId: number;
  discordId?: string;
  avatarUrl: string;
  name: string;
  email: string;
  login: string;
}

declare module "#auth-utils" {
  interface User extends AppUser {}
}
