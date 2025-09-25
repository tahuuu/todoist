import React, { useState, useEffect } from 'react';
import './App.css';
import { Task } from './interfaces';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import CalendarView from './components/CalendarView';

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [
        { id: 1, text: 'Learn React', completed: true, dueDate: '2025-09-24', priority: 'High', subtasks: [] },
        { id: 2, text: 'Build a Todoist Clone', completed: false, dueDate: '2025-09-25', priority: 'Medium', subtasks: [] },
        { id: 3, text: 'Deploy the app', completed: false, priority: 'Low', subtasks: [] },
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

  const addTask = (text: string, dueDate?: string, priority?: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      dueDate,
      priority,
      subtasks: [],
    };
    setTasks([...tasks, newTask]);
  };

  const findTask = (tasks: Task[], id: number): Task | null => {
    for (const task of tasks) {
      if (task.id === id) return task;
      if (task.subtasks) {
        const found = findTask(task.subtasks, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateTask = (tasks: Task[], updatedTask: Task): Task[] => {
    return tasks.map(task => {
      if (task.id === updatedTask.id) {
        return updatedTask;
      }
      if (task.subtasks) {
        return { ...task, subtasks: updateTask(task.subtasks, updatedTask) };
      }
      return task;
    });
  };

  const deleteTaskRecursive = (tasks: Task[], id: number): Task[] => {
    return tasks.filter(task => {
      if (task.id === id) return false;
      if (task.subtasks) {
        task.subtasks = deleteTaskRecursive(task.subtasks, id);
      }
      return true;
    });
  };

  const toggleTask = (id: number) => {
    const task = findTask(tasks, id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      setTasks(updateTask(tasks, updatedTask));
    }
  };

  const deleteTask = (id: number) => {
    setTasks(deleteTaskRecursive(tasks, id));
  };

  const editTask = (id: number, text: string) => {
    const task = findTask(tasks, id);
    if (task) {
      const updatedTask = { ...task, text };
      setTasks(updateTask(tasks, updatedTask));
    }
  };

  const addSubTask = (parentId: number, text: string, dueDate?: string) => {
    const parentTask = findTask(tasks, parentId);
    if (parentTask) {
      const newSubTask: Task = {
        id: Date.now(),
        text,
        completed: false,
        dueDate,
        subtasks: [],
      };
      const updatedTask = { ...parentTask, subtasks: [...(parentTask.subtasks || []), newSubTask] };
      setTasks(updateTask(tasks, updatedTask));
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorder = (list: Task[], startIndex: number, endIndex: number) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === 'tasks') {
        const newTasks = reorder(tasks, source.index, destination.index);
        setTasks(newTasks);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`app-container ${theme}`}>
        <header className="app-header">
          <h1>Todoist</h1>
          <div className='theme-toggler'>
            <button onClick={toggleTheme} className="btn btn-sm btn-outline-light">
              {theme === 'light' ? 'Dark' : 'Light'} Mode
            </button>
          </div>
        </header>
        <div className="app-main-container">
          <div className="calendar-container">
            <CalendarView tasks={tasks} />
          </div>
          <div className="todolist-container">
            <main>
              <AddTodoForm addTask={addTask} />
              <TodoList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} editTask={editTask} addSubTask={addSubTask} />
            </main>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;


