import firebase from 'react-native-firebase';

class FirebaseSDKService {

    constructor() {

    }

    /**
     * Function authentication
     * @param  {string} email
     * @param  {string} password
     */
    auth(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

    /**
     * Function check logged
     */
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

    /**
     * Function sign out
     */
    signOut(): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut().then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    }

    /**
     * Function get current user
     */
    getCurrentUser() {
        return firebase.auth().currentUser;
    }

    /**
     * Function create user
     * @param  {string} email
     * @param  {string} password
     */
    createUser(email: string, password: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }

}

const firebaseSDK = new FirebaseSDKService();
export default firebaseSDK;