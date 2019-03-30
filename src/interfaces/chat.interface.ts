export interface IMessage {
    createdAt: number;
    message: string;
    userId: number;
};

export interface IUserGiftedChat {
    _id: number;
    name?: string;
    avatar?: string;
};

export interface IMessageGiftedChat {
    _id: any;
    text: string;
    createdAt: Date;
    user: IUserGiftedChat;
    image?: string;
    system?: boolean;
}