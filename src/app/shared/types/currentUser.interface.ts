export interface CurrentUserInterface {
  id: number;
  email: string;
  createdAt: number;
  updatedAt: number;
  username: string;
  bio?: string | null;
  image: string | null;
  token: string;
}
