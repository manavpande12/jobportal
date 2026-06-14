import { RoleType } from "./role.types";

export type JwtPayload = {
    sub: string;
    userId: string;
    role: RoleType;
    exp: number;
    iat: number;
};