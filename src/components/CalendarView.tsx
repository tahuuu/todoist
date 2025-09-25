import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Task } from '../interfaces';

interface CalendarViewProps {
  tasks: Task[];
}

const getAllDueDates = (tasks: Task[]): Date[] => {
  let dates: Date[] = [];
  for (const task of tasks) {
    if (task.dueDate) {
      dates.push(new Date(task.dueDate));
    }
    if (task.subtasks) {
      dates = dates.concat(getAllDueDates(task.subtasks));
    }
  }
  return dates;
};

const CalendarView: React.FC<CalendarViewProps> = ({ tasks }) => {
  const datesWithTasks = getAllDueDates(tasks);

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      if (datesWithTasks.find(d => d.toDateString() === date.toDateString())) {
        return 'has-task';
      }
    }
    return null;
  };

  return (
    <div>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default CalendarView;
