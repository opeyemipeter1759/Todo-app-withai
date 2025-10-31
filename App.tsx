import React, { useState, useEffect } from 'react';
import { CloseIcon, PlusIcon, TrashIcon, CheckCircleIcon, CircleIcon } from './components/Icons';

// Define the structure of a task
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
}

// --- Mock Data ---
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design the new homepage',
    description: 'Create mockups in Figma and get feedback from the team.',
    dueDate: '2024-08-15',
    priority: 'High',
    completed: false,
  },
  {
    id: '2',
    title: 'Develop the login feature',
    description: 'Implement JWT authentication and social login options.',
    dueDate: '2024-08-20',
    priority: 'Medium',
    completed: false,
  },
  {
    id: '3',
    title: 'Write documentation',
    description: 'Document the API endpoints and component library.',
    dueDate: '2024-08-25',
    priority: 'Low',
    completed: true,
  },
];

// --- Priority Styling ---
const priorityColors: { [key in Task['priority']]: string } = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
};

// --- Task Item Component ---
const TaskItem: React.FC<{ 
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}> = ({ task, onToggle, onDelete, onEdit }) => (
  <div className="bg-[#373737] rounded-xl p-4 flex items-start space-x-4">
    <button onClick={() => onToggle(task.id)} className="flex-shrink-0 mt-1">
      {task.completed ? <CheckCircleIcon /> : <CircleIcon />}
    </button>
    <div className="flex-grow" onClick={() => onEdit(task)}>
      <p className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
        {task.title}
      </p>
      {task.dueDate && (
        <p className={`text-sm ${task.completed ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </div>
    <div className="flex-shrink-0 flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`}></div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} className="text-gray-500 hover:text-red-500">
            <TrashIcon />
        </button>
    </div>
  </div>
);


// --- Task List Screen Component ---
const TaskListScreen: React.FC<{
    tasks: Task[];
    onAddTask: () => void;
    onEditTask: (task: Task) => void;
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
}> = ({ tasks, onAddTask, onEditTask, onToggleTask, onDeleteTask }) => {
    const incompleteTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    return (
        <div className="bg-[#1A2A23] min-h-screen font-sans text-white flex flex-col">
            <header className="flex-shrink-0 flex justify-between items-center p-4">
                <div className="w-10"></div>
                <h1 className="text-xl font-bold">Tasks</h1>
                <div className="w-10"></div>
            </header>
            <main className="flex-grow p-4 pb-32 overflow-y-auto">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-300 px-2">To-do</h2>
                    {incompleteTasks.length > 0 ? (
                        incompleteTasks.map(task => (
                            <TaskItem key={task.id} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} onEdit={onEditTask} />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-4">All tasks completed!</p>
                    )}

                    {completedTasks.length > 0 && (
                        <>
                            <h2 className="text-lg font-semibold text-gray-300 px-2 pt-6">Completed</h2>
                            {completedTasks.map(task => (
                                <TaskItem key={task.id} task={task} onToggle={onToggleTask} onDelete={onDeleteTask} onEdit={onEditTask} />
                            ))}
                        </>
                    )}
                </div>
            </main>
            <footer className="fixed inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1A2A23] to-transparent">
                <button 
                    onClick={onAddTask}
                    className="w-full bg-[#2EBD85] text-black font-bold py-4 rounded-xl shadow-lg hover:bg-[#28a775] transition-colors duration-200 flex items-center justify-center space-x-2">
                    <PlusIcon />
                    <span>Add Task</span>
                </button>
            </footer>
        </div>
    );
};


// --- Task Form Screen Component ---
const TaskFormScreen: React.FC<{
    onSave: (task: Omit<Task, 'id' | 'completed'> & Partial<Pick<Task, 'id'>>) => void;
    onCancel: () => void;
    taskToEdit?: Task | null;
}> = ({ onSave, onCancel, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const isEditing = !!taskToEdit;

  useEffect(() => {
    if (isEditing) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
      setPriority(taskToEdit.priority);
    }
  }, [taskToEdit, isEditing]);

  const handleSave = () => {
    if (!title) return; // Basic validation
    onSave({
      ...(isEditing && { id: taskToEdit.id }),
      title,
      description,
      dueDate,
      priority,
    });
  };

  const priorities: Array<'Low' | 'Medium' | 'High'> = ['Low', 'Medium', 'High'];

  return (
    <div className="bg-[#1A2A23] min-h-screen font-sans text-white flex flex-col">
      <header className="flex-shrink-0 flex justify-between items-center p-4">
        <button className="p-2" onClick={onCancel}>
          <CloseIcon />
        </button>
        <h1 className="text-xl font-bold">{isEditing ? 'Edit Task' : 'New Task'}</h1>
        <button className="p-2 text-gray-400 font-semibold w-12" onClick={handleSave}>Save</button>
      </header>
      <main className="flex-grow p-4 pb-32">
        <div className="space-y-6">
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
            <input id="task-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-[#373737] rounded-xl w-full p-4 border-none focus:outline-none focus:ring-2 focus:ring-[#2EBD85]" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description (optional)</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a description..." className="bg-[#373737] rounded-xl w-full p-4 h-32 border-none resize-none focus:outline-none focus:ring-2 focus:ring-[#2EBD85] placeholder-gray-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
            <div className="flex bg-[#373737] rounded-xl p-1 space-x-1">
              {priorities.map((p) => (
                <button key={p} type="button" onClick={() => setPriority(p)} className={`w-full text-center rounded-lg py-2 font-semibold transition-colors duration-200 ${priority === p ? 'bg-[#2EBD85] text-black' : 'bg-transparent text-white hover:bg-white/10'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="due-date" className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
            <input id="due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-[#373737] rounded-xl w-full p-4 border-none focus:outline-none focus:ring-2 focus:ring-[#2EBD85] text-white" />
          </div>
        </div>
      </main>
      <footer className="fixed inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1A2A23] to-transparent">
        <button onClick={handleSave} className="w-full bg-[#2EBD85] text-black font-bold py-4 rounded-xl shadow-lg hover:bg-[#28a775] transition-colors duration-200">
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </footer>
    </div>
  );
};

// --- Main App Component (Controller) ---
const App: React.FC = () => {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const handleSaveTask = (taskData: Omit<Task, 'id' | 'completed'> & Partial<Pick<Task, 'id'>>) => {
        if (taskData.id) { // Update existing task
            setTasks(tasks.map(t => t.id === taskData.id ? { ...t, ...taskData } : t));
        } else { // Add new task
            const newTask: Task = {
                id: Date.now().toString(),
                ...taskData,
                completed: false,
            };
            setTasks([newTask, ...tasks]);
        }
        setView('list');
        setSelectedTask(null);
    };

    const handleToggleComplete = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const handleEditTask = (task: Task) => {
        setSelectedTask(task);
        setView('form');
    };

    const handleAddNewTask = () => {
        setSelectedTask(null);
        setView('form');
    };

    const handleCancel = () => {
        setView('list');
        setSelectedTask(null);
    };

    if (view === 'form') {
        return <TaskFormScreen onSave={handleSaveTask} onCancel={handleCancel} taskToEdit={selectedTask} />;
    }

    return <TaskListScreen tasks={tasks} onAddTask={handleAddNewTask} onEditTask={handleEditTask} onToggleTask={handleToggleComplete} onDeleteTask={handleDeleteTask} />;
};

export default App;
