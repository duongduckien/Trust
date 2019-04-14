import { ContactScreen } from './Contact';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonActions from '../../actions/common.action';
import * as friendsActions from '../../actions/friends.action';
import * as paramsSceneActions from '../../actions/paramsScene.action';

const mapStateToProps = (state: any) => {
    return {
        friends: state.friends,
        paramsScene: state.paramsScene,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            common: bindActionCreators(commonActions, dispatch),
            friends: bindActionCreators(friendsActions, dispatch),
            paramsScene: bindActionCreators(paramsSceneActions, dispatch),
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen);