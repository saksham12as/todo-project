import React, { useState } from 'react';
import Card from './Card';

const Status = ({ index, status, statuses, setStatuses }) => {
  const [newTaskName, setNewTaskName] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('cardId', card.id.toString());
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const movedCard = statuses.find(status => status.cards.some(card => card.id.toString() === cardId)).cards.find(card => card.id.toString() === cardId);
    const newStatuses = statuses.map((s, i) => {
      if (i === index) return { ...s, cards: [...s.cards, movedCard] };
      if (s.cards.includes(movedCard)) return { ...s, cards: s.cards.filter(card => card.id.toString() !== cardId) };
      return s;
    });
    setStatuses(newStatuses);
  };

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      const newTask = { id: Math.floor(Math.random() * 1000), title: newTaskName, description: 'New Task Description' };
      const newStatuses = statuses.map((s, i) => (i === index ? { ...s, cards: [...s.cards, newTask] } : s));
      setStatuses(newStatuses);
      setNewTaskName('');
    } else {
      alert('Please enter a valid task name.');
    }
  };

  return (
    <div className="status" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2>{status.title} ({status.cards.length})</h2>
      <div className="cards">
        {status.cards.map((card, cardIndex) => (
          <Card
            key={card.id}
            index={index}
            cardIndex={cardIndex}
            card={card}
            onDragStart={(e) => handleDragStart(e, card)}
          />
        ))}
      </div>
      <div>
        <input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} placeholder="Enter task name" />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default Status;
