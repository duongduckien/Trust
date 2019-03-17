import firebase from 'react-native-firebase';

export class FirebaseService {

    auth(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then((res: any) => {
                resolve(res);
            })
            .catch((err: any) => {
                reject(err);
            });
        });
    }

    logged(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged((user: any) => {
                if (user) {
                    resolve(user);
                } else {
                    reject('error');
                }
            });
        });
    }

    signOut(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut().then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

}