export interface IUser {
  id: number;
  email: string;
  username: string;
  role: string | null | number;
}

export interface AuthState {
  isAuthenticated: boolean;
  isFetching: boolean;
  currentUser: IUser;
}

export interface UserLogin {
  email: string;
  password: string;
}
