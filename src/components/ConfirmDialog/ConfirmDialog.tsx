import React, { Component } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Actions } from 'react-native-router-flux';

// Styles
import { styleSheet, styles } from './styles';

interface Props {
    common: any;
    actions: {
        common: any;
        auth: any;
        friends: any;
    };
}

interface State {

}

export class ConfirmDialog extends Component<Props, State> {

    constructor(props: any) {
        super(props);
    }

    handleCancel() {
        this.props.actions.common.showConfirmDialog(false);
    };

    handleConfirm(type: any) {

        this.props.actions.common.showConfirmDialog(false);
        
        switch (type.name) {
            case 'logout': {
                this.props.actions.auth.logout();
                break;
            }
            case 'addFriend': {
                this.props.actions.friends.addFriend(type.data);
                break;
            }
            default: {
                break;
            }
        }

    }

    render() {

        Actions.drawerClose();

        return (
            <AwesomeAlert
                show={this.props.common.showConfirmDialog.show}
                showProgress={this.props.common.showConfirmDialog.showProgress}
                title={this.props.common.showConfirmDialog.title}
                message={this.props.common.showConfirmDialog.message}
                closeOnTouchOutside={this.props.common.showConfirmDialog.closeOnTouchOutside}
                closeOnHardwareBackPress={this.props.common.showConfirmDialog.closeOnHardwareBackPress}
                showCancelButton={this.props.common.showConfirmDialog.showCancelButton}
                showConfirmButton={this.props.common.showConfirmDialog.showConfirmButton}
                cancelText={this.props.common.showConfirmDialog.cancelText}
                confirmText={this.props.common.showConfirmDialog.confirmText}
                confirmButtonColor={styles.btnOk.color}
                onCancelPressed={() => {
                    this.handleCancel();
                }}
                onConfirmPressed={() => {this.handleConfirm(this.props.common.showConfirmDialog.type)}}
            />
        );

    }

}

