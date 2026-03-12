'use client';
import { useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus, TaskPriority, Subtask, Comment, ActivityEntry, Attachment } from '@/types';
import { lsGet, lsSet, LS_KEYS } from '@/services/localStorage';
import { generateId } from '@ui-library';
import { MOCK_TASKS } from '@/utils/mockData';

export function useTasks(projectId?: string) {
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await lsGet<Task[]>(LS_KEYS.TASKS);
      if (stored && stored.length > 0) {
        setAllTasks(stored);
      } else {
        lsSet(LS_KEYS.TASKS, MOCK_TASKS);
        setAllTasks(MOCK_TASKS);
      }
    })();
  }, []);

  const tasks = projectId ? allTasks.filter(t => t.projectId === projectId) : allTasks;

  const saveAll = (updated: Task[]) => {
    setAllTasks(updated);
    lsSet(LS_KEYS.TASKS, updated);
  };

  const addTask = useCallback((projectId: string, title: string, status: TaskStatus = 'Backlog') => {
    const task: Task = {
      id: generateId(),
      projectId,
      title,
      description: '',
      status,
      priority: 'Medium',
      assignee: '',
      dueDate: '',
      attachments: [],
      notes: '',
      subtasks: [],
      comments: [],
      activity: [{ id: generateId(), message: 'Task created', createdAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setAllTasks(prev => {
      const updated = [...prev, task];
      lsSet(LS_KEYS.TASKS, updated);
      return updated;
    });
    return task;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>, activityMsg?: string) => {
    setAllTasks(prev => {
      const updated = prev.map(t => {
        if (t.id !== id) return t;
        const entry: ActivityEntry = activityMsg
          ? { id: generateId(), message: activityMsg, createdAt: new Date().toISOString() }
          : null as unknown as ActivityEntry;
        return {
          ...t,
          ...updates,
          updatedAt: new Date().toISOString(),
          activity: entry ? [...t.activity, entry] : t.activity,
        };
      });
      lsSet(LS_KEYS.TASKS, updated);
      return updated;
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    setAllTasks(prev => {
      const updated = prev.filter(t => t.id !== id);
      lsSet(LS_KEYS.TASKS, updated);
      return updated;
    });
  }, []);

  const getTask = useCallback((id: string) => {
    return allTasks.find(t => t.id === id) ?? null;
  }, [allTasks]);

  const addSubtask = useCallback((taskId: string, title: string) => {
    const sub: Subtask = { id: generateId(), title, done: false };
    setAllTasks(prev => {
      const updated = prev.map(t => t.id === taskId
        ? { ...t, subtasks: [...t.subtasks, sub], updatedAt: new Date().toISOString() }
        : t);
      lsSet(LS_KEYS.TASKS, updated);
      return updated;
    });
  }, []);

  const toggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    setAllTasks(prev => {
      const updated = prev.map(t => t.id === taskId
        ? {
            ...t,
            subtasks: t.subtasks.map(s => s.id === subtaskId ? { ...s, done: !s.done } : s),
            updatedAt: new Date().toISOString(),
          }
        : t);
      lsSet(LS_KEYS.TASKS, updated);
      return updated;
    });
  }, []);

  const deleteSubtask = useCallback((taskId: string, subtaskId: string) => {
    setAllTasks(prev => {
      const updated = prev.map(t => t.id === taskId
        ? { ...t, subtasks: t.subtasks.filter(s => s.id !== subtaskId), updatedAt: new Date().toISOString() }
        : t);
      lsSet(LS_KEYS.TASKS, updated);
      return updated;
    });
  }, []);

  const addComment = useCallback((taskId: string, author: string, text: string) => {
    const comment: Comment = { id: generateId(), author, text, createdAt: new Date().toISOString() };
    setAllTasks(prev => {
      const updated = prev.map(t => t.id === taskId
        ? { ...t, comments: [...t.comments, comment], updatedAt: new Date().toISOString() }
        : t);
      lsSet(LS_KEYS.TASKS, updated);
      return updated;
    });
  }, []);

  const addAttachment = useCallback((taskId: string, attachment: Attachment) => {
    setAllTasks(prev => {
      const updated = prev.map(t => t.id === taskId
        ? { ...t, attachments: [...t.attachments, attachment], updatedAt: new Date().toISOString() }
        : t);
      lsSet(LS_KEYS.TASKS, updated);
      return updated;
    });
  }, []);

  const removeAttachment = useCallback((taskId: string, attachmentId: string) => {
    setAllTasks(prev => {
      const updated = prev.map(t => t.id === taskId
        ? { ...t, attachments: t.attachments.filter(a => a.id !== attachmentId), updatedAt: new Date().toISOString() }
        : t);
      lsSet(LS_KEYS.TASKS, updated);
      return updated;
    });
  }, []);

  return {
    tasks,
    allTasks,
    addTask,
    updateTask,
    deleteTask,
    getTask,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    addComment,
    addAttachment,
    removeAttachment,
  };
}
