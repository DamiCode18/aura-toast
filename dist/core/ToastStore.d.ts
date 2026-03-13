import { ToastConfig, ToastState, Listener } from '../types';

declare class ToastStore {
    private state;
    private listeners;
    private timeoutId;
    private startTime;
    private remainingDuration;
    getState(): ToastState;
    subscribe(listener: Listener): () => void;
    private notify;
    show(config: ToastConfig): void;
    private startTimer;
    pause(): void;
    resume(): void;
    dismiss(): void;
}
export declare const toastStore: ToastStore;
export declare const auraToast: {
    success: (message: string, config?: Omit<ToastConfig, "message" | "type">) => void;
    error: (message: string, config?: Omit<ToastConfig, "message" | "type">) => void;
    info: (message: string, config?: Omit<ToastConfig, "message" | "type">) => void;
    warning: (message: string, config?: Omit<ToastConfig, "message" | "type">) => void;
    dismiss: () => void;
    pause: () => void;
    resume: () => void;
};
export {};
