export const store = {
  user: null,
  setUser(u) { this.user = u; window.dispatchEvent(new Event('store:update')); },
};
