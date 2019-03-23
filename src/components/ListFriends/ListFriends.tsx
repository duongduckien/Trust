import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Text, Right, Thumbnail } from 'native-base';

// Languages
import { strings } from '../../utilities/i18n';

// Components

// Styles
// import { styleSheet, styles } from './styles';
import { mainStyles } from '../../styles';

// Config
import config from '../../assets/data/config.json';

interface IProps {

}

interface IState {

}

export class ListFriends extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{ uri: 'Image URL' }} />
                            </Left>
                            <Body>
                                <Text>Kumar Pratik</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }

}