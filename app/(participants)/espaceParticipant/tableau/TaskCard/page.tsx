"use client";

import React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

interface TaskCardProps {
  content: string;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const TaskCard: React.FC<TaskCardProps> = ({ content, provided, snapshot }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`bg-white p-4 mb-2 rounded-lg shadow-md border ${
        snapshot.isDragging ? 'border-orange bg-blue-50' : 'border-gray-200'
      } transition-all duration-300 ease-in-out`}
    >
      <p className="text-gray-800 font-medium">{content}</p>
    </div>
  );
};

export default TaskCard;
