import { useEffect, useState } from 'react';
import { Tips } from '../api.js';

export default function TipsGrid() {
  const [tips, setTips] = useState([]);
  useEffect(() => { Tips.list().then(setTips); }, []);

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="text-lg font-semibold mb-2">Safety Tips</div>
      <div className="grid md:grid-cols-2 gap-3">
        {tips.map(t => (
          <div key={t._id} className="border rounded-xl p-3">
            <div className="font-medium">{t.title}</div>
            <div className="text-sm text-gray-700 whitespace-pre-wrap">{t.content}</div>
            <div className="text-xs text-gray-500 mt-1">Type: {t.disasterType}</div>
          </div>
        ))}
        {tips.length === 0 && <div className="text-gray-500">No tips yet.</div>}
      </div>
    </div>
  );
}
