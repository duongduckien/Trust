import firebase from 'react-native-firebase';

class FirebaseService {

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
     * @param  {string} collection
     * @param  {any} data
     */
    insert(collection: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).push(data, err => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
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
     * Function create user
     * @param  {string} email
     * @param  {string} password
     */
    createUser(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((res: any) => {



            })
                .catch((err: any) => {
                    reject(err);
                });
        });
    }

    /**
     * Function get current user
     */
    getCurrentUser() {
        return firebase.auth().currentUser;
    }

}

const firebaseService = new FirebaseService();
export default firebaseService;