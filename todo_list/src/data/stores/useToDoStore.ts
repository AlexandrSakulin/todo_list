import { create } from "zustand";
import { generateId } from "./helper";

interface Task {
  id: string;
  title: string;
  createdAt: number;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
  tasks: [
    {
      id: "wqeqqewqq",
      title: "Моя дефолтная таска",
      createdAt: 212121,
    },
    {
      id: "wqeqqwqeq",
      title: "Моя дефолтная таска 2",
      createdAt: 212123,
    },
  ],
  createTask: (title) => {
    const { tasks } = get();
    const newTask = { id: generateId(), title, createdAt: Date.now() };
    set({
      tasks: [newTask].concat(tasks),
    });
  },
  updateTask: (id: string, title: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.map((task) => ({
        ...task,
        title: task.id === id ? title : task.title,
      })),
    });
  },
  removeTask: (id: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.filter((task) => task.id !== id),
    });
  },
}));
