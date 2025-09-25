import React, { useState } from 'react';

interface AddTodoFormProps {
  addTask: (text: string, dueDate?: string, priority?: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTask }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text, dueDate, priority);
      setText('');
      setDueDate('');
      setIsFormVisible(false);
    }
  };

  if (!isFormVisible) {
    return (
      <button className="btn btn-primary mb-4" onClick={() => setIsFormVisible(true)}>
        Add Task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="e.g., Buy milk"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          className="form-control"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => setIsFormVisible(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
