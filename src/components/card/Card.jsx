import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

const priorityConfig = {
  Low: {
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    emoji: "🟢",
    border: "border-emerald-200",
  },
  Medium: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    emoji: "🟡",
    border: "border-amber-200",
  },
  High: {
    bg: "bg-rose-100",
    text: "text-rose-600",
    emoji: "🔴",
    border: "border-rose-200",
  },
};

export default function Card({ card, index, columnTitle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: card.title,
    description: card.description,
    priority: card.priority,
  });

  const priority = priorityConfig[card.priority];

  const handleSave = () => {
    if (!editData.title.trim()) return;
    onUpdate({
      ...card,
      ...editData,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      title: card.title,
      description: card.description,
      priority: card.priority,
    });
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            group rounded-2xl bg-white p-4
            border-2 border-slate-100
            transition-all duration-200 ease-out
            cursor-grab active:cursor-grabbing
            ${snapshot.isDragging
              ? "shadow-2xl shadow-purple-300/40 scale-105 rotate-2 border-purple-300 ring-4 ring-purple-200"
              : "shadow-md hover:shadow-xl hover:shadow-purple-200/30 hover:-translate-y-1 hover:border-purple-200"
            }
          `}
        >
          {isEditing ? (
            /* Edit Mode */
            <div className="space-y-3">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full px-3 py-2.5 text-sm font-semibold rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-violet-400 focus:bg-white focus:outline-none transition-all"
                placeholder="Task title"
                autoFocus
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="w-full px-3 py-2.5 text-sm rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-violet-400 focus:bg-white focus:outline-none transition-all resize-none"
                placeholder="Add a description..."
                rows={2}
              />
              <select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                className="w-full px-3 py-2.5 text-sm font-medium rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-violet-400 focus:bg-white focus:outline-none transition-all cursor-pointer"
              >
                <option value="Low">🟢 Low Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="High">🔴 High Priority</option>
              </select>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-300/50 hover:shadow-xl hover:shadow-purple-400/50 active:scale-95 transition-all"
                >
                  ✓ Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 text-sm font-bold rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all"
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          ) : (
            /* View Mode */
            <>
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-slate-700 text-sm leading-snug flex-1">
                  {card.title}
                </h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 rounded-xl text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition-all active:scale-90"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={onDelete}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {card.description && (
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed bg-slate-50 rounded-lg px-2 py-1.5">
                  {card.description}
                </p>
              )}

              <div className="mt-3">
                <span
                  className={`
                    inline-flex items-center gap-1.5 
                    px-2.5 py-1 rounded-full text-xs font-bold
                    ${priority.bg} ${priority.text} border ${priority.border}
                  `}
                >
                  {priority.emoji} {card.priority}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </Draggable>
  );
}
