import { 
    UPDATE_PARAMS_CHAT_SCENE,
} from './types';

export const updateParamsChatScene = (data: any) => ({
    type: UPDATE_PARAMS_CHAT_SCENE,
    data,
});
