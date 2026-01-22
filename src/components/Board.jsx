import { useState } from "react";
import Column from "./Column";
import { initialBoardState } from "../state/boardState";

function Board() {
  const [board, setBoard] = useState(initialBoardState);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Column
        title="Todo"
        cards={board.columns.todo.map(
          (id) => board.cardsById[id]
        )}
      />
      <Column
        title="Doing"
        cards={board.columns.doing.map(
          (id) => board.cardsById[id]
        )}
      />
      <Column
        title="Done"
        cards={board.columns.done.map(
          (id) => board.cardsById[id]
        )}
      />
    </div>
  );
}

export default Board;
