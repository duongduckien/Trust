import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Content, Container } from 'native-base';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'react-native-firebase';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

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
import { IMessage, IMessageGiftedChat } from '../../interfaces/chat.interface';
import { ICurrentUser } from '../../interfaces/user.interface';

// Services
import apiService from '../../services/api';
import userService from '../../services/user.service';

interface IProps {
    actions: {
        common: any;
    };
    paramsScene: any;
}

interface IState {
    messages: any;
    guestInfo: any;
    currentUser: ICurrentUser;
}

export class ChatScreen extends Component<IProps, IState> {

    state = {
        messages: [],
        guestInfo: {},
        currentUser: {
            $key: '',
            email: '',
            userId: 0,
        },
    }

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        this.getCurrentUser();
    }

    async getCurrentUser() {
        try {
            const currentUser: ICurrentUser = await helper.getCurrentUser();
            this.setState({ currentUser });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getMessages(this.props.paramsScene.chat.guestId);
    }

    componentWillReceiveProps(nextProps: any) {
        // console.log(nextProps);
    }

    async getMessages(guestId: number) {
        try {
            const guest = await userService.getUserInfoByID(guestId);
            if (!Array.isArray(guest) || guest.length < 0) {
                throw new Error('Cannot get the information of guest.');
            }
            const msg = await apiService.getMessages(this.state.currentUser.userId, guestId, guest[0]);
            this.setState({
                messages: msg,
                guestInfo: guest[0],
            }, () => {
                this.handleOnNewMsg(this.state.currentUser.userId, guestId, msg, guest[0]);
            });
        } catch (e) {
            console.log(e);
        }
    }

    handleOnNewMsg(userId: number, guestId: number, msgData: any, guestInfo: any) {
        const customKey = helper.getKeyMessages(userId, guestId);
        firebase.database().ref('messages').child(customKey).limitToLast(20).on('child_added', (res: any) => {
            if (!_.find(msgData, {_id: res.key}) && res.val().userId === guestInfo['userId']) {
                const msgGiftedChat: IMessageGiftedChat[] = [{
                    _id: res.key,
                    text: res.val().message,
                    createdAt: res.val().createdAt,
                    image: res.val().image ? res.val().image : '',
                    user: {
                        _id: guestInfo['userId'],
                        name: `${guestInfo['firstName']} ${guestInfo['lastName']}`,
                        avatar: guestInfo['picture']['large'],
                    }
                }];
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, msgGiftedChat),
                }));
            }
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), async () => {

            try {

                const msgData: IMessage = {
                    createdAt: new Date(messages[0]['createdAt']).getTime(),
                    message: messages[0]['text'],
                    userId: messages[0]['user']['_id'],
                }
                await apiService.createMessage(this.state.currentUser.userId, this.props.paramsScene.chat.guestId, msgData);

            } catch (e) {
                console.log(e);
            }

        });
    }

    handleLoadEarlier() {
        console.log('handleLoadEarlier');
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages: any) => this.onSend(messages)}
                placeholder={strings('PLACEHOLDER_TYPE_MESSAGE')}
                loadEarlier={true}
                onLoadEarlier={() => this.handleLoadEarlier()}
                user={{
                    _id: this.state.currentUser.userId,
                }}
            />
        );
    }

    componentWillUnmount() {
        
    }

}