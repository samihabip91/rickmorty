import * as constants from '../../utils/constants.js'

export const addCharacters = (characters) => {
    return {
        type: constants.ADDCHARACTERS,
        characters: characters
    }
}

export const createQuery = (filters) => {
    return {
        type: constants.GETCHARACTERSBYQUERY,
        filters: filters
    }
}