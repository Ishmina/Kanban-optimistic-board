import { useState } from "react";
import toast from "react-hot-toast";
import Card from "../Card/Card";
import CardForm from "../Card/CardForm";

function Column({ title, cards, onCreate, onDelete, onMove }) {
  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (card) => {
    try {
      await onCreate(title, card);
      setShowForm(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await onDelete(title, cardId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className="font-medium mb-4">{title}</h2>

      <div className="space-y-2 mb-4">
        {cards.length === 0 && (
          <p className="text-sm text-gray-400">No cards</p>
        )}

        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            column={title}
            onDelete={handleDelete}
            onMove={onMove}
          />
        ))}
      </div>

      {showForm ? (
        <CardForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
      ) : (
        <button
          className="text-sm text-blue-600"
          onClick={() => setShowForm(true)}
        >
          + Add card
        </button>
      )}
    </div>
  );
}

export default Column;
