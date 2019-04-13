import { IUserData } from './user.interface';

export interface IFriendData {
    keyData: string;
    userData: IUserData;
    requestUser: number;
    accepted: number;
    timeRequest: number;
    timeAccepted: number;
}

export interface IFriendDataUpdateStore {
    key: string;
    accepted: number;
    timeAccepted: number;
}