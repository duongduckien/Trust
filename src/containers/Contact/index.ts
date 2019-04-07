import { ContactScreen } from './Contact';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonActions from '../../actions/common.action';
import * as friendsActions from '../../actions/friends.action';

const mapStateToProps = (state: any) => {
    return {
        friends: state.friends,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            common: bindActionCreators(commonActions, dispatch),
            friends: bindActionCreators(friendsActions, dispatch),
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);