import firebase from 'firebase';
import helper from '../utilities/helper';

// Config
import config from '../assets/data/config.json';

class ChatService {

    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config['firebase']);
        }
    }

    get ref() {
        return firebase.database().ref('messages');
    }

    refOn(callback) {
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    }

    parse(snapshot: any) {
        return snapshot.val();
    };

    refOff() {
        this.ref.off();
    }

}

const chatService = new ChatService();
export default chatService;