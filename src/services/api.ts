import firebaseSDKService from './firebaseSDK';
import firebaseWebService from './firebaseWeb';
import helper from '../utilities/helper';

class APIService {

    login(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebaseSDKService.auth(params.email, params.password).then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    isLogged(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebaseSDKService.logged().then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebaseSDKService.signOut().then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    createAccount(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebaseSDKService.createUser(params.email, params.password).then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    getUserId() {
        const user: any = firebaseSDKService.getCurrentUser();
        return user['uid'];
    }

    getMessages(userId: number, guestId: number, guestInfo: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const messages = await firebaseWebService.getMessages(userId, guestId, guestInfo);
                resolve(messages);
            } catch (e) {
                reject(e);
            }
        });
    }

    createMessage(userId: number, guestId: number, msgData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await firebaseWebService.createMessage(userId, guestId, msgData);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    getGuestInfo(guestId: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const guest = await firebaseWebService.getWhere('users', 'userId', guestId);
                resolve(guest);
            } catch (e) {
                console.log(e);
            }
        });
    }

    /**
    |--------------------------------------------------
    | Function for test
    |--------------------------------------------------
    */
    createLastId(collectionName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebaseWebService.insertWithCustomKey('lastId', collectionName, 1).then(() => {
                resolve('Create lastID for collection successfully.');
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    async createUserExample() {
        try {
            const userData = {
                email: 'test2@gmail.com',
                password: '123456',
                firstName: 'The',
                lastName: 'Test2',
                phone: '',
                avatar: '',
            }
            const result = await firebaseWebService.createUser(userData);
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    async createMsgExample() {
        try {
            const msgData = {
                userId: 3,
                message: `${helper.randomString(10)} from user 3`,
                createdAt: helper.getTime(), 
            };
            await firebaseWebService.createMessage(2, 3, msgData);
            console.log('Create message successfully.');
        } catch(e) {
            console.log(e);
        }
    }

}

const apiService = new APIService();
export default apiService;