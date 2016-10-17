/**
 * Offline data cache
 */
const storage = window.localStorage;

const appKey = 'sparta';

const get = key => storage.getItem(`${appKey}_${key}`);
const set = (key, value) => storage.setItem(`${appKey}_${key}`, value);

export const saveData = (key, value) => set(key, value);

export const getData = (key) => get(key);
