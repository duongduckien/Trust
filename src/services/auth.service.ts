import firebaseWebService from './firebaseWeb.service';
import helper from '../utilities/helper';

class AuthService {

    /**
     * Function sign in
     * @param  {any} params
     */
    login(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebaseWebService.auth(params.email, params.password).then((res: any) => {
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
            firebaseWebService.logged().then((res: any) => {
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
            firebaseWebService.signOut().then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

}

const authService = new AuthService();
export default authService;