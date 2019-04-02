import firebaseSDKService from './firebaseSDK.service';
import axios from 'axios';
import promise from 'promise';

// Config
import config from '../assets/data/config.json';

// Utilities
import helper from '../utilities/helper';

// Services
import userService from './user.service';

class FakerService {

    public axiosInstance: any;

    constructor() {
        this.createAxios();
        this.instanceAxios();
    }

    createAxios() {
        this.axiosInstance = axios.create({
            baseURL: config['fakerApi'],
            timeout: 6000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
    }

    instanceAxios() {
        this.axiosInstance.interceptors.request.use((config: any) => {
            return config;
        }, (err: any) => {
            return promise.reject(err);
        });
    }

    getUsersFake() {
        return this.axiosInstance.get('/?results=50');
    }

    addUsersFake(): Promise<any> {
        return new Promise(async (resolve, reject) => {

            try {

                const res = await this.getUsersFake();
                const users = res.data.results;

                if (Array.isArray(users) && users.length > 0) {
                    for (let user of users) {

                        const userData = {
                            email: user.email,
                            password: '123456',
                            firstName: user.name.first,
                            lastName: user.name.last,
                            gender: user.gender,
                            picture: {
                                large: user.picture.large,
                                medium: user.picture.medium,
                                thumbnail: user.picture.thumbnail,
                            },
                            phone: user.phone,
                        }

                        await userService.createAccount(userData);

                    }
                }
                
                // console.log(res.data.results);
                resolve();

            } catch (e) {
                reject(e);
            }

        });
    }

}

const fakerService = new FakerService();
export default fakerService;