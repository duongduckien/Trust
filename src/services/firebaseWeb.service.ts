// import firebase from 'firebase';
import firebase from 'react-native-firebase';
import _ from 'lodash';

// Utilities
import helper from '../utilities/helper';

// Config
import config from '../assets/data/config.json';

// Interfaces
import { IUserGiftedChat, IMessageGiftedChat } from '../interfaces/chat.interface';

class FirebaseWebService {

    constructor() {
        // if (!firebase.apps.length) {
        //     firebase.initializeApp(config['firebase']);
        // }
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

}

const firebaseWebService = new FirebaseWebService();
export default firebaseWebService;