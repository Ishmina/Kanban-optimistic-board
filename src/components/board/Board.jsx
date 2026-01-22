import { DragDropContext } from "@hello-pangea/dnd";
import { useKanban } from "../../hooks/useKanban";
import Column from "./Column";

const columnsOrder = ["Todo", "Doing", "Done"];

function Board() {
  const { columns, moveCard } = useKanban();

  const handleDragEnd = async (result) => {
    const { source, destination } = result;

    // dropped outside any column
    if (!destination) return;

    // dropped in same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const fromColumn = source.droppableId;
    const toColumn = destination.droppableId;

    const card = columns[fromColumn][source.index];

    try {
      await moveCard({
        card,
        from: fromColumn,
        to: toColumn,
      });
    } catch (error) {
      // error toast already handled in Column
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6">Kanban Board</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columnsOrder.map((column) => (
            <Column
              key={column}
              title={column}
              cards={columns[column]}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;
