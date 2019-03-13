import React, { PureComponent } from 'react';
import { TouchableOpacity, Image } from 'react-native';

// Styles
import { styleSheet, styles } from './styles';

interface IProps {
    onPress: any;
    source?: any;
    style?: any;
    imgStyle?: any;
}

interface IState {

}

export class OperateButton extends PureComponent<IProps, IState> {

    render() {
        return (
            <TouchableOpacity
                style={this.props.style}
                onPress={() => this.props.onPress()}
                activeOpacity={styles.activeOpacity}
            >
                <Image
                    style={this.props.imgStyle ? this.props.imgStyle : styleSheet.images}
                    source={this.props.source}
                />
            </TouchableOpacity>
        )
    }

}