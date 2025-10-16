export interface Task {
  id: number;
  title: string;
  assignee: string;
  description?: string;
  dueDate?: string;
}

export interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

export interface Workspace {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  workspaceId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}