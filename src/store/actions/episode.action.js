import * as constants from '../../utils/constants.js'

export const addEpisodes = (episodes) => {
    return {
        type: constants.ADDEPISODES,
        episodes: episodes
    }
}