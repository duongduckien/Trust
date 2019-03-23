import React, { Component } from 'react';
import FlashMessage from 'react-native-flash-message';

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './src/reducers';
import rootSaga from './src/sagas/rootSaga';

// Components
import Loading from './src/components/Loading';
import Statusbar from './src/components/Statusbar';
import AlertDialog from './src/components/AlertDialog';
import RouterComponent from './src/components/Router';

// Config
import config from './src/assets/data/config.json';

// Create store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default class App extends Component<{}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        console.disableYellowBox = true;
        return (
            <Provider store={store}>
                <Loading />

                <Statusbar />

                <RouterComponent />

                <FlashMessage
                    position={config['alert']['position']}
                />

                <AlertDialog />
            </Provider >
        );
    }

}
