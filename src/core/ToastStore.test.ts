import { describe, it, expect, beforeEach, vi } from 'vitest';
import { toastStore } from './ToastStore';

describe('ToastStore', () => {
  beforeEach(() => {
    toastStore.dismiss();
    vi.useFakeTimers();
  });

  it('should start with null state', () => {
    expect(toastStore.getState()).toBeNull();
  });

  it('should show a toast and notify listeners', () => {
    const listener = vi.fn();
    toastStore.subscribe(listener);

    toastStore.show({ message: 'Test message', type: 'success' });

    const state = toastStore.getState();
    expect(state).not.toBeNull();
    expect(state?.message).toBe('Test message');
    expect(state?.type).toBe('success');
    expect(listener).toHaveBeenCalledWith(state);
  });

  it('should enforce a single toast constraint', () => {
    toastStore.show({ message: 'First toast', type: 'info' });
    const firstId = toastStore.getState()?.id;

    toastStore.show({ message: 'Second toast', type: 'warning' });
    const secondState = toastStore.getState();

    expect(secondState?.message).toBe('Second toast');
    expect(secondState?.id).not.toBe(firstId);
  });

  it('should auto-dismiss after duration', () => {
    toastStore.show({ message: 'Auto-dismiss', duration: 1000 });
    expect(toastStore.getState()).not.toBeNull();

    vi.advanceTimersByTime(1000);
    expect(toastStore.getState()).toBeNull();
  });

  it('should cancel previous timeout when showing a new toast', () => {
    toastStore.show({ message: 'First', duration: 1000 });
    toastStore.show({ message: 'Second', duration: 2000 });

    vi.advanceTimersByTime(1000);
    expect(toastStore.getState()?.message).toBe('Second');

    vi.advanceTimersByTime(1000);
    expect(toastStore.getState()).toBeNull();
  });

  it('should dismiss manually', () => {
    toastStore.show({ message: 'Dismiss me' });
    toastStore.dismiss();
    expect(toastStore.getState()).toBeNull();
  });
});
