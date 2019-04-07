import React, { Component } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

// Styles
import { styleSheet, styles } from './styles';

interface Props {
    common: any;
    actions: {
        common: any;
    }
}

interface State {

}

export class AlertDialog extends Component<Props, State> {

    constructor(props: any) {
        super(props);
    }

    handleConfirm() {
        this.props.actions.common.showAlertDialog(false);
    }

    render() {

        return (
            <AwesomeAlert
                show={this.props.common.showAlertDialog.show}
                showProgress={false}
                title={this.props.common.showAlertDialog.title}
                message={this.props.common.showAlertDialog.message}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText={this.props.common.showAlertDialog.confirmText}
                confirmButtonColor={styles.btnOk.color}
                onConfirmPressed={() => {this.handleConfirm()}}
            />
        );

    }

}

