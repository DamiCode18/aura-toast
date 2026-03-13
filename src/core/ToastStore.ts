import { ToastConfig, ToastState, Listener } from '../types';

class ToastStore {
  private state: ToastState = null;
  private listeners: Set<Listener> = new Set();
  private timeoutId: NodeJS.Timeout | null = null;

  getState(): ToastState {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  show(config: ToastConfig) {
    // Clear existing timeout if any
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    // Force a small delay to trigger re-animation if the same message is shown
    // or if we want to ensure the "dismiss then show" feel.
    // However, the user wants it to FEEL like it's replaced.
    
    const id = config.id || Math.random().toString(36).substring(2, 9);
    this.state = { 
      ...config, 
      id,
      type: config.type || 'info',
      duration: config.duration ?? 4000 
    };
    
    this.notify();

    if (this.state && this.state.duration && this.state.duration > 0) {
      this.timeoutId = setTimeout(() => {
        this.dismiss();
      }, this.state.duration);
    }
  }

  dismiss() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.state = null;
    this.notify();
  }
}

export const toastStore = new ToastStore();

export const auraToast = {
  success: (message: string, config?: Omit<ToastConfig, 'message' | 'type'>) => 
    toastStore.show({ ...config, message, type: 'success' }),
  error: (message: string, config?: Omit<ToastConfig, 'message' | 'type'>) => 
    toastStore.show({ ...config, message, type: 'error' }),
  info: (message: string, config?: Omit<ToastConfig, 'message' | 'type'>) => 
    toastStore.show({ ...config, message, type: 'info' }),
  warning: (message: string, config?: Omit<ToastConfig, 'message' | 'type'>) => 
    toastStore.show({ ...config, message, type: 'warning' }),
  dismiss: () => toastStore.dismiss(),
};
