function Card({ title, description, priority, onDelete }) {
  const priorityColor =
    priority === "high"
      ? "bg-red-100 text-red-700"
      : priority === "medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <div className="bg-white border rounded-lg p-3 mb-3 shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded ${priorityColor}`}>
            {priority}
          </span>
          <button
            onClick={onDelete}
            className="text-xs text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-2">
        {description}
      </p>
    </div>
  );
}

export default Card;
