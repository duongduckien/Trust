import { AddFriendsScreen } from './AddFriends';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as friendsActions from '../../actions/friends.action';
import * as commonActions from '../../actions/common.action';

const mapStateToProps = (state: any) => {
    return {
        friends: state.friends,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            friends: bindActionCreators(friendsActions, dispatch),
            common: bindActionCreators(commonActions, dispatch),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendsScreen);