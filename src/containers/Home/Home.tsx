import React, { Component } from 'react';
import { View, TextInput, Platform, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Item, Input } from 'native-base';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles } from '../../styles';

// Components
import AgoraRTCView from '../../components/AgoraRTCView';
import MessagesScreen from '../Messages';
import SettingsScreen from '../Settings';
import ContactScreen from '../Contact';

// Config
import configData from '../../assets/data/config.json';

// Languages
import { strings } from '../../utilities/i18n';

// Services
import userService from '../../services/user.service';

interface IProps {
    common: any;
}

interface IState {
    showLive: boolean;
    error: any;
    channelProfile: number;
    videoProfile: number;
    clientRole: number;
    uid: number;
    swapWidthAndHeight: boolean;
    channelName: any;
}

export class HomeScreen extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            showLive: false,
            error: '',
            channelProfile: 1,
            videoProfile: 40,
            clientRole: 1,
            uid: configData['uid'],
            swapWidthAndHeight: true,
            channelName: 'channelTest'
        };
    }

    componentDidMount() {

    }

    render() {

        const nameScreen = this.props.common.rootScreen;

        switch (nameScreen) {
            case 'MessagesScreen': {
                return (
                    <MessagesScreen />
                );
            }
            case 'SettingsScreen': {
                return (
                    <SettingsScreen />
                );
            }
            case 'ContactScreen': {
                return (
                    <ContactScreen />
                );
            }
            default: {
                break;
            }
        }

    }

    // joinChannel() {
    //     this.setState({
    //         showLive: true,
    //     });
    // }

    // onCancel(error: any) {
    //     console.log(error);
    //     this.setState({
    //         showLive: false,
    //         error: error ? JSON.stringify(error) : '',
    //     });
    // }

    // render() {

    //     if (this.state.showLive) {
    //         return (
    //             <AgoraRTCView
    //                 channelProfile={this.state.channelProfile}
    //                 channelName={this.state.channelName}
    //                 videoProfile={this.state.videoProfile}
    //                 clientRole={this.state.clientRole}
    //                 uid={this.state.uid}
    //                 onCancel={(err) => this.onCancel(err)}
    //             ></AgoraRTCView>
    //         );
    //     }

    //     return (
    //         <View style={styleSheet.container}>

    //             {this.state.error ? <Text>Error Message: {this.state.error}</Text> : null}

    //             <TextInput
    //                 style={{ height: 40 }}
    //                 keyboardType='numeric'
    //                 placeholder="Enter channelProfile (numeric)"
    //                 onChangeText={(text) => {
    //                     let matched = text.match(/\d+/g) && text.match(/\d+/g)[0]
    //                     if (matched) {
    //                         this.setState({ channelProfile: +matched })
    //                     }
    //                 }
    //                 } 
    //             />

    //             <TextInput
    //                 style={{ height: 40 }}
    //                 keyboardType='numeric'
    //                 placeholder="Enter videoProfile (numeric)"
    //                 onChangeText={(text) => {
    //                     let matched = text.match(/\d+/g) && text.match(/\d+/g)[0]
    //                     if (matched) {
    //                         this.setState({ videoProfile: +matched })
    //                     }
    //                 }
    //                 } 
    //             />

    //             <TextInput
    //                 style={{ height: 40 }}
    //                 keyboardType='numeric'
    //                 placeholder="Enter clientRole (numeric)"
    //                 onChangeText={(text) => {
    //                     let matched = text.match(/\d+/g) && text.match(/\d+/g)[0]
    //                     if (matched) {
    //                         this.setState({ clientRole: +matched })
    //                     }
    //                 }
    //                 } 
    //             />

    //             <TextInput
    //                 style={{ height: 40 }}
    //                 placeholder="Enter channelName"
    //                 onChangeText={
    //                     (text) => {
    //                         this.setState({ channelName: text })
    //                     }
    //                 }
    //             />

    //             <TextInput
    //                 style={{ height: 40 }}
    //                 placeholder="Enter uid"
    //                 onChangeText={
    //                     (uid) => {
    //                         this.setState({ uid: +uid })
    //                     }
    //                 }
    //             />

    //             <TouchableOpacity
    //                 style={styleSheet.button}
    //                 onPress={() => this.joinChannel()}
    //             >
    //                 <Text style={{ color: "#fff" }}>{strings('VIDEO_CALL')}</Text>
    //             </TouchableOpacity>

    //             <TouchableOpacity
    //                 style={styleSheet.button}
    //                 onPress={() => Actions.drawerOpen()}
    //             >
    //                 <Text style={{ color: "#fff" }}>Open Draw</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }

}
