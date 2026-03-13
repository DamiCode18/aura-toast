export type ToastType = 'success' | 'error' | 'info' | 'warning';
export interface ToastConfig {
    message: string;
    type?: ToastType;
    duration?: number;
    id?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    style?: React.CSSProperties;
    className?: string;
    glassy?: boolean;
}
export type ToastState = ToastConfig | null;
export type Listener = (state: ToastState) => void;
