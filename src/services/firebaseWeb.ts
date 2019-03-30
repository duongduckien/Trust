import firebase from 'firebase';
import firebaseSDK from './firebaseSDK';
import helper from '../utilities/helper';

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
            firebase.database().ref(collection).push(data, (err: any) => {
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
     * @param  {string} key
     * @param  {any} data
     */
    updateWhereKey(collection: string, key: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).child(key).update(data, (err: any) => {
                if (!err) {
                    resolve();
                } else {
                    reject(err);
                }
            })
        });
    }
    
    /**
     * @param  {string} collection
     * @param  {string} key
     * @param  {any} data
     */
    insertWithCustomKey(collection: string, key: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).child(key).set(data, (err: any) => {
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
     */
    getUniqueId(collection: string): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref('lastId').child(collection).once('value', async (res: any) => {
                if (res.val()) {

                    const lastId = res.val();

                    if (Number.isInteger(lastId) && lastId > 0) {

                        const nextId = lastId + 1;

                        try {
                            await this.setWhereKey('lastId', collection, nextId);
                            resolve(nextId);
                        } catch (e) {
                            reject(e);
                        }

                    } else {
                        reject();
                    }

                } else {
                    reject();
                }
            });
        });
    }

    /**
     * @param  {string} collection
     * @param  {string} key
     * @param  {any} value
     */
    setWhereKey(collection: string, key: string, value: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.database().ref(collection).child(key).set(value).then((res: any) => {
                resolve(res);
            }).catch((err: any) => {
                reject(err);
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
            firebase.database().ref(collection).orderByChild(param).equalTo(value).once('value', (res: any) => {
                if (res.val()) {
                    resolve(res.val());
                } else {
                    reject();
                }
            });
        });
    }

    createUser(userData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            
            try {

                if (!userData['email'] || userData['email'] === '') {
                    throw new Error('Missing email value.');
                }

                if (!userData['password'] || userData['password'] === '') {
                    throw new Error('Missing password value.');
                }

                await firebaseSDK.createUser(userData['email'], userData['password']);

                // Get unique ID
                const id = await this.getUniqueId('users');

                // Add new keys
                userData['userId'] = id;
                userData['createdAt'] = helper.getTime();
                userData['updatedAt'] = helper.getTime();
                userData['deleted'] = 0;

                // Insert user data to firebase
                await this.insert('users', userData);

                resolve('Create user succesfully.');

            } catch (e) {
                reject(e);
            }

        });
    }

}

const firebaseWebService = new FirebaseWebService();
export default firebaseWebService;