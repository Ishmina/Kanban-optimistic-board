import { useKanban } from "../../hooks/useKanban";
import Column from "./Column";

const columnsOrder = ["Todo", "Doing", "Done"];

function Board() {
  const { columns, createCard, deleteCard, moveCard } = useKanban();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6">Kanban Board</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columnsOrder.map((column) => (
          <Column
            key={column}
            title={column}
            cards={columns[column]}
            onCreate={createCard}
            onDelete={deleteCard}
            onMove={moveCard}
          />
        ))}
      </div>
    </div>
  );
}

export default Board;
