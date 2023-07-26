export interface IAuth {
    email: string;
    password: string;
}

export interface IRegister extends IAuth {
    verify: string;
}

export type UserData = {
    user_id: number;
    email: string;
    role_id: number;
}
