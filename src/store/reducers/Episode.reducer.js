import * as constants from '../../utils/constants';
import * as utils from '../../utils/utils';

export default function episodeReducer(state = [], action) {
    switch (action.type) {   
        case constants.ADDEPISODES: 
            var episodes = [...action.episodes];
            episodes = episodes.map(e => {
                var characters = e.characters.map(c => utils.getIdFromUrl(c));
                e.characters = characters;
                
                return e;
            });

            return episodes;
        default:
            return state;
    }
}
