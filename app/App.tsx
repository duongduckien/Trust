import React, { Component } from 'react';
import FlashMessage from 'react-native-flash-message';
import { Router, Scene, Drawer } from 'react-native-router-flux';

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../src/reducers';
import rootSaga from '../src/sagas/rootSaga';

// Languages
import { strings } from '../src/utilities/i18n';

// Screens
import HomeScreen from '../src/containers/Home';
import LoginScreen from '../src/containers/Login';
import ChatScreen from '../src/containers/Chat';
import AddFriendsScreen from '../src/containers/AddFriends';

// Components
import Loading from '../src/components/Loading';
import Statusbar from '../src/components/Statusbar';
import ConfirmDialog from '../src/components/ConfirmDialog';
import AlertDialog from '../src/components/AlertDialog';
import SideMenu from '../src/components/SideMenu';
import MenuButton from '../src/components/MenuButton';
import BackButton from '../src/components/BackButton';
import RightButton from '../src/components/RightButton';

// Config
import config from '../src/assets/data/config.json';

// Styles
import { mainStyles } from '../src/styles';

// Services
import authService from '../src/services/auth.service';
import firebaseSDKService from '../src/services/firebaseSDK.service';

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
        this.isLogged();
    }

    async isLogged() {
        try {
            await authService.isLogged();
            this.setState({ logged: true });
        } catch (e) {
            this.setState({ logged: false });
        }
    }

    componentDidMount() {
        this.checkPermission();
    }

    async checkPermission() {
        try {
            const enabled = await firebaseSDKService.getPermissionMessage();
            if (enabled) {
                await firebaseSDKService.getTokenMessage();
            } else {
                await firebaseSDKService.requestMessagePermission();
            }
        } catch (e) {
            console.log(e);
        }        
    }

    renderMenuButton(key: string) {
        return (
            <MenuButton key={key} />
        );
    };

    renderBackButton(key: string) {
        return (
            <BackButton key={key} />
        );
    };

    renderRightButton(key: string) {
        return (
            <RightButton key={key} />
        );
    }

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
                                title={strings('MESSAGES_SCREEN_TITLE')}
                                initial={this.state.logged}
                                hideNavBar={false}
                                renderLeftButton={() => this.renderMenuButton('home')}
                                renderRightButton={() => this.renderRightButton('home')}
                                titleStyle={mainStyles.titleHeader}
                            />
                        </Scene>

                        <Scene
                            navigationBarStyle={mainStyles.navigationBar}
                            key="chat"
                            component={ChatScreen}
                            hideNavBar={false}
                            renderLeftButton={() => this.renderBackButton('chat')}
                            titleStyle={mainStyles.titleHeader}
                        />

                        <Scene
                            navigationBarStyle={mainStyles.navigationBar}
                            key="addFriends"
                            component={AddFriendsScreen}
                            hideNavBar={false}
                            renderLeftButton={() => this.renderBackButton('addFriends')}
                            titleStyle={mainStyles.titleHeader}
                        />
                    </Drawer>
                </Router>

                <FlashMessage
                    position={config['alert']['position']}
                />

                <ConfirmDialog />

                <AlertDialog />
            </Provider >
        );
    }

}
