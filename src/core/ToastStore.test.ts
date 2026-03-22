import { describe, it, expect, beforeEach, vi } from 'vitest';
import { toastStore } from './ToastStore';

describe('ToastStore', () => {
  beforeEach(() => {
    toastStore.dismiss();
    vi.useFakeTimers();
  });

  it('should start with empty array state', () => {
    expect(toastStore.getState()).toEqual([]);
  });

  it('should show a toast and notify listeners', () => {
    const listener = vi.fn();
    toastStore.subscribe(listener);

    toastStore.show({ title: 'Test title', type: 'success' });

    const state = toastStore.getState();
    expect(state.length).toBe(1);
    expect(state[0].title).toBe('Test title');
    expect(state[0].type).toBe('success');
    expect(listener).toHaveBeenCalledWith(state);
  });

  it('should enforce a max toasts constraint of 5', () => {
    for (let i = 0; i < 6; i++) {
      toastStore.show({ title: `Toast ${i}`, type: 'info' });
    }
    const state = toastStore.getState();
    expect(state.length).toBe(5);
    // The oldest toast (Toast 0) should have been removed
    expect(state[state.length - 1].title).toBe('Toast 1');
    expect(state[0].title).toBe('Toast 5');
  });

  it('should auto-dismiss after duration', () => {
    toastStore.show({ title: 'Auto-dismiss', duration: 1000 });
    expect(toastStore.getState().length).toBe(1);

    vi.advanceTimersByTime(1000);
    expect(toastStore.getState().length).toBe(0);
  });

  it('should keep other toasts when one is auto-dismissed', () => {
    toastStore.show({ id: '1', title: 'First', duration: 1000 });
    toastStore.show({ id: '2', title: 'Second', duration: 2000 });

    vi.advanceTimersByTime(1000);
    const state1 = toastStore.getState();
    expect(state1.length).toBe(1);
    expect(state1[0].title).toBe('Second');

    vi.advanceTimersByTime(1000);
    const state2 = toastStore.getState();
    expect(state2.length).toBe(0);
  });

  it('should dismiss manually generally or by id', () => {
    toastStore.show({ id: '1', title: 'First' });
    toastStore.show({ id: '2', title: 'Second' });
    
    // Dismiss specific id
    toastStore.dismiss('1');
    expect(toastStore.getState().length).toBe(1);
    expect(toastStore.getState()[0].title).toBe('Second');
    
    // Dismiss all
    toastStore.dismiss();
    expect(toastStore.getState().length).toBe(0);
  });

  it('should not notify listeners and should reset timeout when showing a duplicate toast', () => {
    const listener = vi.fn();
    const config = { title: 'Duplicate', duration: 1000 };
    
    toastStore.show(config);
    toastStore.subscribe(listener);

    // Show same toast again
    toastStore.show(config);

    // Only duplicate check happens, no initial notify
    expect(listener).not.toHaveBeenCalled();
    
    // Advance time - should still be visible because timer was reset
    vi.advanceTimersByTime(500);
    expect(toastStore.getState().length).toBe(1);

    // Advance time further - should be dismissed now (1000 elapsed total wait, originally 1500 limit crossed)
    vi.advanceTimersByTime(500);
    expect(toastStore.getState().length).toBe(0);
  });

  it('should treat different themes as distinct toasts', () => {
    toastStore.show({ title: 'Theme test', type: 'info', theme: 'dark' });
    toastStore.show({ title: 'Theme test', type: 'info', theme: 'light' });

    const state = toastStore.getState();
    expect(state.length).toBe(2);
    expect(state[0].theme).toBe('light');
    expect(state[1].theme).toBe('dark');
  });
});
