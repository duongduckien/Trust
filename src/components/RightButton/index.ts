import { RightButton } from './RightButton';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commonActions from '../../actions/common.action';

const mapStateToProps = (state: any) => {
    return {
        common: state.common,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightButton);