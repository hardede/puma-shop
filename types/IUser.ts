export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
  phone?: string;
  city?: string;
}
