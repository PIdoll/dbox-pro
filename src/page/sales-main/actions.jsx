import {FIRE, FIREABC} from './actionTypes';

export const fireData = (data) => {
    return {
        type: FIRE,
        data: data
    }
};

export const fireABCData = (data) => ({
    type: FIREABC,
    data: data
});
