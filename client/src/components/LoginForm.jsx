import { useState } from 'react';
import { store } from '../store.js';

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    if (form.username === 'admin' && form.password === 'admin123') {
      store.setUser({ username: 'admin' });
      setError('');
      alert('✅ Logged in as admin');
    } else {
      setError('Invalid credentials');
    }
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded-2xl shadow space-y-3">
      <div className="text-lg font-semibold">Admin Login</div>
      <input
        type="text"
        className="w-full border rounded-xl p-2"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        type="password"
        className="w-full border rounded-xl p-2"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded-xl">Login</button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
}
