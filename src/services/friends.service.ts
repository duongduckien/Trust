import firebaseSDKService from './firebaseSDK.service';

class FriendsService {

    async searchFriends(text: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await firebaseSDKService.searchString('users', 'email', text);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }

}

const friendsService = new FriendsService();
export default friendsService;