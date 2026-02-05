'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertTriangle, Info, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface ModernToast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

const icons = {
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
};

const styles = {
  success: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  error: 'from-red-500/20 to-pink-500/20 border-red-500/30',
  warning: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
  info: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  loading: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
};

const iconColors = {
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-yellow-400',
  info: 'text-blue-400',
  loading: 'text-purple-400',
};

interface ToastItemProps {
  toast: ModernToast;
  onClose: (id: string) => void;
}

export function ModernToastItem({ toast, onClose }: ToastItemProps) {
  const Icon = icons[toast.type];

  useEffect(() => {
    if (toast.type !== 'loading' && toast.duration !== 0) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration || 4000);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      className={`
        relative w-full max-w-sm
        backdrop-blur-2xl bg-gradient-to-br ${styles[toast.type]}
        border rounded-2xl p-4
        shadow-2xl shadow-black/40
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`${iconColors[toast.type]} mt-0.5`}>
          <Icon 
            className={`w-5 h-5 ${toast.type === 'loading' ? 'animate-spin' : ''}`} 
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white">{toast.title}</h4>
          {toast.description && (
            <p className="text-sm text-white/70 mt-1">{toast.description}</p>
          )}
        </div>
        {toast.type !== 'loading' && (
          <button
            onClick={() => onClose(toast.id)}
            className="text-white/50 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

interface ModernToastContainerProps {
  toasts: ModernToast[];
  onClose: (id: string) => void;
}

export function ModernToastContainer({ toasts, onClose }: ModernToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ModernToastItem toast={toast} onClose={onClose} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
