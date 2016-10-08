import { createReducer } from './utils';

const initialState = {
    error: '',          // API Errors
};


export default createReducer(initialState, {

    ERROR: (state, payload) =>
        Object.assign({}, state, {
            error: payload.error
        })
        
});
