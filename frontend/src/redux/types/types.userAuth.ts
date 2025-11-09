export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface UserInitialState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
