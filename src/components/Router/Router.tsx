import React, { Component } from 'react';
import { Router, Scene, Drawer } from 'react-native-router-flux';

// Styles
import { mainStyles } from '../../styles';

// Languages
import { strings } from '../../utilities/i18n';

// Screens
import HomeScreen from '../../containers/Home';
import LoginScreen from '../../containers/Login';

// Components
import SideMenu from '../../components/SideMenu';
import MenuButton from '../../components/MenuButton';

// Services
import { APIService } from '../../services/api';
const apiService = new APIService();

interface IProps {
    common: any;
}

interface IState {
    logged: boolean;
}

export class RouterComponent extends Component<IProps, IState> {

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

        const rootScreen = this.props.common.rootScreen;
        let titleScreen = '';

        switch (rootScreen) {
            case 'MessagesScreen': {
                titleScreen = strings('MESSAGES_SCREEN_TITLE');
                break;
            }
            case 'SettingsScreen': {
                titleScreen = strings('SETTINGS_SCREEN_TITLE');
                break;
            }
            default: {
                break;
            }
        }

        return (
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
                            title={titleScreen}
                            initial={this.state.logged}
                            hideNavBar={false}
                            renderLeftButton={this.renderMenuButton}
                            titleStyle={mainStyles.titleHeader}
                        />
                    </Scene>
                </Drawer>
            </Router>
        );
    }

}
