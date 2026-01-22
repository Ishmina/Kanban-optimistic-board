function Card({ card, column, onDelete }) {
  return (
    <div className="border rounded p-3 bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{card.title}</h3>
          <p className="text-sm text-gray-500">{card.description}</p>
        </div>

        <button
          className="text-xs text-red-500"
          onClick={() => onDelete(card.id)}
        >
          Delete
        </button>
      </div>

      <p className="text-xs mt-2">Priority: {card.priority}</p>
    </div>
  );
}

export default Card;
