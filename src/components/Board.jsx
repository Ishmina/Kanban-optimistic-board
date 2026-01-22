import Column from "./Column";

function Board() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Column title="Todo" />
      <Column title="Doing" />
      <Column title="Done" />
    </div>
  );
}

export default Board;
