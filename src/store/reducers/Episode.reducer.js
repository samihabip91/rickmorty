import * as constants from '../../utils/constants';

export default function episodeReducer(state = [], action) {
    switch (action.type) {   
        case constants.ADDEPISODES: 
            return [...action.episodes];
        default:
            return state;
    }
}
