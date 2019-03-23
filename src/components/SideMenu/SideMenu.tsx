import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
import { Item, Input } from 'native-base';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Services
import { APIService } from '../../services/api';
const apiService = new APIService();

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

    async logout() {
        try {
            await apiService.logout();
            Actions.login();
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