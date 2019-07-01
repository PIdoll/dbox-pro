import { FIRE } from './actionTypes';

export const fireData = (data) => {
  return {
    type: FIRE,
    data: data
  };
};
