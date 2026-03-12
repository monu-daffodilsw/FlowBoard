'use client';
import { useState, useEffect, useCallback } from 'react';
import { Project } from '@/types';
import { lsGet, lsSet, LS_KEYS } from '@/services/localStorage';
import { generateId } from '@ui-library';
import { MOCK_PROJECTS } from '@/utils/mockData';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    (async () => {
      const stored = await lsGet<Project[]>(LS_KEYS.PROJECTS);
      if (stored && stored.length > 0) {
        setProjects(stored);
      } else {
        lsSet(LS_KEYS.PROJECTS, MOCK_PROJECTS);
        setProjects(MOCK_PROJECTS);
      }
    })();
  }, []);

  const save = (updated: Project[]) => {
    setProjects(updated);
    lsSet(LS_KEYS.PROJECTS, updated);
  };

  const addProject = useCallback((name: string, description: string, members: string[]) => {
    const project: Project = {
      id: generateId(),
      name,
      description,
      members,
      createdAt: new Date().toISOString(),
    };
    setProjects(prev => {
      const updated = [...prev, project];
      lsSet(LS_KEYS.PROJECTS, updated);
      return updated;
    });
    return project;
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      lsSet(LS_KEYS.PROJECTS, updated);
      return updated;
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => {
      const updated = prev.filter(p => p.id !== id);
      lsSet(LS_KEYS.PROJECTS, updated);
      return updated;
    });
  }, []);

  const getProject = useCallback((id: string) => {
    return projects.find(p => p.id === id) ?? null;
  }, [projects]);

  return { projects, addProject, updateProject, deleteProject, getProject };
}
