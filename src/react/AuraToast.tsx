import React, { useEffect, useState } from 'react';
import { ToastConfig } from '../types';
import { toastStore } from '../core/ToastStore';

const SuccessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const WarningIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const AuraToast: React.FC<{ config: ToastConfig }> = ({ config }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      toastStore.dismiss();
    }, 300); // Match CSS fade-out animation
  };

  const Icon = {
    success: SuccessIcon,
    error: ErrorIcon,
    info: InfoIcon,
    warning: WarningIcon,
  }[config.type || 'info'];

  return (
    <div 
      className={`aura-toast ${config.type || 'info'} ${isExiting ? 'aura-toast-exit' : 'aura-toast-enter'} ${config.className || ''}`}
      style={{
        ...config.style,
        ...((config.style as any)?.['--type-color'] ? { '--type-color': (config.style as any)['--type-color'] } : {}),
        ...((config.style as any)?.['--type-glow'] ? { '--type-glow': (config.style as any)['--type-glow'] } : {}),
      } as React.CSSProperties}
    >
      <div className="aura-icon">
        <Icon />
      </div>
      <div className="aura-content">
        <p className="aura-message">{config.message}</p>
        {config.action && (
          <button className="aura-action" onClick={() => {
            config.action?.onClick();
            handleDismiss();
          }}>
            {config.action.label}
          </button>
        )}
      </div>
      <button className="aura-close" onClick={handleDismiss} aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};
