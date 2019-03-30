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
import apiService from '../../services/api';

interface IProps {
    actions: {
        common: any;
    };
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
    }

    componentWillMount() {
        this.getMessages();
    }

    async getMessages() {
        try {
            this.props.actions.common.showLoading(true);
            const msg = await apiService.getMessages(2, 3);
            this.setState({
                messages: msg,
            });
        } catch (e) {
            console.log(e);
        } finally {
            this.props.actions.common.showLoading(false);
        }
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }), () => {
            console.log(this.state.messages);
        });
    }

    componentDidMount() {

        // this.setState({
        //     messages: [
        //         {
        //             _id: 1,
        //             text: 'First messages',
        //             createdAt: new Date(),
        //             user: {
        //                 _id: 2,
        //                 name: 'React Native',
        //                 avatar: 'https://placeimg.com/140/140/any',
        //             },
        //         },
        //     ],
        // });
        
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
                    _id: 1,
                }}
            />
        );
    }

    componentWillUnmount() {
        
    }

}