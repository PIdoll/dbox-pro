import {SET_ROOTDATA, CLEAR_ROOTDATA} from './rootDataActionTypes';

export const setRootData = (data) => ({
    type: SET_ROOTDATA,
    data: data
});

export const clearRootData = () => ({
    type: CLEAR_ROOTDATA
});
