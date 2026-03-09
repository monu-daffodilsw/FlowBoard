export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarColor: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdAt: string;
}

export type TaskStatus = 'Backlog' | 'In Progress' | 'In Review' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  base64: string;
}

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface ActivityEntry {
  id: string;
  message: string;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string;
  attachments: Attachment[];
  notes: string;
  subtasks: Subtask[];
  comments: Comment[];
  activity: ActivityEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
}
