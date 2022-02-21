import * as constants from '../../utils/constants';

export function createReducer(state = [], action) {
    switch (action.type) {   
        case constants.ADDFIELD: 
            var newState = {...state};
            newState[action.field] = action.value;
            return newState;
        default:
            return state;
    }
}


export const initialState = {
    "name": "",
    "location.name": "",
    "status": ""
};