import { DragDropContext } from "@hello-pangea/dnd";
import { useKanban } from "../../hooks/useKanban";
import Column from "./Column";
import TaskCreator from "./TaskCreator";
import toast from "react-hot-toast";

const order = ["Todo", "Doing", "Done"];

export default function Board() {
  const { columns, createCard, updateCard, deleteCard, moveCard } = useKanban();

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const card = columns[source.droppableId][source.index];

    try {
      await moveCard({
        card,
        from: source.droppableId,
        to: destination.droppableId,
      });
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleDelete = async (column, cardId) => {
    try {
      await deleteCard(column, cardId);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleUpdate = async (column, updatedCard) => {
    try {
      await updateCard(column, updatedCard);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-3 mb-3 px-5 py-2 rounded-full bg-white/60 backdrop-blur-sm shadow-lg shadow-purple-200/50 border border-white/50">
          <span className="text-3xl">✨</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Kanban Board
          </h1>
          <span className="text-3xl">📋</span>
        </div>
        <p className="text-slate-500 font-medium mt-2">
          Drag & drop your tasks across columns ✨
        </p>
      </header>

      {/* Task Creator */}
      <TaskCreator onCreate={createCard} />

      {/* Columns Grid */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-8">
          {order.map((col) => (
            <Column
              key={col}
              title={col}
              cards={columns[col]}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Footer */}
      <footer className="mt-14 text-center">
        <p className="text-sm text-slate-400 font-medium">
          💡 Pro tip: Tasks may randomly fail to simulate real API behavior!
        </p>
      </footer>
    </div>
  );
}
