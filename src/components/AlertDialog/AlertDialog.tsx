import React, { Component } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

// Styles
import { styleSheet, styles } from './styles';

interface Props {
    common: any;
    actions: {
        common: any;
    };
}

interface State {

}

export class AlertDialog extends Component<Props, State> {

    constructor(props: any) {
        super(props);
    }

    handleCancel() {
        this.props.actions.common.showAlert(false);
    };

    handleConfirm(type: string) {

        this.props.actions.common.showAlert(false);
        
        switch (type) {
            case 'logout': {
                this.props.actions.common.logOut();
                break;
            }
            default: {
                break;
            }
        }

    }

    render() {
        return (
            <AwesomeAlert
                show={this.props.common.showAlert.show}
                showProgress={this.props.common.showAlert.showProgress}
                title={this.props.common.showAlert.title}
                message={this.props.common.showAlert.message}
                closeOnTouchOutside={this.props.common.showAlert.closeOnTouchOutside}
                closeOnHardwareBackPress={this.props.common.showAlert.closeOnHardwareBackPress}
                showCancelButton={this.props.common.showAlert.showCancelButton}
                showConfirmButton={this.props.common.showAlert.showConfirmButton}
                cancelText={this.props.common.showAlert.cancelText}
                confirmText={this.props.common.showAlert.confirmText}
                confirmButtonColor={styles.btnOk.color}
                onCancelPressed={() => {
                    this.handleCancel();
                }}
                onConfirmPressed={() => {
                    this.handleConfirm(this.props.common.showAlert.type);
                }}
            />
        );
    }

}

