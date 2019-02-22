import {FIRE} from '../actionTypes';
export default (state = {}, action) => {
    switch (action.type) {
        case FIRE:
            return Object.assign({}, state, action.data)
        default:
            return state;
    }
}
