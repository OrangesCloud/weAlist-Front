export interface Task {
  id: number;
  title: string;
  assignee: string;
  description?: string;
  dueDate?: string;
  priority?: string;
}

export interface TaskComment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

export interface Column {
  id: number;
  title: string;
  tasks: Task[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}