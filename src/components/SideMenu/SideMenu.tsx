import React, { Component } from 'react';
import { View, StatusBar, Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Button, Thumbnail } from 'native-base';
import { Item, Input } from 'native-base';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Languages
import { strings } from '../../utilities/i18n';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles, colors } from '../../styles';

// Components
import { AvatarDefault } from '../Images/Images';

// Utilities
import { Helper } from '../../utilities/helper';

const helper = new Helper();

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

    changeRootScreen(name: string) {

        Actions.drawerClose();

        switch (name) {
            case 'MessagesScreen': {
                helper.setTitle(strings('MESSAGES_SCREEN_TITLE'));
                break;
            }
            case 'SettingsScreen': {
                helper.setTitle(strings('SETTINGS_SCREEN_TITLE'));
                break;
            }
        }

        this.props.actions.common.changeRootScreen(name);

    }

    render() {
        return (
            <Container style={styleSheet.sideMenu}>
                <View style={styleSheet.avatarView}>
                    <Image 
                        style={styleSheet.avatar} 
                        source={AvatarDefault()}
                    />
                </View>

                <Content style={styleSheet.listMenu}>
                    <List>
                        <ListItem 
                            style={styleSheet.listItem} 
                            onPress={() => this.changeRootScreen('MessagesScreen')}
                        >
                            <Icon
                                name='comments'
                                type='font-awesome'
                                iconStyle={styleSheet.iconList}
                            />
                            <Text style={styleSheet.textList}>{strings('MESSAGES')}</Text>
                        </ListItem>

                        <ListItem
                            style={styleSheet.listItem}
                            onPress={() => this.changeRootScreen('SettingsScreen')}
                        >
                            <Icon
                                name='cogs'
                                type='font-awesome'
                                iconStyle={styleSheet.iconList}
                            />
                            <Text style={styleSheet.textList}>{strings('SETTINGS')}</Text>
                        </ListItem>

                        <ListItem
                            style={styleSheet.listItem}
                            onPress={() => this.logout()}
                        >
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