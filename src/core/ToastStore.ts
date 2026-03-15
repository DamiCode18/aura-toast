import { ToastConfig, ToastState, Listener } from '../types';

const MAX_TOASTS = 5;

class ToastStore {
  private state: ToastState = [];
  private listeners: Set<Listener> = new Set();
  
  private timeouts: Map<string, NodeJS.Timeout> = new Map();
  private startTimes: Map<string, number> = new Map();
  private remainingDurations: Map<string, number> = new Map();

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
    return this.state.some(toast => 
      toast.title === config.title &&
      (toast.type || 'info') === (config.type || 'info') &&
      toast.description === config.description &&
      toast.glassy === config.glassy
    );
  }

  show(config: ToastConfig) {
    if (this.isDuplicate(config)) {
      // Find the duplicate and restart its timer
      const duplicate = this.state.find(toast => 
        toast.title === config.title &&
        (toast.type || 'info') === (config.type || 'info') &&
        toast.description === config.description &&
        toast.glassy === config.glassy
      );
      if (duplicate && duplicate.id) {
        const duration = config.duration ?? 4000;
        if (duration > 0) {
          this.startTimes.set(duplicate.id, Date.now());
          this.remainingDurations.set(duplicate.id, duration);
          this.startTimer(duplicate.id, duration);
        }
      }
      return;
    }

    const id = config.id || Math.random().toString(36).substring(2, 9);
    const duration = config.duration ?? 4000;
    
    const newToast = { 
      ...config, 
      id,
      type: config.type || 'info',
      duration 
    };

    this.state = [newToast, ...this.state];

    if (this.state.length > MAX_TOASTS) {
      const oldestToast = this.state[this.state.length - 1];
      if (oldestToast && oldestToast.id) {
        this.clearTimerData(oldestToast.id);
      }
      this.state = this.state.slice(0, MAX_TOASTS);
    }
    
    this.notify();

    if (duration > 0) {
      this.startTimes.set(id, Date.now());
      this.remainingDurations.set(id, duration);
      this.startTimer(id, duration);
    }
  }

  private startTimer(id: string, duration: number) {
    if (this.timeouts.has(id)) {
      clearTimeout(this.timeouts.get(id));
    }
    const timeoutId = setTimeout(() => {
      this.dismiss(id);
    }, duration);
    this.timeouts.set(id, timeoutId);
  }

  private clearTimerData(id: string) {
    if (this.timeouts.has(id)) {
      clearTimeout(this.timeouts.get(id));
      this.timeouts.delete(id);
    }
    this.startTimes.delete(id);
    this.remainingDurations.delete(id);
  }

  pause() {
    this.state.forEach(toast => {
      const id = toast.id!;
      if (this.timeouts.has(id) && this.startTimes.has(id)) {
        clearTimeout(this.timeouts.get(id));
        this.timeouts.delete(id);
        
        const startTime = this.startTimes.get(id)!;
        const elapsed = Date.now() - startTime;
        const currentRemaining = this.remainingDurations.get(id) || 0;
        
        this.remainingDurations.set(id, Math.max(0, currentRemaining - elapsed));
        this.startTimes.delete(id);
      }
    });
  }

  resume() {
    this.state.forEach(toast => {
      const id = toast.id!;
      const remaining = this.remainingDurations.get(id);
      
      if (!this.timeouts.has(id) && remaining !== undefined && remaining > 0) {
        this.startTimes.set(id, Date.now());
        this.startTimer(id, remaining);
      }
    });
  }

  dismiss(id?: string) {
    if (id) {
      this.clearTimerData(id);
      this.state = this.state.filter(toast => toast.id !== id);
    } else {
      this.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
      this.timeouts.clear();
      this.startTimes.clear();
      this.remainingDurations.clear();
      this.state = [];
    }
    this.notify();
  }
}

export const toastStore = new ToastStore();

export const auraToast = {
  success: (content: string | Omit<ToastConfig, 'type'>, config?: Omit<ToastConfig, 'title' | 'type'>) => {
    const finalConfig = typeof content === 'string' ? { ...config, title: content } : { ...config, ...content };
    return toastStore.show({ ...finalConfig, type: 'success' });
  },
  error: (content: string | Omit<ToastConfig, 'type'>, config?: Omit<ToastConfig, 'title' | 'type'>) => {
    const finalConfig = typeof content === 'string' ? { ...config, title: content } : { ...config, ...content };
    return toastStore.show({ ...finalConfig, type: 'error' });
  },
  info: (content: string | Omit<ToastConfig, 'type'>, config?: Omit<ToastConfig, 'title' | 'type'>) => {
    const finalConfig = typeof content === 'string' ? { ...config, title: content } : { ...config, ...content };
    return toastStore.show({ ...finalConfig, type: 'info' });
  },
  warning: (content: string | Omit<ToastConfig, 'type'>, config?: Omit<ToastConfig, 'title' | 'type'>) => {
    const finalConfig = typeof content === 'string' ? { ...config, title: content } : { ...config, ...content };
    return toastStore.show({ ...finalConfig, type: 'warning' });
  },
  promise: <T>(
    promise: Promise<T>, 
    msgs: { 
      loading: string | Omit<ToastConfig, 'type'>; 
      success: string | Omit<ToastConfig, 'type'>; 
      error: string | Omit<ToastConfig, 'type'> 
    }, 
    config?: Omit<ToastConfig, 'title' | 'type'>
  ) => {
    const id = config?.id || Math.random().toString(36).substring(2, 9);
    
    const loadingConfig = typeof msgs.loading === 'string' ? { ...config, title: msgs.loading } : { ...config, ...msgs.loading };
    toastStore.show({ ...loadingConfig, id, type: 'loading', duration: 0 });
    
    promise
      .then(() => {
        toastStore.dismiss(id);
        const successConfig = typeof msgs.success === 'string' ? { ...config, title: msgs.success } : { ...config, ...msgs.success };
        toastStore.show({ ...successConfig, id, type: 'success' });
      })
      .catch(() => {
        toastStore.dismiss(id);
        const errorConfig = typeof msgs.error === 'string' ? { ...config, title: msgs.error } : { ...config, ...msgs.error };
        toastStore.show({ ...errorConfig, id, type: 'error' });
      });
      
    return promise;
  },
  dismiss: (id?: string) => toastStore.dismiss(id),
  pause: () => toastStore.pause(),
  resume: () => toastStore.resume(),
};
