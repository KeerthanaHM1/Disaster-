import React, { useEffect, useState } from "react";
import { getAllContacts, addContact, deleteContact } from "../utils/db";

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState([]);
  const [label, setLabel] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    async function fetchContacts() {
      const allContacts = await getAllContacts();
      setContacts(allContacts);
    }
    fetchContacts();
  }, []);

  const handleAdd = async () => {
    if (!label || !number) {
      alert("Please enter name and phone number");
      return;
    }
    const newContact = {
      id: Date.now().toString(),
      label,
      number,
      city,
    };
    await addContact(newContact);
    setContacts((prev) => [...prev, newContact]);
    setLabel("");
    setNumber("");
    setCity("");
  };

  const handleDelete = async (id) => {
    await deleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
  <div className="bg-white p-6 rounded-2xl shadow max-w-3xl mx-auto">
    <div className="text-xl font-semibold mb-6">Emergency Contacts</div>

    {/* Form */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <input
        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Name"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <input
        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Phone Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <input
        className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="City (optional)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white font-semibold rounded-lg p-3 hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>

    {/* Contact List */}
    {contacts.length === 0 ? (
      <p className="text-gray-500 text-center">No contacts yet.</p>
    ) : (
      <div className="grid gap-4 md:grid-cols-2">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="border rounded-xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition"
          >
            <div>
              <div className="font-medium text-lg">{c.label}</div>
              <div className="text-sm text-gray-700">📞 {c.number}</div>
              {c.city && (
                <div className="text-xs text-gray-500 italic">{c.city}</div>
              )}
            </div>
            <button
              onClick={() => handleDelete(c.id)}
              className="text-red-600 font-bold hover:text-red-800 transition"
              aria-label={`Delete contact ${c.label}`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

}
