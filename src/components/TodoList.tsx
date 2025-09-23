import React from 'react';
import { Task } from '../interfaces';
import TodoItem from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, text: string) => void;
  addSubTask: (parentId: number, text: string, dueDate?: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, toggleTask, deleteTask, editTask, addSubTask }) => {
  return (
    <ul className="list-group">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
          addSubTask={addSubTask}
        />
      ))}
    </ul>
  );
};

export default TodoList;
