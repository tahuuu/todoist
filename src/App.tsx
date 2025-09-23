import React, { useState, useEffect } from 'react';
import './App.css';
import { Task } from './interfaces';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [
        { id: 1, text: 'Learn React', completed: true, dueDate: '2025-09-24' },
        { id: 2, text: 'Build a Todoist Clone', completed: false, dueDate: '2025-09-25' },
        { id: 3, text: 'Deploy the app', completed: false },
      ];
    }
  });
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.className = theme;
    return () => {
      document.body.className = '';
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const addTask = (text: string, dueDate?: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className={`app-container ${theme}`}>
      <header className="app-header">
        <h1>Todoist</h1>
        <div className='theme-toggler'>
          <button onClick={toggleTheme} className="btn btn-sm btn-outline-light">
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
      </header>
      <main>
        <AddTodoForm addTask={addTask} />
        <TodoList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
      </main>
    </div>
  );
}

export default App;
