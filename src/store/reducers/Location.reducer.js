import * as constants from '../../utils/constants';

export default function locationReducer(state = [], action) {
    switch (action.type) {   
        case constants.ADDLOCATIONS: 
            return [...action.locations];
        default:
            return state;
    }
}
