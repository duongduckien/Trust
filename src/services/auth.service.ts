import firebaseSDKService from './firebaseSDK.service';
import helper from '../utilities/helper';

class AuthService {

    /**
     * Function sign in
     * @param  {any} params
     */
    login(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebaseSDKService.auth(params.email, params.password).then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    /**
     * Function check is logged
     */
    isLogged(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebaseSDKService.logged().then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    /**
     * Function sign out
     */
    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebaseSDKService.signOut().then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

}

const authService = new AuthService();
export default authService;