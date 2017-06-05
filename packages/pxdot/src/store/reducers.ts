import { createReducer } from './utils';

const initialState = {
    color: 'rgba(0,0,0,1)',
    error: '',
    canvasDataURL: ''
};

export default createReducer(initialState, {
    CANVAS_DATAURL: (state, payload) => Object.assign({}, state, {
        canvasDataURL: payload.canvasDataURL
    }),
    COLOR_SET: (state, payload) => Object.assign({}, state, {
        color: payload.color
    }),
    ERROR: (state, payload) =>
        Object.assign({}, state, {
            error: payload.error
        })
        
});
