export type SignUpUser = {
    first_name: string;
    middle_name: string;
    last_name: string;
    school: string;
    age: string;
    graduation_year: string;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
};

export type LoginUser = {
    email: string;
    password: string;
}

export type GoogleUser = {
    first_name: string;
    middle_name: string;
    last_name: string;
    school: string;
    age: string;
    graduation_year: string;
    username: string;
}