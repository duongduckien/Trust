import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/auth.action';
import { LoginScreen } from './Login';

const mapStateToProps = (state: any) => {
    return {

    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            auth: bindActionCreators(authActions, dispatch),
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);