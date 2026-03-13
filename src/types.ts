export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number; // 0 for infinite (manual close)
  id?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  style?: React.CSSProperties;
  className?: string;
}

export type ToastState = ToastConfig | null;

export type Listener = (state: ToastState) => void;
