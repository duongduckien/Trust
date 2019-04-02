import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles, colors } from '../../styles';

// Services
import apiService from '../../services/api';
import fakerService from '../../services/faker.service'; 

interface IProps {
    key: string;
    common: any;
}

interface IState {

}

export class RightButton extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    async handleVoiceCall() {
        try {
            // await apiService.createMsgExample();
            // await apiService.createUserExample();
            console.log('handleVoiceCall');
        } catch (e) {
            console.log(e);
        }
    }

    handleVideoCall() {
        console.log('handleVideoCall');
    }

    async handleAddFriends() {
        try {

            Actions.addFriends();
            // await fakerService.addUsersFake();
            // console.log('Add success.');

        } catch (e) {
            console.log(e);
        }
    }

    renderChatScreen() {
        return (
            <View style={styleSheet.contentRight}>
                <View>
                    <TouchableOpacity
                        onPress={() => this.handleVoiceCall()}
                    >
                        <Icon
                            name='phone'
                            type='font-awesome'
                            iconStyle={styleSheet.icon}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={() => this.handleVideoCall()}
                    >
                        <Icon
                            name='video-camera'
                            type='font-awesome'
                            iconStyle={styleSheet.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderContactScreen() {
        return (
            <View style={styleSheet.contentRight}>
                <View>
                    <TouchableOpacity
                        onPress={() => this.handleAddFriends()}
                    >
                        <Icon
                            name='user-plus'
                            type='font-awesome'
                            iconStyle={styleSheet.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {

        const nameScreen = this.props.common.rootScreen;

        switch (nameScreen) {
            case 'MessagesScreen': {
                return (
                    this.renderChatScreen()
                );
            }
            case 'SettingsScreen': {
                return (
                    <View></View>
                );
            }
            case 'ContactScreen': {
                return (
                    this.renderContactScreen()
                );
            }
            default: {
                break;
            }
        }

    }

}
