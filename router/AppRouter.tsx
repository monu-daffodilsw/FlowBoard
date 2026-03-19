'use client';
import { useEffect } from 'react';
import { useRouterContext } from '@ultra-ui-library';
import { useRouter } from './index';
import { AppLayout } from '@/components/layouts/AppLayout';
import LoginPage from '@/components/pages/LoginPage';
import RegisterPage from '@/components/pages/RegisterPage';
import DashboardPage from '@/components/pages/DashboardPage';
import ProjectsPage from '@/components/pages/ProjectsPage';
import ProjectBoardPage from '@/components/pages/ProjectBoardPage';
import TaskDetailPage from '@/components/pages/TaskDetailPage';
import ProfilePage from '@/components/pages/ProfilePage';
import SettingsPage from '@/components/pages/SettingsPage';

const PROTECTED_PAGES: Record<string, React.ComponentType> = {
  dashboard: DashboardPage,
  projects: ProjectsPage,
  projectBoard: ProjectBoardPage,
  taskDetail: TaskDetailPage,
  profile: ProfilePage,
  settings: SettingsPage,
};

export function AppRouter() {
  const { routeName } = useRouterContext();
  const router = useRouter();

  // No matched route (e.g. root "/") → go to login
  useEffect(() => {
    if (!routeName) router.replace('login');
  }, [routeName, router]);

  if (routeName === 'login') return <LoginPage />;
  if (routeName === 'register') return <RegisterPage />;

  const Page = routeName ? PROTECTED_PAGES[routeName] : null;
  if (!Page) return null;

  return (
    <AppLayout>
      <Page />
    </AppLayout>
  );
}
