import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles, colors } from '../../styles';

// Services
import apiService from '../../services/api';

interface IProps {
    key: string;
}

interface IState {

}

export class RightButton extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    handleVoiceCall() {
        // console.log('handleVoiceCall');
        // const res = apiService.getUserId();
        // console.log(res);
        apiService.createLastId('users');
    }

    handleVideoCall() {
        console.log('handleVideoCall');
    }

    render() {
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
        )
    }

}
