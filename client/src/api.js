// client/src/api.js
const BASE_URL = "http://localhost:5000";

// -------------------- ALERTS --------------------
export const Alerts = {
  async list() {
    const res = await fetch(`${BASE_URL}/api/alerts`);
    return res.json();
  },

  async create(alert) {
    const res = await fetch(`${BASE_URL}/api/alerts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alert),
    });
    return res.json();
  },

  async remove(id) {
    const res = await fetch(`${BASE_URL}/api/alerts/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};

// -------------------- VOLUNTEERS --------------------
export const Volunteers = {
  async list() {
    const res = await fetch(`${BASE_URL}/api/volunteers`);
    return res.json();
  },

  async create(volunteer) {
    const res = await fetch(`${BASE_URL}/api/volunteers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(volunteer),
    });
    return res.json();
  },

  async remove(id) {
    const res = await fetch(`${BASE_URL}/api/volunteers/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};

// -------------------- TIPS --------------------
export const Tips = {
  async list() {
    const res = await fetch(`${BASE_URL}/api/tips`);
    return res.json();
  },

  async create(tip) {
    const res = await fetch(`${BASE_URL}/api/tips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tip),
    });
    return res.json();
  },

  async remove(id) {
    const res = await fetch(`${BASE_URL}/api/tips/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};

// -------------------- EMERGENCY CONTACTS --------------------
// If you want to serve contacts from backend later, you can do the same.
// For now, keep them static:
const contactsData = [
  { _id: 1, name: "Police", phone: "100" },
  { _id: 2, name: "Fire Department", phone: "101" },
  { _id: 3, name: "Ambulance", phone: "102" },
];

export const Contacts = {
  async list() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(contactsData), 300);
    });
  },
};
