import React from 'react';

const Card = ({ card, onDragStart }) => {
  const handleDragStart = (e) => {
    onDragStart(e, card.id);
  };

  return (
    <div className="card" draggable="true" onDragStart={handleDragStart}>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
    </div>
  );
};

export default Card;
