export interface UserModel{
    id?:number;
    email_address?:string;
    username:string;
    password:string;
    profiles?:{type:string}[];
}