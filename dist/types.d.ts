export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
export interface ToastConfig {
    message: string;
    type?: ToastType;
    description?: string;
    duration?: number;
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
export type ToastState = ToastConfig | null;
export type Listener = (state: ToastState) => void;
