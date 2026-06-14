export const isValidEmail = (email: string): boolean => {
    const trimmed = email.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
};