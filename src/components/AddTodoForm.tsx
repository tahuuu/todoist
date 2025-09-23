import React, { useState } from 'react';

interface AddTodoFormProps {
  addTask: (text: string, dueDate?: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTask }) => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text, dueDate);
      setText('');
      setDueDate('');
    }
  };

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
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
