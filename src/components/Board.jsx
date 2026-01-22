import { useState } from "react";
import Column from "./Column";
import { initialBoardState } from "../state/boardState";

function Board() {
  const [board, setBoard] = useState(initialBoardState);

  const handleDelete = (cardId) => {
    setBoard((prev) => {
      const newCards = { ...prev.cardsById };
      delete newCards[cardId];

      const newColumns = {};
      for (const col in prev.columns) {
        newColumns[col] = prev.columns[col].filter(
          (id) => id !== cardId
        );
      }

      return {
        cardsById: newCards,
        columns: newColumns,
      };
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Column
        title="Todo"
        cards={board.columns.todo.map(
          (id) => board.cardsById[id]
        )}
        onDelete={handleDelete}
      />
      <Column
        title="Doing"
        cards={board.columns.doing.map(
          (id) => board.cardsById[id]
        )}
        onDelete={handleDelete}
      />
      <Column
        title="Done"
        cards={board.columns.done.map(
          (id) => board.cardsById[id]
        )}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Board;
