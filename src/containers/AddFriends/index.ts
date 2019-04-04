import { AddFriendsScreen } from './AddFriends';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as friendsActions from '../../actions/friends.action';

const mapStateToProps = (state: any) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            friends: bindActionCreators(friendsActions, dispatch),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendsScreen);