import * as types from '../actions/types';

export interface IParamsScene {
    chat: {
        guestId: any;
    };
}

export const PARAMS_SCENE_INITAL_STATE: IParamsScene = {
    chat: {
        guestId: null,
    },
};

export function paramsSceneReducer(state = PARAMS_SCENE_INITAL_STATE, action: any): IParamsScene {
    switch (action.type) {
        case types.UPDATE_PARAMS_CHAT_SCENE: {
            return { ...state, ...{ chat: action.data } };
        }
        default: {
            return state;
        }   
    }
}
