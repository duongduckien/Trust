import React, { Component } from 'react';
import { Image } from 'react-native';

interface IProps {
    image: any;
    style: any;
}

interface IState {

}

export class Logo extends Component<IProps, IState> {

    constructor(props: any) {
        super(props);        
    }

    render() {
        return (
            <Image
                resizeMode='contain'
                source={this.props.image}
                style={this.props.style}
            />
        )
    }

}
