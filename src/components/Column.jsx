function Column({ title }) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="font-semibold mb-3">{title}</h2>
  
        <div className="text-sm text-gray-500">
          No cards
        </div>
      </div>
    );
  }
  
  export default Column;
  