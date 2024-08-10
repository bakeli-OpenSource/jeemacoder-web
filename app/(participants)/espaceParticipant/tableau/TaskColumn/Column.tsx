"use client";

import React from 'react';
import { Draggable, Droppable, DraggableProvided, DraggableStateSnapshot, DroppableProvided } from 'react-beautiful-dnd';
import TaskCard from '../TaskCard/TaskCard';
import { FiFilter } from 'react-icons/fi';

interface ColumnProps {
  columnId: string; // ID de la colonne utilisé pour Droppable
  name: string;
  tasks: Array<{ id: string; content: string }>;
  color: string; // Ajoutez la prop pour la couleur
}

const Column: React.FC<ColumnProps> = ({ columnId, name, tasks, color }) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided: DroppableProvided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-col min-w-[300px] h-full bg-white rounded-lg shadow-lg border border-gray-200"
        >
          <div
            className={`flex items-center justify-between p-4 ${color} text-white rounded-t-lg border-b border-opacity-20`}
          >
            <h2 className="font-bold text-xl">{name}</h2>
            <button className="p-2 hover:bg-opacity-80 transition duration-300 ease-in-out">
              <FiFilter size={20} />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <TaskCard
                    content={task.content}
                    provided={provided}
                    snapshot={snapshot}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
