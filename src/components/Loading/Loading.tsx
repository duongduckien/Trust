import React, { Component } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

interface Props {
    common: {
        showLoading: boolean
    }
}

interface State {

}

export class Loading extends Component<Props, State> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <Spinner
                visible={this.props.common.showLoading}
                textStyle={{}}
            />
        );
    }

}

