import firebaseWebService from './firebaseWeb.service';
import helper from '../utilities/helper';

class UserService {

    /**
     * Function create new account
     * @param  {any} params
     */
    createAccount(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebaseWebService.createUser(params).then((res: any) => {
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
                const user = await firebaseWebService.getWhere('users', 'userId', userId);
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
                const user = await firebaseWebService.getWhere('users', 'email', email);
                resolve(user);
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Function get current user
     */
    getCurrentUser(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {

                // const currentUser: any = firebaseSDKService.getCurrentUser();
                // console.log(currentUser);
                // const email = currentUser._user.email;
                const userInfo = await firebaseWebService.getWhere('users', 'email', 'test1@gmail.com');
                console.log(userInfo);
                resolve(userInfo);

            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }

    getuserInfo() {

    }

}

const userService = new UserService();
export default userService;