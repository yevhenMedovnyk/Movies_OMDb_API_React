export const getLocalStorage = (key) => {
  const data = window.localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

export const setLocalStorage = (key, data) => {
  if (data) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
};
