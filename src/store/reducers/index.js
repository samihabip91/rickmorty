import { combineReducers } from "redux";

import locations from './Location.reducer.js';
import episodes from './Episode.reducer.js';
import characters from './Character.reducer.js';

const rootReducer = combineReducers({
    locations: locations,
    episodes: episodes,
    characters: characters
});

export default rootReducer;