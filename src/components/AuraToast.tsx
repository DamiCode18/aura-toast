'use client';
import React, { useEffect, useState } from 'react';
import { ToastConfig } from '../types';
import { toastStore, auraToast } from '../core/ToastStore';

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

const LoadingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="aura-spinner">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

export const AuraToast: React.FC<{ 
  config: ToastConfig, 
  index?: number, 
  isStacked?: boolean, 
  totalToasts?: number,
  onHeight?: (h: number) => void
}> = ({ config, index = 0, isStacked = false, totalToasts = 1, onHeight }) => {
  const [isExiting, setIsExiting] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && onHeight) {
      onHeight(ref.current.getBoundingClientRect().height);
    }
    const handleResize = () => {
      if (ref.current && onHeight) {
        onHeight(ref.current.getBoundingClientRect().height);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [config.title, config.description, onHeight]);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      toastStore.dismiss(config.id);
    }, 300); // Match CSS fade-out animation
  };

  const Icon = {
    success: SuccessIcon,
    error: ErrorIcon,
    info: InfoIcon,
    warning: WarningIcon,
    loading: LoadingIcon,
  }[config.type || 'info'];

  return (
    <div 
      ref={ref}
      className={`aura-toast ${config.type || 'info'} ${config.glassy !== false ? 'aura-toast-glassy' : ''} ${isExiting ? 'aura-toast-exit' : 'aura-toast-enter'} ${config.className || ''}`}
      onMouseEnter={() => auraToast.pause()}
      onMouseLeave={() => auraToast.resume()}
      style={{
        ...config.style,
        ...((config.style as any)?.['--type-color'] ? { '--type-color': (config.style as any)['--type-color'] } : {}),
        ...((config.style as any)?.['--type-glow'] ? { '--type-glow': (config.style as any)['--type-glow'] } : {}),
        ...((config.style as any)?.['--toast-font-size-title'] ? { '--toast-font-size-title': (config.style as any)['--toast-font-size-title'] } : {}),
        ...((config.style as any)?.['--toast-font-size-desc'] ? { '--toast-font-size-desc': (config.style as any)['--toast-font-size-desc'] } : {}),
      } as React.CSSProperties}
    >
      <div className="aura-icon-container">
        <div className="aura-icon">
          <Icon />
        </div>
      </div>
      <div className="aura-content">
        {config.title && <p className="aura-title">{config.title}</p>}
        {config.description && <p className="aura-description">{config.description}</p>}
      </div>
      {config.action && (
        <div className="aura-action-container">
          <button className="aura-action" onClick={() => {
            config.action?.onClick();
            handleDismiss();
          }}>
            {config.action.label}
          </button>
        </div>
      )}
      <button className="aura-close" onClick={handleDismiss} aria-label="Close">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};
