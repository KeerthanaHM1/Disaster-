// src/store.js
let currentUser = null;
let listeners = [];

export const store = {
  getUser() {
    return currentUser;
  },
  setUser(user) {
    currentUser = user;
    listeners.forEach((cb) => cb());
  },
  subscribe(cb) {
    listeners.push(cb);
    return () => {
      listeners = listeners.filter((fn) => fn !== cb);
    };
  },
};
