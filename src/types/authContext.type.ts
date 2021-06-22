import { UserType } from "./user.type";

export type AuthContextType = {
  user?: UserType;
  singWithGoogle: () => Promise<void>;
};