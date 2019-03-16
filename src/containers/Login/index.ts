import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from './actions';
import { LoginScreen } from './Login';

const mapStateToProps = (state: any) => {
    return {
        login: state.login,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        actions: {
            login: bindActionCreators(loginActions, dispatch),
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);