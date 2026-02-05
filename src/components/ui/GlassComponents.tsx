'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      className={`
        relative backdrop-blur-xl bg-white/5 
        border border-white/10 rounded-2xl p-6
        shadow-2xl shadow-black/20
        before:absolute before:inset-0 before:rounded-2xl 
        before:bg-gradient-to-br before:from-white/10 before:to-transparent
        before:opacity-0 hover:before:opacity-100 before:transition-opacity
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function GlassButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  type = 'button'
}: GlassButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
    secondary: 'bg-white/10 hover:bg-white/20',
    danger: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} ${sizes[size]}
        rounded-xl font-semibold text-white
        shadow-lg shadow-black/25
        backdrop-blur-sm border border-white/20
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

interface GlassInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  icon?: ReactNode;
}

export function GlassInput({ 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  className = '',
  icon
}: GlassInputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
          {icon}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3
          bg-white/5 backdrop-blur-xl
          border border-white/10 rounded-xl
          text-white placeholder-white/40
          focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
          transition-all duration-200
          ${className}
        `}
      />
    </div>
  );
}

interface GlassTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function GlassTextArea({ 
  value, 
  onChange, 
  placeholder,
  rows = 4,
  className = ''
}: GlassTextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`
        w-full px-4 py-3
        bg-white/5 backdrop-blur-xl
        border border-white/10 rounded-xl
        text-white placeholder-white/40
        focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
        transition-all duration-200
        resize-none
        ${className}
      `}
    />
  );
}
