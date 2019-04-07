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

interface IProps {
    friends: any;
    actions: {
        common: any;
        friends: any;
    }
}

interface IState {

}

export class ContactScreen extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
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

    renderListFriendsAdded() {
        const listFriendsAdded = this.props.friends.listFriendsAdded;
        if (listFriendsAdded.length > 0) {
            console.log(listFriendsAdded);
            listFriendsAdded[0].accepted = 1;
            return listFriendsAdded.map((item: any, index: number) => {
                return (
                    <View
                        style={item.accepted === 0 ? styleSheet.listItemOpc : styleSheet.listItem}
                        key={index}
                    >
                        <TouchableOpacity
                            disabled={item.accepted === 0 ? true : false}
                            onPress={() => this.goToChat(item.userData.userId)}>
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

                                {item.accepted === 0 ?
                                    <View style={styleSheet.itemRight}>
                                        <Icon
                                            name='share'
                                            type='font-awesome'
                                            iconStyle={styleSheet.itemIcon}
                                        />
                                    </View> : <View style={styleSheet.itemRight}></View>}
                            </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={() => this.videoCall(item.userData.userId)}>
                            <View style={styleSheet.itemRight}>
                                <Icon
                                    name='video-camera'
                                    type='font-awesome'
                                    iconStyle={styleSheet.itemIcon}
                                />
                            </View>
                        </TouchableOpacity> */}
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