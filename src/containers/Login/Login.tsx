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

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles } from '../../styles';

// Utilities
import { Helper } from '../../utilities/helper';
import { Validation } from '../../utilities/validation';

// Redux
import * as loginActions from './actions';
import { LoginState } from './reducer';

const helper = new Helper();
const validation = new Validation();

interface Props {
    actions: {
        login: any
    }
}

class LoginScreen extends Component<Props> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.configGoogle();
    }

    async configGoogle() {

        try {

            if (helper.isIos()) {

                await GoogleSignin.hasPlayServices();
                await GoogleSignin.configure({
                    webClientId: Config.GOOGLE_WEB_CLIENT_ID,
                    offlineAccess: Config.GOOGLE_OFFLINE_ACCESS
                });

            } else {

                await GoogleSignin.hasPlayServices();
                await GoogleSignin.configure({
                    scopes: ['profile'],
                    webClientId: Config.GOOGLE_WEB_CLIENT_ID,
                    offlineAccess: true
                });

            }

        } catch (err) {
            console.log(err);
            helper.showAlert('error', strings('LOGIN_FAILED'));
        }

    }

    async signInFacebook() {

        try {

            const result = await LoginManager.logInWithReadPermissions(['public_profile']);

            if (result.isCancelled) {
                helper.showAlert('error', strings('LOGIN_FAILED'));
            } else {

                const tokenData: any = await AccessToken.getCurrentAccessToken();
                const accessToken = tokenData.accessToken.toString();
                console.log(accessToken);
                this.props.actions.login.loginFacebook(accessToken);

            }

        } catch (e) {
            console.log(e);
            helper.showAlert('error', strings('LOGIN_FAILED'));
        }

    }

    async signInGoogle() {

        try {

            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.props.actions.login.loginGoogle(userInfo, this.onSuccess, this.onError);

        } catch (err) {
            console.log(err);
            helper.showAlert('error', strings('LOGIN_FAILED'));
        }

    }

    signInLinkedIn(token: any) {
        console.log(token);
        const accessToken = token.access_token;
        this.props.actions.login.loginLinkedIn(accessToken);
    }

    onSuccess(data: any) {
        console.log(data);
    }

    onError(err: any) {
        console.log(err);
        helper.showAlert('error', strings('LOGIN_FAILED'));
    }

    loginEmail(params: any) {

        // params.email = 'ddk0705@gmail.com';
        // params.password = 'Duongkien7590';

        const rules = validation.loginValidations;
        const emailValidation = validation.validate(rules, 'email', helper.trimStr(params.email));
        const passwordValidation = validation.validate(rules, 'password', helper.trimStr(params.password));

        if (emailValidation.isErr) {
            helper.showAlert('warning', emailValidation.msgErr);
        } else if (passwordValidation.isErr) {
            helper.showAlert('warning', passwordValidation.msgErr);
        } else {
            this.props.actions.login.login({ email: params.email, password: params.password }, this.onSuccess, this.onError);
        }

    }

    redirectToRegister() {
        Actions.register();
    }

    render() {
        return (
            <Container>
                <View style={styleSheet.loginView}>
                    <Logo
                        image={require('../../assets/images/opportumeety_logo.png')}
                        style={styleSheet.logo}
                    />
                    <Content>
                        <EmailLogin
                            loginEmail={this.loginEmail.bind(this)}
                        />

                        <View style={styleSheet.orContent}>
                            <View style={styleSheet.orContentStraight} />
                            <View style={styleSheet.orContentMid}>
                                <Text style={styleSheet.orContentText}>OR</Text>
                            </View>
                            <View style={styleSheet.orContentStraight} />
                        </View>

                        <FacebookLogin
                            signInFacebook={this.signInFacebook.bind(this)}
                        />

                        <GoogleLogin
                            signInGoogle={this.signInGoogle.bind(this)}
                        />

                        <LinkedInLogin
                            signInLinkedIn={this.signInLinkedIn.bind(this)}
                        />

                        <View style={styleSheet.signInContent}>
                            <View>
                                <Text style={styleSheet.dontHaveAccount}>
                                    {strings('DONT_HAVE_ACCOUNT')}
                                </Text>
                            </View>

                            <View>
                                <TouchableOpacity onPress={() => this.redirectToRegister()}>
                                    <Text style={styleSheet.registerTxt}>
                                        {strings('REGISTER_NOW')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Content>
                </View>
            </Container>
        );
    }

}