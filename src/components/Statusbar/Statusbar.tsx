import React, { Component } from 'react';
import { StatusBar } from 'react-native';

interface IProps {

}

interface IState {

}

export class Statusbar extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <StatusBar 
                barStyle="light-content" 
            />
        )
    }

}
