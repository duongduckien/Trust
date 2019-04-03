import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Container, Content } from 'native-base';

// Styles
import { styleSheet, styles } from './styles';
import { mainStyles } from '../../styles';

interface IProps {

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
    }

    componentWillMount() {

    }

    onChangeSearch(val: any) {
        this.setState({
            searchValue: val
        }, () => {
            console.log(this.state.searchValue);
        });
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
                            placeholder="Type Here..."
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