import React, { Component } from 'react';
import { View, TextInput, Platform, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Item, Input } from 'native-base';
import { Button } from 'react-native-elements';
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

// Config
import config from '../../assets/data/config.json';

// Utilities
import helper from '../../utilities/helper';
import validation from '../../utilities/validation';

interface IProps {
    actions: {
        auth: any;
    }
}

interface IState {

}

export class LoginScreen extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    loginEmail(params: any) {

        if (config['env'] === 'dev') {
            // params.email = 'duongduckien7590@gmail.com',
            // params.password = '@abc@123';
            params.email = 'test1@gmail.com',
            params.password = '123456';
        }

        const rules = validation.loginValidations;
        const emailValidation = validation.validate(rules, 'email', helper.trimStr(params.email));
        const passwordValidation = validation.validate(rules, 'password', helper.trimStr(params.password));

        if (emailValidation.isErr) {
            helper.showAlert('warning', emailValidation.msgErr);
        } else if (passwordValidation.isErr) {
            helper.showAlert('warning', passwordValidation.msgErr);
        } else {
            this.props.actions.auth.login(params);
        }

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