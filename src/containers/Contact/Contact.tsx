import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Text, Right, Thumbnail, View } from 'native-base';
import { Icon } from 'react-native-elements';

// Languages
import { strings } from '../../utilities/i18n';

// Components
import { AvatarDemo1, AvatarDemo2, AvatarDemo3 } from '../../components/Images/Images';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles, colors } from '../../styles';

// Config
import config from '../../assets/data/config.json';

interface IProps {

}

interface IState {

}

export class ContactScreen extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    goToChat(id: string) {
        console.log('Chat', id);
    }

    videoCall(id: string) {
        console.log('Video call', id);
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <View style={styleSheet.listItem}>
                            <TouchableOpacity onPress={() => this.goToChat('12')}>
                                <View style={styleSheet.listItem}>
                                    <View style={styleSheet.itemLeft}>
                                        <Image style={styleSheet.itemAvatar} source={AvatarDemo1()}></Image>
                                    </View>

                                    <View style={styleSheet.itemCenter}>
                                        <Text style={styleSheet.nameContact}>John Stone</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.videoCall('12')}>
                                <View style={styleSheet.itemRight}>
                                    <Icon
                                        name='video-camera'
                                        type='font-awesome'
                                        iconStyle={styleSheet.itemIcon}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styleSheet.listItem}>
                            <View style={styleSheet.itemLeft}>
                                <Image style={styleSheet.itemAvatar} source={AvatarDemo2()}></Image>
                            </View>

                            <View style={styleSheet.itemCenter}>
                                <Text style={styleSheet.nameContact}>Jessica May</Text>
                                <Text note style={styleSheet.statusText}>Doing what you like will always keep you happy . .</Text>
                            </View>

                            <View style={styleSheet.itemRight}>
                                <Icon
                                    name='video-camera'
                                    type='font-awesome'
                                    iconStyle={styleSheet.itemIcon}
                                />
                            </View>
                        </View>

                        <View style={styleSheet.listItem}>
                            <View style={styleSheet.itemLeft}>
                                <Image style={styleSheet.itemAvatar} source={AvatarDemo3()}></Image>
                            </View>

                            <View style={styleSheet.itemCenter}>
                                <Text style={styleSheet.nameContact}>Rebecca Lee</Text>
                                <Text note style={styleSheet.statusText}>Doing what you like will always keep you happy . .</Text>
                            </View>

                            <View style={styleSheet.itemRight}>
                                <Icon
                                    name='video-camera'
                                    type='font-awesome'
                                    iconStyle={styleSheet.itemIcon}
                                />
                            </View>
                        </View>
                    </List>
                </Content>
            </Container>
        );
    }

}