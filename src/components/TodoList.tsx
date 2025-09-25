import React from 'react';
import { Task } from '../interfaces';
import TodoItem from './TodoItem';
import { Droppable } from '@hello-pangea/dnd';

interface TodoListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, text: string) => void;
  addSubTask: (parentId: number, text: string, dueDate?: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, toggleTask, deleteTask, editTask, addSubTask }) => {
  return (
    <Droppable droppableId="tasks">
      {(provided) => (
        <ul className="list-group" {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.map((task, index) => (
            <TodoItem
              key={task.id}
              task={task}
              index={index}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
              addSubTask={addSubTask}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default TodoList;
