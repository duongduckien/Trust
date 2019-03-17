import React, { Component } from 'react';
import { View, TextInput, Platform, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Item, Input } from 'native-base';
import { Button } from 'react-native-elements';
import Config from 'react-native-config';
import { Actions } from 'react-native-router-flux';

// Languages
import { strings } from '../../utilities/i18n';

// Components
import Logo from '../../components/Logo';
import EmailLogin from '../../components/EmailLogin';
import { LogoImage } from '../../components/Images/Images';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles } from '../../styles';

// Utilities
import { Helper } from '../../utilities/helper';

const helper = new Helper();

interface IProps {
    actions: {
        login: any
    }
}

interface IState {

}

export class LoginScreen extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    loginEmail(params: any) {
        console.log(params);
    }

    render() {
        return (
            <Container>
                <View style={styleSheet.loginView}>
                    <View style={styleSheet.logoView}>
                        <Logo
                            image={LogoImage()}
                            style={styleSheet.logo}
                        />
                    </View>

                    <View style={styleSheet.form}>
                        <EmailLogin
                            loginEmail={this.loginEmail.bind(this)}
                        />
                    </View>
                </View>
            </Container>
        );
    }

}