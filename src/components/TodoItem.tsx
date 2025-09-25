import React, { useState } from 'react';
import { Task } from '../interfaces';
import TodoList from './TodoList';
import { Draggable } from '@hello-pangea/dnd';
import { Dropdown } from 'react-bootstrap';
import EditTaskModal from './EditTaskModal';

interface TodoItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, updates: { text: string; dueDate: string; priority: string }) => void;
  addSubTask: (parentId: number, text: string, dueDate?: string) => void;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, toggleTask, deleteTask, editTask, addSubTask, index }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [subtaskText, setSubtaskText] = useState('');
  const [subtaskDueDate, setSubtaskDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddSubtask = () => {
    if (subtaskText.trim()) {
      addSubTask(task.id, subtaskText, subtaskDueDate);
      setSubtaskText('');
      setSubtaskDueDate('');
      setShowSubtaskInput(false);
    }
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <li
          className={`list-group-item ${task.completed ? 'list-group-item-light' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center flex-grow-1">
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
              {task.subtasks && task.subtasks.length > 0 && (
                <button className="btn btn-sm expand-collapse-btn ms-2" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? '∧' : '>'}
                </button>
              )}
              {task.dueDate && <span className="ms-2 text-muted">({task.dueDate})</span>}
              {task.priority && <span className={`ms-2 badge ${getPriorityClass(task.priority)}`}>{task.priority}</span>}
            </div>
            <div>
                              <Dropdown>
                                <Dropdown.Toggle as="button" className="btn btn-sm more-options-btn">
                                  ...
                                </Dropdown.Toggle>                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setShowSubtaskInput(!showSubtaskInput)}>
                    Add Subtask
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowEditModal(true)}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item className="text-danger" onClick={() => deleteTask(task.id)}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          {showSubtaskInput && (
            <div className="input-group mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="New subtask"
                value={subtaskText}
                onChange={(e) => setSubtaskText(e.target.value)}
              />
              <input
                type="date"
                className="form-control"
                value={subtaskDueDate}
                onChange={(e) => setSubtaskDueDate(e.target.value)}
              />
              <button className="btn btn-primary btn-sm" onClick={handleAddSubtask}>
                Add
              </button>
            </div>
          )}
          {isExpanded && task.subtasks && task.subtasks.length > 0 && (
            <div className="ms-4 mt-2">
              <TodoList
                tasks={task.subtasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
                addSubTask={addSubTask}
                droppableId={task.id.toString()}
              />
            </div>
          )}
          <EditTaskModal
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            task={task}
            editTask={editTask}
          />
        </li>
      )}
    </Draggable>
  );
};

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'bg-danger';
    case 'Medium':
      return 'bg-warning';
    case 'Low':
      return 'bg-success';
    default:
      return 'bg-secondary';
  }
};

export default TodoItem;

