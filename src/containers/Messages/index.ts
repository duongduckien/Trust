import { MessagesScreen } from './Messages';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonActions from '../../actions/common.action';

const mapStateToProps = (state: any) => {
    return {

    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);