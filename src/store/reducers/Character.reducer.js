import * as constants from '../../utils/constants';
import * as characterService from '../../services/Charachter.service.js';

export default function characterReducer(state = [], action) {
    switch (action.type) {   
        case constants.ADDCHARACTERS: 
            return [...state, ...action.characters];
        case constants.GETCHARACTERSBYQUERY:
            return characterService.getCharactersByQuery([...state], action.query);
        default:
            return state;
    }
}
