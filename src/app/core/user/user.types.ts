export interface User
{
    id: string;
    name: string;
    email: string;
    userName: string;
    avatar?: string;
    status?: string;
    emailConfirmed: boolean;
    vectorsUID: number;
}
