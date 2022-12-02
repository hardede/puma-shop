import "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
  }
}
