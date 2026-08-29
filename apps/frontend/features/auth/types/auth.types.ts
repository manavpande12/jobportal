// Login
export type LoginRequest = {
    email: string;
    password: string;
}

// Register
export type RegisterRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

// Forget Password
export type ForgetPasswordRequest = { email: string; newPassword: string };

// Logout

