import { FirebaseService } from './firebase';

const firebase = new FirebaseService();

export class APIService {

    login(params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth(params.email, params.password).then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    isLogged(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.logged().then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    logout(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.signOut().then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

}