import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index.js';

export default function configureStore(initialState) {
    var config = createStore(rootReducer, initialState, composeWithDevTools());
    
    return config;
}