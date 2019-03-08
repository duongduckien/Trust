import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import FlashMessage from 'react-native-flash-message';

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './src/reducers';
import rootSaga from './src/sagas/rootSaga';

// Screens
import LoginScreen from './src/containers/Login/Login';
import { HomeScreen } from './src/containers/Home/Home';
import RegisterScreen from './src/containers/Register';

// Components
import Loading from './src/components/Loading';

// Utilities
import { Storage } from './src/utilities/storage';

// Config
import config from './src/assets/data/config.json';

// Languages
import { strings } from './src/utilities/i18n';

const storage = new Storage();

// Create store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

interface Props {

}

interface State {
    logged: boolean;
}

export default class App extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            logged: false,
        };
        this.checkAuth();
        // this.logout();
    }

    static getDerivedStateFromProps() {

    }

    logout() {   
        storage.clearToken();
    }

    async checkAuth() {

        const token = await storage.getToken();
        if (token) {
            this.setState({
                logged: true,
            });
        }

    }

    componentDidMount() {

    }

    render() {
        console.disableYellowBox = true;
        return (
            <Provider store={store}>
                <Loading />

                <Router>
                    <Scene key="root">
                        <Scene
                            key="home"
                            component={HomeScreen}
                            title="Home"
                            initial={this.state.logged}
                            hideNavBar={true}
                        />

                        <Scene
                            key="login"
                            component={LoginScreen}
                            initial={!this.state.logged}
                            hideNavBar={true}
                        />

                        <Scene
                            key="register"
                            component={RegisterScreen}
                            title={strings('REGISTER')}
                            hideNavBar={false}
                        />
                    </Scene>
                </Router>

                <FlashMessage 
                    position={config['alert']['position']}
                />
            </Provider>
        );
    }

    shouldComponentUpdate() {
        return true;
    }

    getSnapshotBeforeUpdate() {

    }

    componentDidUpdate() {

    }

    componentWillUnmount() {

    }

    componentDidCatch() {

    }

}
