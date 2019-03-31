import firebaseSDKService from './firebaseSDK.service';

class UserService {

    /**
     * Function create new account
     * @param  {any} params
     */
    createAccount(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebaseSDKService.createUser(params).then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    /**
     * Function get information of user by userID
     * @param  {number} userId
     */
    getUserInfoByID(userId: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await firebaseSDKService.getWhere('users', 'userId', userId);
                resolve(user);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Function get information of user by email
     * @param  {string} email
     */
    getUserInfoByEmail(email: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await firebaseSDKService.getWhere('users', 'email', email);
                resolve(user);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Function get current user
     */
    getCurrentUser(email: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const userInfo = await firebaseSDKService.getWhere('users', 'email', email);
                resolve(userInfo[0]);
            } catch (e) {
                reject(e);
            }
        });
    }

    getuserInfo() {

    }

}

const userService = new UserService();
export default userService;