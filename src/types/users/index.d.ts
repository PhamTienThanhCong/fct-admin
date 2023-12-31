export interface IUser {
  id: number;
  role_id: string | null | number;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  card_id: string | null;
  title: string | null;
  description: string | null
  password:string | null
}
export interface UserPayload {
  id?: number;
  role_id: string | number | null;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  card_id: string | null;
  title: string | null;
  description: string | null;
  keyword:string
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

export interface UserSliceState {
  users: IUser[];
  isFetching: boolean;
}