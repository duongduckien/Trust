import React, { Component } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles, colors } from '../../styles';

interface IProps {
    key: string;
}

interface IState {

}

export class BackButton extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    back() {
        Actions.pop();
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.back()}
            >
                <Icon
                    name='angle-left'
                    type='font-awesome'
                    iconStyle={styleSheet.icon}
                />
            </TouchableOpacity>
        )
    }

}
