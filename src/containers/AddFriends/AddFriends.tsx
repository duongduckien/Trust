import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { Container, Content, List } from 'native-base';
import _ from 'lodash';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles } from '../../styles';

// Components
import { AvatarDefault } from '../../components/Images/Images';

// Languages
import { strings } from '../../utilities/i18n';

// Utilities
import helper from '../../utilities/helper';

// Services
import testService from '../../services/test.service';

interface IProps {
    friends: any;
    actions: {
        friends: any;
        common: any;
    }
}

interface IState {
    searchValue: string;
}

export class AddFriendsScreen extends Component<IProps, IState> {

    state = {
        searchValue: '',
    }

    constructor(props: any) {
        super(props);
        this.onChangeTextDelay = _.debounce(this.onChangeTextDelay, 2000);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    onChangeSearch(val: any) {
        this.setState({
            searchValue: val
        }, () => {
            this.onChangeTextDelay(this.state.searchValue);
        });
    }

    onChangeTextDelay(text: string) {
        this.props.actions.friends.searchFriends(text);
    }

    onClearText() {
        this.props.actions.friends.clearSearchFriends();
    }

    addFriend(id: number, key: string) {
        this.props.actions.common.showConfirmDialog({
            type: { name: 'addFriend', data: { id, key } },
            data: id,
            show: true,
            showProgress: false,
            title: strings('ADD_FRIEND'),
            message: strings('CONFIRM_ADD_FRIEND'),
            closeOnTouchOutside: true,
            closeOnHardwareBackPress: false,
            showCancelButton: true,
            showConfirmButton: true,
            cancelText: strings('CANCEL'),
            confirmText: strings('AGREE'),
        });
    }

    renderListFriends() {
        const listFriends = this.props.friends.listFriends;
        if (listFriends.length > 0) {
            return (
                <List>
                    {
                        listFriends.map((item: any, index: number) => {
                            return (
                                <View style={styleSheet.listItem} key={index}>
                                    <TouchableOpacity onPress={() => this.addFriend(item.userId, item.$key)}>
                                        <View style={styleSheet.listItem}>
                                            <View style={styleSheet.itemLeft}>
                                                <Image
                                                    style={styleSheet.itemAvatar}
                                                    source={(item.picture && item.picture.large) ? { uri: item.picture.large } : AvatarDefault()}
                                                ></Image>
                                            </View>

                                            <View style={styleSheet.itemCenter}>
                                                <Text style={styleSheet.nameContact}>
                                                    {helper.capitalizeFirstLetter(item.firstName)} {helper.capitalizeFirstLetter(item.lastName)}
                                                </Text>
                                            </View>

                                            <View style={styleSheet.itemRight}>
                                                <Icon
                                                    name='plus'
                                                    type='font-awesome'
                                                    iconStyle={styleSheet.itemIcon}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </List>
            );
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
                    <View style={styleSheet.searchContent}>
                        <SearchBar
                            placeholder={strings('PLACEHOLDER_TYPE_SEARCH')}
                            onChangeText={(val) => this.onChangeSearch(val)}
                            value={this.state.searchValue}
                            clearIcon={styles.clearIcon}
                            onClearText={() => this.onClearText()}
                            autoCapitalize='none'
                            inputStyle={styleSheet.inputText}
                        />
                    </View>

                    {this.renderListFriends()}
                </Content>
            </Container>
        );
    }

    componentWillUnmount() {
        this.props.actions.friends.clearSearchFriends();
    }

}