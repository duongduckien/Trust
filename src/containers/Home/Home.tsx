import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native';
import Config from 'react-native-config';

export class HomeScreen extends Component<{}, {}> {

    componentDidMount() {
        console.log('componentDidMount');
    }

    render() {

        return (
            <View>
                <Text>Home</Text>
            </View>
        );
        
    }

}