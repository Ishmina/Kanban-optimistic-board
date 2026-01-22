import { useState } from "react";

function CardForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      id: Date.now(),
      title,
      description,
      priority,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="w-full border rounded px-2 py-1 text-sm"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="w-full border rounded px-2 py-1 text-sm"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="w-full border rounded px-2 py-1 text-sm"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <div className="flex gap-2">
        <button className="text-sm text-blue-600" type="submit">
          Add
        </button>
        <button
          type="button"
          className="text-sm text-gray-500"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CardForm;
