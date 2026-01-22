import Card from "./Card";

function Column({ title, cards }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold mb-3">{title}</h2>

      {cards.length === 0 ? (
        <p className="text-sm text-gray-500">No cards</p>
      ) : (
        cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            priority={card.priority}
          />
        ))
      )}
    </div>
  );
}

export default Column;
