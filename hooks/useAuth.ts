'use client';
import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { storageGet, storageSet, storageRemove, LS_KEYS } from '@/services/storage';
import { generateId } from '@ui-library';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await storageGet<User>(LS_KEYS.USER);
      setUser(stored);
      setLoading(false);
    })();
  }, []);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    const existing = await storageGet<User>(LS_KEYS.USER);
    if (existing && existing.email === email) {
      setUser(existing);
      return true;
    }
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];
    const newUser: User = {
      id: generateId(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      email,
      bio: '',
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
      createdAt: new Date().toISOString(),
    };
    await storageSet(LS_KEYS.USER, newUser);
    setUser(newUser);
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];
    const newUser: User = {
      id: generateId(),
      name,
      email,
      bio: '',
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
      createdAt: new Date().toISOString(),
    };
    await storageSet(LS_KEYS.USER, newUser);
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(async () => {
    await storageRemove(LS_KEYS.USER);
    setUser(null);
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    const current = await storageGet<User>(LS_KEYS.USER);
    if (!current) return;
    const updated = { ...current, ...updates };
    await storageSet(LS_KEYS.USER, updated);
    setUser(updated);
  }, []);

  return { user, loading, login, register, logout, updateUser };
}
