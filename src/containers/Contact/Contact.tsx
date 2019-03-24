import React, { Component } from 'react';

// Languages
import { strings } from '../../utilities/i18n';

// Components
import ListFriends from '../../components/ListFriends';

// Styles
// import { styleSheet, styles } from './styles';
import { mainStyles } from '../../styles';

// Config
import config from '../../assets/data/config.json';

interface IProps {

}

interface IState {

}

export class ContactScreen extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <ListFriends />
        );
    }

}