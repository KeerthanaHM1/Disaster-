// client/src/api.js

// Fake API function that returns tips
const tipsData = [
  {
    _id: 1,
    title: "Stay Calm",
    content: "Stay calm and avoid panic during an emergency.",
    disasterType: "General"
  },
  {
    _id: 2,
    title: "Emergency Kit",
    content: "Keep a disaster emergency kit ready at home.",
    disasterType: "Preparedness"
  },
  {
    _id: 3,
    title: "Listen to Authorities",
    content: "Follow evacuation orders and instructions from officials.",
    disasterType: "Evacuation"
  }
];

export const Tips = {
  list: async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(tipsData), 500);
    });
  }
};

// Fake API function that returns alerts
const alertsData = [
  {
    _id: 1,
    message: "Flood warning in your area",
    severity: "High"
  },
  {
    _id: 2,
    message: "Heatwave expected tomorrow",
    severity: "Moderate"
  }
];

export const Alerts = {
  list: async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(alertsData), 500);
    });
  }
};

// 🔹 Fake API function that manages volunteers
const volunteersData = [
  { _id: 1, name: "John Doe", skills: "First Aid" },
  { _id: 2, name: "Jane Smith", skills: "Rescue Operations" }
];

export const Volunteers = {
  list: async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(volunteersData), 500);
    });
  },
  add: async (volunteer) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newVolunteer = { _id: Date.now(), ...volunteer };
        volunteersData.push(newVolunteer);
        resolve(newVolunteer);
      }, 500);
    });
  }
};
// client/src/api.js

// Fake API function that returns emergency contacts
const contactsData = [
  { _id: 1, name: "Police", phone: "100" },
  { _id: 2, name: "Fire Department", phone: "101" },
  { _id: 3, name: "Ambulance", phone: "102" }
];

export const Contacts = {
  list: async () => {
    return new Promise(resolve => {
      setTimeout(() => resolve(contactsData), 500);
    });
  }
};
