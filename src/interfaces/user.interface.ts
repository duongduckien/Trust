export interface IUserAvatar {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface IUserData {
    userId: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    picture: IUserAvatar;
    createdAt: Date;
    updatedAt: Date;
    deleted: number;
}