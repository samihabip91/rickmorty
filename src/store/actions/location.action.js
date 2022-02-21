import * as constants from '../../utils/constants.js'

export const addLocations = (locations) => {
    return {
        type: constants.ADDLOCATIONS,
        locations: locations
    }
}