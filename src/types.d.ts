export type TableUser = {
    name: string;
    age: number;
    email: string;
    city: string;
    country: string;
};

export type Field = keyof TableUser;
