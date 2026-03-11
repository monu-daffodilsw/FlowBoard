// ── Core platform primitives ──────────────────────────────────────────────────
export * from './core';

// ── Utils ─────────────────────────────────────────────────────────────────────
export * from './utils/utils';
export { isNative } from './utils/platform';

// ── Hooks ─────────────────────────────────────────────────────────────────────
export { useTheme } from './hooks/useTheme';
export { useSpeech } from './hooks/useSpeech';
export { useGeolocation } from './hooks/useGeolocation';
export { useClipboard } from './hooks/useClipboard';
export { useOnlineStatus } from './hooks/useOnlineStatus';
export { useCurrentUrl } from './hooks/useCurrentUrl';
export { useBrowserNotifications } from './hooks/useBrowserNotifications';
export { useSafeInsets } from './hooks/useSafeInsets';

// ── UI components ─────────────────────────────────────────────────────────────
export { Button } from './components/ui/Button';
export { Input, Textarea } from './components/ui/Input';
export { Badge } from './components/ui/Badge';
export type { BadgeVariant } from './components/ui/Badge';
export { Avatar } from './components/ui/Avatar';
export { Modal } from './components/ui/Modal';
export { Toast, useToast } from './components/ui/Toast';

// ── Layout components ─────────────────────────────────────────────────────────
export { NotificationPanel } from './components/layouts/NotificationPanel';
export type { NotificationItem } from './components/layouts/NotificationPanel';

// ── Card components ───────────────────────────────────────────────────────────
export { StatsCard } from './components/cards/StatsCard';
export { ClockWidget } from './components/cards/ClockWidget';
export { GeoWidget } from './components/cards/GeoWidget';
export { SpeechNotes } from './components/cards/SpeechNotes';
export { CanvasChart } from './components/cards/CanvasChart';

// ── List components ───────────────────────────────────────────────────────────
export { ChecklistList } from './components/lists/ChecklistList';
export type { ChecklistItem } from './components/lists/ChecklistList';

// ── Form components ───────────────────────────────────────────────────────────
export { FileDropZone } from './components/forms/FileDropZone';
export type { FileAttachment } from './components/forms/FileDropZone';

// ── Router ────────────────────────────────────────────────────────────────────
export { RouterProvider, useRouterContext, useRouter, usePathname, useParams, Link, buildPath, matchPath } from './router';
export type { RouteDefinition, RouterHandle, LinkProps, RouterContextValue } from './router';
