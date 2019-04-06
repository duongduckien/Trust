import { IUserData } from './user.interface';

export interface IFriendData {
    keyData: string;
    userData: IUserData;
    requestUser: number;
    accepted: number;
    timeRequest: number;
    timeAccepted: number;
}