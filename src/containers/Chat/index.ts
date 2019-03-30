import { ChatScreen } from './Chat';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonActions from '../../actions/common.action';

const mapStateToProps = (state: any) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            common: bindActionCreators(commonActions, dispatch),
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);