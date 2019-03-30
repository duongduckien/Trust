import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Content, Container } from 'native-base';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';

// Components
import { AvatarDemo2 } from '../../components/Images/Images';

// Languages
import { strings } from '../../utilities/i18n';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles } from '../../styles';

// Config
import config from '../../assets/data/config.json';

// Utilities
import helper from '../../utilities/helper';

// Interfaces
import { IMessage } from '../../interfaces/chat.interface';

// Services
import chatService from '../../services/chat';

interface IProps {

}

interface IState {
    messages: any;
}

export class ChatScreen extends Component<IProps, IState> {

    state = {
        messages: [],
    }

    constructor(props: any) {
        super(props);
        // this.getMessages();
    }

    componentWillMount() {

        // firebase.database().ref('messages').child('2_3').once('value', res => {
        //     console.log(res);
        // });

    }

    // async getMessages() {

    //     try {

    //         const msg = await apiService.getMessages(2, 3);
    //         console.log(msg);

    //     } catch (e) {
    //         console.log(e);
    //     }

    // }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            console.log(this.state.messages);
        });
    }


    componentDidMount() {

        chatService.refOn((message: any) => {
            console.log(message);
        });

        // if (helper.getKeyMessages(2, 3) !== '') {
            
        //     const keyOfMsg = helper.getKeyMessages(2, 3);
        //     firebase.database().ref('messages').child(keyOfMsg).limitToLast(20).on('child_added', (snap: any) => {
        //         // console.log('Messages', snap.val());
        //         const result: IMessage = snap.val();
        //         const msg: any = this.state.messages;
        //         msg.push(result);
        //         this.setState({
        //             messages: msg
        //         }, () => {
        //             console.log(this.state.messages);
        //         });
        //     });

        // }

        // firebase.database().get

        // this.setState({
        //     guestText: 'Đấy cũng là câu đùa cửa miệng của nhiều người đối với Đào, nhưng lần nào nghe nói câu nói ấy chị cũng buồn tủi như chợt được biết lần đầu về mình và chỉ trong chốc lát nét mặt chị đã thay đổi hẳn'
        // });

        // setTimeout(() => {
        //     this.setState({
        //         guestText: 'sdad'
        //     });
        // }, 5000);


        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'First messages',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        });
        
    }

    handleLoadEarlier() {
        console.log('handleLoadEarlier');
    }

    // handleChatView(event: any) {
    //     console.log(event.nativeEvent.layout);
    // }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages: any) => this.onSend(messages)}
                placeholder={strings('PLACEHOLDER_TYPE_MESSAGE')}
                loadEarlier={true}
                onLoadEarlier={() => this.handleLoadEarlier()}
                user={{
                    _id: 1,
                }}
            />
        );
    }

    componentWillUnmount() {
        
    }

}

{/* <View style={styleSheet.rowChat}>
    <View style={styleSheet.guestChat}>
        <View style={styleSheet.contentAvatar}>
            <Avatar
                source={AvatarDemo2()}
                rounded
                width={styles.avatarGuest.width}
            ></Avatar>
        </View>

        <View style={styleSheet.contentGuestChatText} onLayout={(event) => this.handleChatView(event)}>
            <Text style={styleSheet.chatText}>
                {this.state.guestText}
            </Text>
        </View>
    </View>

    <View style={styleSheet.meChat}>
        <View style={styleSheet.contentMeChatText}>
            <Text style={styleSheet.chatText}>Me chat</Text>
        </View>
    </View>
</View> */}