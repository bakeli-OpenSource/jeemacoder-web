"use client";

import React, { useState } from 'react';
import { DragDropContext, DropResult, DragStart } from 'react-beautiful-dnd';
import Column from '../TaskColumn/page';

type Task = {
  id: string;
  content: string;
};

type ColumnType = {
  name: string;
  items: Task[];
  id: string;
  colore: string; // Ajout du champ pour la couleur
};

type Tasks = {
  todo: ColumnType;
  inProgress: ColumnType;
  testing: ColumnType;
  done: ColumnType;
};

const initialTasks: Tasks = {
  todo: {
    id: '1',
    name: 'Faire',
    colore: 'bg-red-600', // Exemple de couleur
    items: [{ id: '1', content: 'Tâche 1' }, { id: '2', content: 'Tâche 2' }]
  },
  inProgress: {
    id: '2',
    name: 'En cours',
    colore: 'bg-yellow-600', // Exemple de couleur
    items: []
  },
  testing: {
    id: '3',
    name: 'Tester',
    colore: 'bg-blue-600', // Exemple de couleur
    items: []
  },
  done: {
    id: '4',
    name: 'Terminer',
    colore: 'bg-green-600', // Exemple de couleur
    items: []
  }
};

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Tasks>(initialTasks);

  const onDragStart = (start: DragStart) => {
    const { source } = start;
    console.log(`Déplacement commencé depuis la colonne ${source.droppableId}`);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    if (!destination) return;

    // Vérifier si la tâche est déplacée dans la même colonne et à la même position
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    console.log(`Déplacement terminé. Source: ${source.droppableId} à Destination: ${destination.droppableId}`);

    const sourceColumn = tasks[source.droppableId as keyof Tasks];
    const destColumn = tasks[destination.droppableId as keyof Tasks];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Si la tâche reste dans la même colonne, réorganisez les éléments
      sourceItems.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        }
      });
    } else {
      // Si la tâche change de colonne
      destItems.splice(destination.index, 0, removed);
      setTasks({
        ...tasks,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    }

    console.log(`Tâche déplacée : ${removed.id}`);
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto space-x-4 p-6 bg-gray-100 min-h-screen">
        {Object.entries(tasks).map(([id, column]) => (
          <Column
            key={id}
            columnId={id}
            name={column.name}
            tasks={column.items}
            color={column.colore} // Passez la couleur au composant Column
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
