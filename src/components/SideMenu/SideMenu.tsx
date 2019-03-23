import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
import { Item, Input } from 'native-base';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Languages
import { strings } from '../../utilities/i18n';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles, colors } from '../../styles';

interface Props {
    common: any;
    actions: {
        common: any;
    };
}

interface State {

}

export class SideMenu extends Component<Props, State> {

    constructor(props: any) {
        super(props);
    }

    logout() {

        try {

            this.props.actions.common.showAlert({
                type: 'logout',
                show: true,
                showProgress: false,
                title: strings('LOGOUT'),
                message: strings('CONFIRM_LOGOUT'),
                closeOnTouchOutside: true,
                closeOnHardwareBackPress: false,
                showCancelButton: true,
                showConfirmButton: true,
                cancelText: strings('CANCEL'),
                confirmText: strings('AGREE'),
            });

        } catch (e) {
            console.log(e);
        }

    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                            <Icon
                                name='cogs'
                                type='font-awesome'
                                iconStyle={styleSheet.iconList}
                            />
                            <Text style={styleSheet.textList}>{strings('SETTINGS')}</Text>
                        </ListItem>

                        <ListItem onPress={() => this.logout()}>
                            <Icon
                                name='sign-out'
                                type='font-awesome'
                                iconStyle={styleSheet.iconList}
                            />
                            <Text style={styleSheet.textList}>{strings('LOGOUT')}</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }

}