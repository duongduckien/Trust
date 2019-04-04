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

interface IProps {
    friends: any;
    actions: {
        friends: any;
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

    addFriend(id: number) {
        console.log(id);
    }

    renderListFriends() {
        const listFriends = this.props.friends.listFriends;
        if (listFriends.length > 0) {
            return listFriends.map((item: any, index: number) => {
                return (
                    <View style={styleSheet.listItem} key={index}>
                        <TouchableOpacity onPress={() => this.addFriend(item.userId)}>
                            <View style={styleSheet.listItem}>
                                <View style={styleSheet.itemLeft}>
                                    <Image
                                        style={styleSheet.itemAvatar}
                                        source={(item.picture && item.picture.large) ? {uri: item.picture.large} : AvatarDefault()}
                                    ></Image>
                                </View>

                                <View style={styleSheet.itemCenter}>
                                    <Text style={styleSheet.nameContact}>{item.firstName} {item.lastName}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            });
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
                        />
                    </View>

                    <List>
                        {this.renderListFriends()}
                    </List>
                </Content>
            </Container>
        );
    }

}