import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Item, Input } from 'native-base';
import { Button } from 'react-native-elements';

// Languages
import { strings } from '../../utilities/i18n';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles, colors } from '../../styles';

interface Props {
    
}

interface State {

}

export class SideMenu extends Component<Props, State> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={styleSheet.sideMenu}>
                <Text>Side Menu</Text>
            </View>
        );
    }

}