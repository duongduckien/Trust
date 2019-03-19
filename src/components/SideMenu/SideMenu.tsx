import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Item, Input } from 'native-base';
import { Button } from 'react-native-elements';

// Languages
import { strings } from '../../utilities/i18n';

// Styles
// import { styleSheet, styles } from './styles';
import { mainStyles, colors } from '../../styles';

interface Props {
    style: any;
}

interface State {

}

export class SideMenu extends Component<Props, State> {

    render() {
        return (
            <View style={this.props.style}>
                <Text>Side Menu</Text>
            </View>
        );
    }

}