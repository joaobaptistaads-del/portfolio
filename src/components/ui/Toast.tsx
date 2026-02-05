'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, X, Loader2 } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'loading';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  loading: Loader2,
};

const colors = {
  success: 'bg-green-500/10 border-green-500/20 text-green-500',
  error: 'bg-red-500/10 border-red-500/20 text-red-500',
  warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500',
  loading: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
};

export function ToastItem({ toast, onClose }: ToastProps) {
  const Icon = icons[toast.type];

  useEffect(() => {
    if (toast.type !== 'loading' && toast.duration !== 0) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`
        relative flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm
        ${colors[toast.type]} shadow-lg max-w-md w-full
      `}
    >
      <Icon
        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
          toast.type === 'loading' ? 'animate-spin' : ''
        }`}
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white">{toast.title}</p>
        {toast.description && (
          <p className="text-sm text-gray-300 mt-1">{toast.description}</p>
        )}
      </div>
      {toast.type !== 'loading' && (
        <button
          onClick={() => onClose(toast.id)}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
