import firebase from 'firebase';

// Config
import config from '../assets/data/config.json';

class FirebaseWebService {

    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config['firebase']);
        }
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
     * @param  {string} collection
     * @param  {string} param
     * @param  {any} value
     */
    getWhere(collection: string, param: string, value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).orderByChild(param).equalTo(value).once('value', res => {
                console.log(res);
                if (res.val()) {
                    resolve(res.val());
                } else {
                    reject();
                }
            });
        });
    }

}

const firebaseWebService = new FirebaseWebService();
export default firebaseWebService;