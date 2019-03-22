import React, { Component } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles, colors } from '../../styles';

interface IProps {

}

interface IState {

}

export class MenuButton extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    handleOpenSideBar() {
        Actions.drawerOpen();
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.handleOpenSideBar()}
            >
                <Icon
                    name='bars'
                    type='font-awesome'
                    iconStyle={styleSheet.icon}
                />
            </TouchableOpacity>
        )
    }

}
