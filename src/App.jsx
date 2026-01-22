import React from 'react'
import Board from "./components/Board";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Kanban Board
      </h1>

      <Board />
    </div>
  );
}

export default App;

