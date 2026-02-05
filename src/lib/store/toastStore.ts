import { create } from 'zustand';
import type { Toast, ToastType } from '@/components/ui/Toast';

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  loading: (title: string, description?: string) => string;
  updateToast: (id: string, updates: Partial<Omit<Toast, 'id'>>) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  success: (title, description) => {
    return get().addToast({ type: 'success', title, description });
  },

  error: (title, description) => {
    return get().addToast({ type: 'error', title, description });
  },

  warning: (title, description) => {
    return get().addToast({ type: 'warning', title, description });
  },

  loading: (title, description) => {
    return get().addToast({ type: 'loading', title, description, duration: 0 });
  },

  updateToast: (id, updates) => {
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  },
}));
