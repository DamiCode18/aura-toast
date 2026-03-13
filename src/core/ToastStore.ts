import { ToastConfig, ToastState, Listener } from '../types';

class ToastStore {
  private state: ToastState = null;
  private listeners: Set<Listener> = new Set();
  private timeoutId: NodeJS.Timeout | null = null;
  private startTime: number | null = null;
  private remainingDuration: number | null = null;

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

  private isDuplicate(config: ToastConfig): boolean {
    if (!this.state) return false;
    
    return (
      this.state.message === config.message &&
      (this.state.type || 'info') === (config.type || 'info') &&
      this.state.description === config.description &&
      this.state.glassy === config.glassy
    );
  }

  show(config: ToastConfig) {
    if (this.isDuplicate(config)) {
      const duration = config.duration ?? 4000;
      if (duration > 0) {
        this.startTime = Date.now();
        this.remainingDuration = duration;
        this.startTimer(duration);
      }
      return;
    }

    this.dismiss();

    const id = config.id || Math.random().toString(36).substring(2, 9);
    const duration = config.duration ?? 4000;
    
    this.state = { 
      ...config, 
      id,
      type: config.type || 'info',
      duration 
    };
    
    this.notify();

    if (duration > 0) {
      this.startTime = Date.now();
      this.remainingDuration = duration;
      this.startTimer(duration);
    }
  }

  private startTimer(duration: number) {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.dismiss();
    }, duration);
  }

  pause() {
    if (!this.state || !this.timeoutId || !this.startTime) return;
    
    clearTimeout(this.timeoutId);
    this.timeoutId = null;
    
    const elapsed = Date.now() - this.startTime;
    this.remainingDuration = Math.max(0, (this.remainingDuration || 0) - elapsed);
    this.startTime = null;
  }

  resume() {
    if (!this.state || this.timeoutId || this.remainingDuration === null || this.remainingDuration <= 0) return;
    
    this.startTime = Date.now();
    this.startTimer(this.remainingDuration);
  }

  dismiss() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.state = null;
    this.startTime = null;
    this.remainingDuration = null;
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
  pause: () => toastStore.pause(),
  resume: () => toastStore.resume(),
};
