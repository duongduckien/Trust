import { AlertDialog } from './AlertDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/auth.action';
import * as commonActions from '../../actions/common.action';
import * as friendsActions from '../../actions/friends.action';

const mapStateToProps = (state: any) => {
    return {
        common: state.common,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            auth: bindActionCreators(authActions, dispatch),
            common: bindActionCreators(commonActions, dispatch),
            friends: bindActionCreators(friendsActions, dispatch),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);