import { useState } from 'react';

export default function AdminDashboard() {
  const [tab, setTab] = useState('alerts');

  return (
    <div className="bg-white p-4 rounded-2xl shadow space-y-4">
      <div className="flex space-x-3 border-b pb-2">
        <button
          onClick={() => setTab('alerts')}
          className={`px-3 py-1 rounded-lg ${
            tab === 'alerts' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
        >
          Manage Alerts
        </button>
        <button
          onClick={() => setTab('volunteers')}
          className={`px-3 py-1 rounded-lg ${
            tab === 'volunteers' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
        >
          Volunteers
        </button>
        <button
          onClick={() => setTab('tips')}
          className={`px-3 py-1 rounded-lg ${
            tab === 'tips' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
        >
          Safety Tips
        </button>
      </div>

      {tab === 'alerts' && (
        <div>
          <h3 className="font-semibold mb-2">Post a New Alert</h3>
          <form className="space-y-2">
            <input className="w-full border p-2 rounded-lg" placeholder="Title" />
            <textarea className="w-full border p-2 rounded-lg" placeholder="Message"></textarea>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg">Publish</button>
          </form>
        </div>
      )}

      {tab === 'volunteers' && (
        <div>
          <h3 className="font-semibold mb-2">Registered Volunteers</h3>
          <p className="text-gray-600">This will show volunteer data from backend.</p>
        </div>
      )}

      {tab === 'tips' && (
        <div>
          <h3 className="font-semibold mb-2">Add a Safety Tip</h3>
          <form className="space-y-2">
            <input className="w-full border p-2 rounded-lg" placeholder="Title" />
            <textarea className="w-full border p-2 rounded-lg" placeholder="Content"></textarea>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
