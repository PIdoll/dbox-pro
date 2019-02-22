import {FIREABC} from '../actionTypes';
export default (state = {}, action) => {
    switch (action.type) {
        case FIREABC:
            return Object.assign({}, state, action.data) // {...state,...action.data}
        default:
            return state;
    }
}
