import React, { Component } from 'react';
import FlashMessage from 'react-native-flash-message';
import { Router, Scene, Drawer } from 'react-native-router-flux';

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './src/reducers';
import rootSaga from './src/sagas/rootSaga';

// Screens
import HomeScreen from './src/containers/Home';
import LoginScreen from './src/containers/Login';

// Components
import Loading from './src/components/Loading';
import Statusbar from './src/components/Statusbar';
import AlertDialog from './src/components/AlertDialog';
import SideMenu from './src/components/SideMenu';
import MenuButton from './src/components/MenuButton';

// Config
import config from './src/assets/data/config.json';

// Styles
import { mainStyles } from './src/styles';

// Services
import { APIService } from './src/services/api';
const apiService = new APIService();

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

    async componentDidMount() {
        try {
            await apiService.isLogged();
            this.setState({ logged: true });
        } catch (e) {
            this.setState({ logged: false });
        }
    }

    renderMenuButton() {
        return (
            <MenuButton/>
        );
    };

    render() {
        console.disableYellowBox = true;
        return (
            <Provider store={store}>
                <Loading />

                <Statusbar />

                <Router>
                    <Drawer
                        contentComponent={SideMenu}
                        drawer
                        initial
                        drawerPosition={mainStyles.drawer.position}
                    >
                        <Scene key="root">
                            <Scene
                                key="login"
                                component={LoginScreen}
                                initial={!this.state.logged}
                                hideNavBar={true}
                            />

                            <Scene
                                navigationBarStyle={mainStyles.navigationBar}
                                key="home"
                                component={HomeScreen}
                                title="Home"
                                initial={this.state.logged}
                                hideNavBar={false}
                                renderLeftButton={this.renderMenuButton}
                                titleStyle={mainStyles.titleHeader}
                            />
                        </Scene>
                    </Drawer>
                </Router>

                <FlashMessage
                    position={config['alert']['position']}
                />

                <AlertDialog />
            </Provider >
        );
    }

}
