import { combineReducers } from 'redux';
import { commonReducer, ICommonState } from './common.reducer';
import { chatReducer, IChatState } from './chat.reducer';

export interface IState {
    common: ICommonState;
    chat: IChatState;
};

export default combineReducers<IState>({
    common: commonReducer,
    chat: chatReducer,
});