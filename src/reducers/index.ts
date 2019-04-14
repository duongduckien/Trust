import { combineReducers } from 'redux';
import { commonReducer, ICommonState } from './common.reducer';
import { chatReducer, IChatState } from './chat.reducer';
import { friendsReducer, IFriendsState } from './friends.reducer';
import { paramsSceneReducer, IParamsScene } from './paramsScene.reducer';

export interface IState {
    common: ICommonState;
    chat: IChatState;
    friends: IFriendsState;
    paramsScene: IParamsScene;
};

export default combineReducers<IState>({
    common: commonReducer,
    chat: chatReducer,
    friends: friendsReducer,
    paramsScene: paramsSceneReducer,
});