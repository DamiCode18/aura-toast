import React, { useEffect, useState } from 'react';
import { ToastState } from '../types';
import { toastStore } from '../core/ToastStore';
import { AuraToast } from './AuraToast';
import '../styles/aura-toast.css';

export const AuraProvider: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    return toastStore.subscribe((newState) => {
      setToast(newState);
    });
  }, []);

  return (
    <div className={className}>
      {children}
      <div className={`aura-container ${toast?.position || 'top-right'}`}>
        {toast && (
          <AuraToast 
            key={toast.id} // Key ensures the component re-mounts for animations when toast changes
            config={toast} 
          />
        )}
      </div>
    </div>
  );
};
