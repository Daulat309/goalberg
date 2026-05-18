export type UserRole = "admin" | "manager" | "employee";

export interface AppUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}
