import React, { Component } from 'react';
import { Text } from 'react-native';

// Languages
import { strings } from '../../utilities/i18n';

// Components

// Styles
// import { styleSheet, styles } from './styles';
import { mainStyles } from '../../styles';

// Config
import config from '../../assets/data/config.json';

interface IProps {

}

interface IState {

}

export class ChatScreen extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Text>Chat Screen</Text>
        );
    }

}