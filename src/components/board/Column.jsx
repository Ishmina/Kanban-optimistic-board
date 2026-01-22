import { Droppable } from "@hello-pangea/dnd";
import Card from "../card/Card";

const columnConfig = {
  Todo: {
    emoji: "📝",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50/80",
    border: "border-violet-200",
    badge: "bg-violet-500",
    dropHighlight: "ring-violet-300",
  },
  Doing: {
    emoji: "⚡",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50/80",
    border: "border-amber-200",
    badge: "bg-amber-500",
    dropHighlight: "ring-amber-300",
  },
  Done: {
    emoji: "🎉",
    gradient: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50/80",
    border: "border-emerald-200",
    badge: "bg-emerald-500",
    dropHighlight: "ring-emerald-300",
  },
};

export default function Column({ title, cards, onDelete, onUpdate }) {
  const config = columnConfig[title];

  return (
    <div
      className={`
        rounded-3xl p-5 
        ${config.bg} backdrop-blur-sm
        border-2 ${config.border}
        shadow-xl shadow-slate-200/50
        transition-all duration-300
        hover:shadow-2xl hover:shadow-slate-300/50
        hover:-translate-y-1
      `}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{config.emoji}</span>
          <h2 className={`font-bold text-lg bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
            {title}
          </h2>
        </div>
        <span
          className={`
            px-3 py-1 rounded-full text-white text-sm font-bold
            ${config.badge} shadow-lg
          `}
        >
          {cards.length}
        </span>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              space-y-3 min-h-[140px] 
              rounded-2xl p-3 -mx-1
              transition-all duration-200
              ${snapshot.isDraggingOver
                ? `bg-white/70 ring-4 ${config.dropHighlight} ring-opacity-50`
                : ""
              }
            `}
          >
            {cards.length === 0 && !snapshot.isDraggingOver ? (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <span className="text-5xl mb-3 opacity-50">
                  {title === "Todo" ? "📋" : title === "Doing" ? "🚀" : "🏆"}
                </span>
                <p className="text-sm font-semibold text-slate-400">No tasks here</p>
                <p className="text-xs text-slate-300 mt-1">Drag cards or create new ones!</p>
              </div>
            ) : (
              cards.map((card, i) => (
                <Card
                  key={card.id}
                  card={card}
                  index={i}
                  columnTitle={title}
                  onDelete={() => onDelete(title, card.id)}
                  onUpdate={(updatedCard) => onUpdate(title, updatedCard)}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
