import { ToastConfig, ToastState, Listener } from '../types';

declare class ToastStore {
    private state;
    private listeners;
    private timeouts;
    private startTimes;
    private remainingDurations;
    getState(): ToastState;
    subscribe(listener: Listener): () => void;
    private notify;
    private isDuplicate;
    show(config: ToastConfig): void;
    private startTimer;
    private clearTimerData;
    pause(): void;
    resume(): void;
    dismiss(id?: string): void;
}
export declare const toastStore: ToastStore;
export declare const auraToast: {
    success: (content: string | Omit<ToastConfig, "type">, config?: Omit<ToastConfig, "title" | "type">) => void;
    error: (content: string | Omit<ToastConfig, "type">, config?: Omit<ToastConfig, "title" | "type">) => void;
    info: (content: string | Omit<ToastConfig, "type">, config?: Omit<ToastConfig, "title" | "type">) => void;
    warning: (content: string | Omit<ToastConfig, "type">, config?: Omit<ToastConfig, "title" | "type">) => void;
    promise: <T>(promise: Promise<T>, msgs: {
        loading: string | Omit<ToastConfig, "type">;
        success: string | Omit<ToastConfig, "type">;
        error: string | Omit<ToastConfig, "type">;
    }, config?: Omit<ToastConfig, "title" | "type">) => Promise<T>;
    dismiss: (id?: string) => void;
    pause: () => void;
    resume: () => void;
};
export {};
