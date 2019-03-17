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
import HomeScreen from './src/containers/Home';
import LoginScreen from './src/containers/Login';

// Config
import config from './src/assets/data/config.json';

// Create store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

interface IProps {

}

interface IState {
    logged: boolean;
}

export default class App extends Component<IProps, IState> {

    state = {
        logged: false,
    }

    constructor(props: any) {
        super(props);
    }

    static getDerivedStateFromProps() {

    }

    componentDidMount() {

    }

    render() {
        console.disableYellowBox = true;
        return (
            <Provider store={store}>
                <Router>
                    <Scene key="root">
                        <Scene
                            key="login"
                            component={LoginScreen}
                            initial={!this.state.logged}
                            hideNavBar={true}
                        />

                        <Scene
                            key="home"
                            component={HomeScreen}
                            title="Home"
                            initial={this.state.logged}
                            hideNavBar={true}
                        />
                    </Scene>
                </Router>
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
