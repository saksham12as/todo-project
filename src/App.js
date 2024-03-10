import React, { useState } from 'react';
import './App.css';
import Status from './Status';

function App() {
  const initialStatuses = [
    { title: 'Todo', cards: [{ id: 1, title: 'Task 1', description: 'Description 1' }] },
    { title: 'In Progress', cards: [{ id: 2, title: 'Task 2', description: 'Description 2' }] },
    { title: 'Done', cards: [{ id: 3, title: 'Task 3', description: 'Description 3' }] }
  ];

  const [statuses, setStatuses] = useState(initialStatuses);
  const onDragStart = (e, cardId) => {
    e.dataTransfer.setData('cardId', cardId);
  };

  const handleDrop = (statusIndex, card) => {
    if (statusIndex >= 0 && statusIndex < statuses.length) {
      const updatedStatuses = [...statuses];
      updatedStatuses[statusIndex].cards.push(card);
      setStatuses(updatedStatuses);
    } else {
      console.error(`Invalid status index: ${statusIndex}`);
    }
  };

  const handleAddTask = (statusIndex) => {
    const newTask = { id: Date.now(), title: 'New Task', description: 'New Description' };
    handleDrop(statusIndex, newTask);
  };

  const handleDeleteTask = (statusIndex, cardIndex) => {
    if (statusIndex >= 0 && statusIndex < statuses.length) {
      const updatedStatuses = [...statuses];
      updatedStatuses[statusIndex].cards.splice(cardIndex, 1);
      setStatuses(updatedStatuses);
    } else {
      console.error(`Invalid status index: ${statusIndex}`);
    }
  };

  return (
    <div className="App">
      {statuses.map((status, index) => (
        <Status
          key={index}
          index={index}
          status={status}
          statuses={statuses}
          setStatuses={setStatuses} // Pass setStatuses as a prop
          onDrop={handleDrop}
          onAddTask={() => handleAddTask(index)}
          onDeleteTask={handleDeleteTask}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
}

export default App;
