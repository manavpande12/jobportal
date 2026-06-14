
export type UserFormType = {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
};

export type UserFormField = {
    name: keyof UserFormType;
    placeholder: string;
    type: "text" | "password";
    icon: "user" | "password";
    autoComplete: string;
};


export const UserFormFields: UserFormField[] = [
    {
        name: "firstName",
        placeholder: "First Name",
        type: "text",
        icon: "user",
        autoComplete: "given-name",
    },
    {
        name: "lastName",
        placeholder: "Last Name",
        type: "text",
        icon: "user",
        autoComplete: "family-name",
    },
    {
        name: "password",
        placeholder: "Password",
        type: "password",
        icon: "password",
        autoComplete: "new-password",
    },
    {
        name: "confirmPassword",
        placeholder: "Confirm Password",
        type: "password",
        icon: "password",
        autoComplete: "new-password",
    },
];

