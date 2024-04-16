import {dbConnection} from './mongoConnection.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export const users = getCollectionFn('users');
export const entries = getCollectionFn('entries');

export const activities = getCollectionFn('activities');
export const emotions = getCollectionFn('emotions');
export const energies = getCollectionFn('energies');
export const socials = getCollectionFn('socials');



