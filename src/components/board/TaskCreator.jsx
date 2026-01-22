import { useState } from "react";
import toast from "react-hot-toast";

export default function TaskCreator({ onCreate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreate("Todo", {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        priority,
      });
      setTitle("");
      setDescription("");
      setPriority("Low");
      setIsExpanded(false);
      toast.success("Task created! 🎉");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && title.trim()) {
      e.preventDefault();
      submit();
    }
    if (e.key === "Escape") {
      setIsExpanded(false);
    }
  };

  return (
    <div
      className={`
        bg-white/80 backdrop-blur-sm rounded-3xl 
        shadow-xl shadow-purple-200/30
        border-2 border-white/60
        transition-all duration-300
        ${isExpanded ? "p-6" : "p-4"}
      `}
    >
      {!isExpanded ? (
        /* Collapsed State */
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center gap-4 text-left group"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-300/50 group-hover:shadow-xl group-hover:shadow-purple-400/50 group-hover:scale-110 transition-all">
            <span className="text-white text-2xl font-bold">+</span>
          </div>
          <div>
            <span className="text-slate-600 font-semibold group-hover:text-violet-600 transition-colors">
              Create a new task...
            </span>
            <p className="text-xs text-slate-400 mt-0.5">Click to add a task to your board ✨</p>
          </div>
        </button>
      ) : (
        /* Expanded State */
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-300/30">
              <span className="text-xl">✏️</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-700">New Task</h3>
              <p className="text-xs text-slate-400">Fill in the details below</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
              📌 Title *
            </label>
            <input
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 placeholder-slate-400 text-slate-700 font-semibold focus:border-violet-400 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
              📝 Description
            </label>
            <textarea
              placeholder="Add more details (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 bg-slate-50 placeholder-slate-400 text-slate-600 text-sm focus:border-violet-400 focus:bg-white focus:outline-none transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
              🎯 Priority
            </label>
            <div className="flex gap-2">
              {["Low", "Medium", "High"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`
                    flex-1 py-2.5 rounded-xl font-bold text-sm transition-all
                    ${priority === p
                      ? p === "Low"
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-300/50"
                        : p === "Medium"
                          ? "bg-amber-500 text-white shadow-lg shadow-amber-300/50"
                          : "bg-rose-500 text-white shadow-lg shadow-rose-300/50"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }
                  `}
                >
                  {p === "Low" ? "🟢" : p === "Medium" ? "🟡" : "🔴"} {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              onClick={() => {
                setIsExpanded(false);
                setTitle("");
                setDescription("");
                setPriority("Low");
              }}
              className="flex-1 px-5 py-3 rounded-2xl text-slate-600 font-bold bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={!title.trim() || isSubmitting}
              className={`
                flex-1 px-5 py-3 rounded-2xl font-bold
                transition-all active:scale-95
                ${title.trim() && !isSubmitting
                  ? "bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-purple-300/50 hover:shadow-2xl hover:shadow-purple-400/50"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating...
                </span>
              ) : (
                "🚀 Add Task"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
