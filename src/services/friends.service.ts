import firebaseSDKService from './firebaseSDK.service';

class FriendsService {

    async searchFriends(text: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await firebaseSDKService.searchString('users', 'fullName', text);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }

    async getFriendData(key: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await firebaseSDKService.getWhereKey('users', key);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }

    async createFriend(params: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {

                if (!params.child || params.child === '') {
                    throw new Error('Missing child param.');
                }

                if (!params.subChild || params.subChild === '') {
                    throw new Error('Missing subChild param.');
                }

                if (!params.data || params.data === '') {
                    throw new Error('Missing data param.');
                }

                await firebaseSDKService.setDataWhereMultiChilds('friends', params.child, params.subChild, params.data);
                resolve();

            } catch (e) {
                reject(e);
            }
        });
    }

    async getListFriends(id: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await firebaseSDKService.getWhereCustomKey('friends', id);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }

}

const friendsService = new FriendsService();
export default friendsService;