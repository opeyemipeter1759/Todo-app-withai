
import React, { useState } from 'react';
import { CloseIcon, CalendarIcon } from './components/Icons';

const App: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('Design the new homepage');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  return (
    <div className="bg-[#1A2A23] min-h-screen font-sans text-white flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 flex justify-between items-center p-4">
        <button className="p-2">
          <CloseIcon />
        </button>
        <h1 className="text-xl font-bold">New Task</h1>
        <button className="p-2 text-gray-400 font-semibold">Save</button>
      </header>

      {/* Form Content */}
      <main className="flex-grow p-4 pb-32">
        <div className="space-y-6">
          {/* Task Title */}
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-300 mb-2">
              Task Title
            </label>
            <input
              id="task-title"
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="bg-[#373737] rounded-xl w-full p-4 border-none focus:outline-none focus:ring-2 focus:ring-[#2EBD85]"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              className="bg-[#373737] rounded-xl w-full p-4 h-32 border-none resize-none focus:outline-none focus:ring-2 focus:ring-[#2EBD85] placeholder-gray-500"
            />
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="due-date" className="block text-sm font-medium text-gray-300 mb-2">
              Due Date
            </label>
            <div className="relative flex items-center">
              <input
                id="due-date"
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Select a date"
                className="bg-[#373737] rounded-xl w-full p-4 pr-12 border-none focus:outline-none focus:ring-2 focus:ring-[#2EBD85] placeholder-gray-500"
              />
              <div className="absolute right-4 text-gray-400 pointer-events-none">
                <CalendarIcon />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer Button */}
      <footer className="fixed inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1A2A23] to-transparent">
        <button className="w-full bg-[#2EBD85] text-black font-bold py-4 rounded-xl shadow-lg hover:bg-[#28a775] transition-colors duration-200">
          Add Task
        </button>
      </footer>
    </div>
  );
};

export default App;
