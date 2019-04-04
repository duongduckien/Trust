import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Container, Content } from 'native-base';
import _ from 'lodash';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles } from '../../styles';

// Languages
import { strings } from '../../utilities/i18n';

interface IProps {
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
        console.log('onClearText');
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
                        />
                    </View>
                </Content>
            </Container>
        );
    }

}