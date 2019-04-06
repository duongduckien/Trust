import firebaseSDKService from './firebaseSDK.service';
import helper from '../utilities/helper';

// Interfaces
import { IUserData } from '../interfaces/user.interface';

class TestService {

    changeUserData(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {

                const result = await firebaseSDKService.get('users');
                console.log(result);

                // for (let item of result) {
                //     await firebaseSDKService.updateWhereKey('users', item.$key, {
                //         fullName: `${item.firstName} ${item.lastName}`
                //     });
                // }

                // const arrId = [2, 3];
                // for (let item of arrId) {
                //     const result = await firebaseSDKService.getWhere('users', 'userId', item);
                //     console.log(result[0]);
                //     const userData: IUserData = {
                //         userId: result[0].userId,
                //         email: result[0].email,
                //         password: result[0].password,
                //         firstName: result[0].firstName,
                //         lastName: result[0].lastName,
                //         gender: 'male',
                //         phone: result[0].phone,
                //         picture: {
                //             large: '',
                //             medium: '',
                //             thumbnail: '',
                //         },
                //         createdAt: result[0].createdAt,
                //         updatedAt: result[0].updatedAt,
                //         deleted: result[0].deleted,
                //     }
                //     await firebaseSDKService.updateWhereKey('users', result[0].$key, userData);
                // }
                console.log('Success');
            } catch (e) {
                reject(e);
            }
        });
    }

}

const testService = new TestService();
export default testService;