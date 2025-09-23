import React from 'react';
import { Task } from '../interfaces';

interface TodoItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, toggleTask, deleteTask }) => {
  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-light' : ''}`}>
      <div>
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
        </span>
        {task.dueDate && <span className="ms-2 text-muted">({task.dueDate})</span>}
      </div>
      <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
