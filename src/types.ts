import React from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export interface ToastConfig {
  title?: React.ReactNode;
  type?: ToastType;
  description?: React.ReactNode;
  duration?: number; // 0 for infinite (manual close)
  id?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  style?: React.CSSProperties;
  className?: string;
  glassy?: boolean;
  position?: ToastPosition;
  loading?: boolean;
}

export type ToastState = ToastConfig[];

export type Listener = (state: ToastState) => void;
