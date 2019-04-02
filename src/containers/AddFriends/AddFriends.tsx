import React, { Component } from 'react';
import { View, Text } from 'react-native';

interface IProps {

}

interface IState {

}

export class AddFriendsScreen extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {

    }

    render() {
        return (
            <View>
                <Text>Add Friends Screen</Text>
            </View>
        );
    }

}