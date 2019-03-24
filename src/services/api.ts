import { FirebaseService } from './firebase';

const apiService = new FirebaseService();

export class APIService {

    login(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            apiService.auth(params.email, params.password).then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    isLogged(): Promise<any> {
        return new Promise((resolve, reject) => {
            apiService.logged().then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            apiService.signOut().then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    createAccount(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            apiService.createUser(params.email, params.password).then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

}