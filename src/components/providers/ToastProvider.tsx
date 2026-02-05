'use client';

import { ToastContainer } from '@/components/ui/Toast';
import { useToastStore } from '@/lib/store/toastStore';

export function ToastProvider() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return <ToastContainer toasts={toasts} onClose={removeToast} />;
}
