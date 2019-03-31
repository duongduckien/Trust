import firebaseWebService from './firebaseWeb.service';
import helper from '../utilities/helper';

class APIService {

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
                email: 'duongduckien7590@gmail.com',
                password: '@abc@123',
                firstName: 'Duong',
                lastName: 'Kien',
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