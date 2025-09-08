import { useState } from "react";
import { Volunteers } from "../api.js";

export default function VolunteerForm() {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVolunteer = await Volunteers.add({ name, skills });
    setMessage(`Thanks ${newVolunteer.name}, you’ve been added!`);
    setName("");
    setSkills("");
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
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Your skills"
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
