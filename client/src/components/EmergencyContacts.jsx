import { useEffect, useState } from 'react';
import { Contacts } from '../api.js';

export default function EmergencyContacts() {
  const [list, setList] = useState([]);
  useEffect(() => { Contacts.list().then(setList); }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="text-lg font-semibold mb-2">Emergency Contacts</div>
      <div className="grid md:grid-cols-2 gap-3">
        {list.map(c => (
          <div key={c._id} className="border rounded-xl p-3">
            <div className="font-medium">{c.label}</div>
            <div className="text-sm">📞 {c.number}</div>
            {c.city && <div className="text-xs text-gray-600">{c.city}</div>}
          </div>
        ))}
        {list.length === 0 && <div className="text-gray-500">No contacts yet.</div>}
      </div>
    </div>
  );
}
