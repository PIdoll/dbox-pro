import {SET_ROOTDATA, CLEAR_ROOTDATA} from './actionTypes';
export default (state = {}, action) => {
    switch (action.type) {
        case SET_ROOTDATA:
            return Object.assign({}, state, action.data)
        case CLEAR_ROOTDATA:
            return {}
        default:
            return state;
    }
}
