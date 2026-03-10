'use client';
import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { lsGet, lsSet, lsRemove, LS_KEYS } from '@/services/localStorage';
import { generateId } from '@/utils/utils';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = lsGet<User>(LS_KEYS.USER);
    setUser(stored);
    setLoading(false);
  }, []);

  const login = useCallback((email: string, _password: string): boolean => {
    // Mock auth: accept any email/password, create user if not exists
    const existing = lsGet<User>(LS_KEYS.USER);
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
    lsSet(LS_KEYS.USER, newUser);
    setUser(newUser);
    return true;
  }, []);

  const register = useCallback((name: string, email: string, _password: string): boolean => {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];
    const newUser: User = {
      id: generateId(),
      name,
      email,
      bio: '',
      avatarColor: colors[Math.floor(Math.random() * colors.length)],
      createdAt: new Date().toISOString(),
    };
    lsSet(LS_KEYS.USER, newUser);
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    lsRemove(LS_KEYS.USER);
    setUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      lsSet(LS_KEYS.USER, updated);
      return updated;
    });
  }, []);

  return { user, loading, login, register, logout, updateUser };
}
