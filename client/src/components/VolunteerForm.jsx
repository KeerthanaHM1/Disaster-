import { useState } from "react";

export default function VolunteerForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, contact, email }),
      });

      if (!res.ok) throw new Error("Failed to add volunteer");

      const newVolunteer = await res.json();
      setMessage(`Thanks ${newVolunteer.name}, you’ve been added!`);
      setName("");
      setRole("");
      setContact("");
      setEmail("");
    } catch (err) {
      setMessage("Failed to add volunteer. Try again!");
      console.error(err);
    }
  };

  return (
    <div className="p-4 rounded-xl shadow bg-gray-100 space-y-3">
      <h2 className="text-lg font-semibold">Volunteer Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Your role (e.g., Medical, Rescue)"
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="tel"
          value={contact}
          onChange={(e) => setContact(e.target.value.replace(/\D/g, ""))}
          placeholder="Your contact number"
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="w-full p-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
}
