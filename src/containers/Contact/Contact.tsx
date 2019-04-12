import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Text, Right, Thumbnail, View } from 'native-base';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Languages
import { strings } from '../../utilities/i18n';

// Components
import { AvatarDefault } from '../../components/Images/Images';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles, colors } from '../../styles';

// Config
import config from '../../assets/data/config.json';

// Utilities
import storage from '../../utilities/storage';
import helper from '../../utilities/helper';

// Interfaces
import { ICurrentUser } from '../../interfaces/user.interface';

interface IProps {
    friends: any;
    actions: {
        common: any;
        friends: any;
    }
}

interface IState {
    currentUser: any;
}

export class ContactScreen extends Component<IProps, IState> {

    state = {
        currentUser: {
            $key: '',
            email: '',
            userId: 0,
        }
    }

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        this.getCurrentUser();
    }

    async getCurrentUser() {
        try {
            const userStored = await storage.getItem('user');
            const currentUser: ICurrentUser = JSON.parse(userStored);
            this.setState({ currentUser });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.props.actions.friends.getListFriendsAdded();
    }

    goToChat(id: string) {
        console.log('Chat', id);
        // Actions.chat({ userId: id });
    }

    videoCall(id: string) {
        console.log('Video call', id);
    }

    handlePress(data: any) {
        if (data.accepted === 0) {
            if (data.requestUser === this.state.currentUser.userId) {
                this.props.actions.common.showAlertDialog({
                    show: true,
                    message: strings('WAITTING_ACCEPT'),
                    confirmText: strings('OK'),
                });
            } else {
                this.props.actions.common.showConfirmDialog({
                    type: { name: 'acceptFriend', data },
                    show: true,
                    showProgress: false,
                    title: strings('ACCEPT_FRIEND'),
                    message: strings('CONFIRM_ACCEPT_FRIEND'),
                    closeOnTouchOutside: true,
                    closeOnHardwareBackPress: false,
                    showCancelButton: true,
                    showConfirmButton: true,
                    cancelText: strings('CANCEL'),
                    confirmText: strings('AGREE'),
                });
            }
        } else {
            this.goToChat(data.userData.userId);
        }
    }

    renderRightIcon(data: any) {
        if (data.accepted === 0) {
            if (data.requestUser === this.state.currentUser.userId) {
                return (
                    <View style={styleSheet.itemRight}>
                        <Icon
                            name='share'
                            type='font-awesome'
                            iconStyle={styleSheet.itemIcon}
                        />
                    </View>
                );
            } else {
                return (
                    <View style={styleSheet.itemRight}>
                        <Icon
                            name='reply'
                            type='font-awesome'
                            iconStyle={styleSheet.itemIcon}
                        />
                    </View>
                );
            }
        } else {
            return (
                <View style={styleSheet.itemRight}></View>
            );
        }
    }

    renderListFriendsAdded() {
        const listFriendsAdded = this.props.friends.listFriendsAdded;
        console.log(listFriendsAdded);
        if (listFriendsAdded.length > 0) {
            // listFriendsAdded[0].accepted = 1;
            return listFriendsAdded.map((item: any, index: number) => {
                return (
                    <View
                        style={(item.accepted === 0 && item.requestUser === this.state.currentUser.userId)
                            ? styleSheet.listItemOpc
                            : styleSheet.listItem}
                        key={index}
                    >
                        <TouchableOpacity
                            onPress={() => this.handlePress(item)}>
                            <View style={styleSheet.listItem}>
                                <View style={styleSheet.itemLeft}>
                                    <Image
                                        style={styleSheet.itemAvatar}
                                        source={(item.userData.picture.large && item.userData.picture.large !== '') ? { uri: item.userData.picture.large } : AvatarDefault()}
                                    ></Image>
                                </View>

                                <View style={styleSheet.itemCenter}>
                                    <Text style={styleSheet.nameContact}>
                                        {helper.capitalizeFirstLetter(item.userData.firstName)} {helper.capitalizeFirstLetter(item.userData.lastName)}
                                    </Text>
                                </View>

                                {this.renderRightIcon(item)}
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            });
        } else {
            return (
                <View style={styleSheet.noDataView}>
                    <Text style={styleSheet.noDataViewText}>{strings('NO_DATA_FOUND')}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {this.renderListFriendsAdded()}
                    </List>
                </Content>
            </Container>
        );
    }

}