import React, { Component } from 'react';
import { View } from 'react-native';
import { Item, Input } from 'native-base';
import { Button } from 'react-native-elements';

// Languages
import { strings } from '../../utilities/i18n';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles } from '../../styles';

// Interfaces
import { LoginData } from '../../interfaces/Login';

interface Props {
    loginEmail?: any;
}

interface State {
    email: string,
    password: string
}

export class EmailLogin extends Component<Props, State> {

    public state: LoginData = {
        email: '',
        password: ''
    }

    render() {
        return (
            <View>
                <View>
                    <Item>
                        <Input
                            placeholder={strings('EMAIL_PLACEHOLDER')}
                            style={styleSheet.inputField}
                            onChangeText={value => this.setState({ email: value })}
                            autoCapitalize='none'
                        />
                    </Item>
                    <Item last>
                        <Input
                            placeholder={strings('PASSWORD_PLACEHOLDER')}
                            style={styleSheet.inputField}
                            onChangeText={value => this.setState({ password: value })}
                            secureTextEntry
                            autoCapitalize='none'
                        />
                    </Item>
                </View>

                <Button
                    onPress={() => this.props.loginEmail({ email: this.state.email, password: this.state.password })}
                    large
                    title={strings('BTN_SIGNIN_EMAIL')}
                    color={styles.btnEmail.color}
                    backgroundColor={styles.btnEmail.backgroundColor}
                    borderRadius={mainStyles.btnLogin.borderRadius}
                    fontSize={mainStyles.btnLogin.fontSize}
                    buttonStyle={styleSheet.btnStyleAccess}
                    fontWeight={styles.btnEmail.fontWeight}
                />
            </View>
        );
    }

}