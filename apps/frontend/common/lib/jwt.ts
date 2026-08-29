import { JwtPayload } from "@/common/types/jwt.types";
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string): JwtPayload | null => {
    try {
        return jwtDecode<JwtPayload>(token);
    } catch {
        return null;
    }
};