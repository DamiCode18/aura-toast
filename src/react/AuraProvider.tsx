import React, { useEffect, useState } from 'react';
import { ToastState } from '../types';
import { toastStore } from '../core/ToastStore';
import { AuraToast } from './AuraToast';
import '../styles/aura-toast.css';

export const AuraProvider: React.FC<{ children: React.ReactNode, className?: string, stack?: boolean }> = ({ children, className, stack = false }) => {
  const [toasts, setToasts] = useState<ToastState>([]);
  const [heights, setHeights] = useState<Record<string, number>>({});
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    return toastStore.subscribe((newState) => {
      setToasts(newState || []);
    });
  }, []);

  const visibleToasts = stack ? toasts : toasts.slice(0, 1);
  const position = toasts.length > 0 ? toasts[0].position || 'top-right' : 'top-right';
  const isTop = position.startsWith('top');

  let currentHoverOffset = 0;

  return (
    <div className={className}>
      {children}
      <div 
        className={`aura-container ${position}`} 
        data-stack={stack}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {visibleToasts.map((toast, index) => {
          const height = heights[toast.id!] || 80;
          
          const hoverY = currentHoverOffset;
          currentHoverOffset += height + 16;
          
          const stackY = index * 16; 
          
          let y = 0;
          if (stack) {
             y = isHovered ? hoverY : stackY;
          }
          
          const translateY = isTop ? y : -y;
          const scale = (stack && !isHovered) ? Math.max(0, 1 - index * 0.03) : 1;
          const zIndex = 100 - index;
          const opacity = (stack && !isHovered && index > 3) ? 0 : 1;

          return (
            <div 
              key={toast.id}
              className="aura-toast-wrapper"
              style={{
                gridArea: stack ? '1 / 1' : 'auto',
                zIndex,
                transform: `translateY(${translateY}px) scale(${scale})`,
                transformOrigin: isTop ? 'top center' : 'bottom center',
                opacity,
                transition: 'all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                pointerEvents: 'auto',
                paddingBottom: isHovered && stack && isTop ? '16px' : '0',
                paddingTop: isHovered && stack && !isTop ? '16px' : '0',
              }}
            >
              <AuraToast 
                config={toast}
                isStacked={stack}
                onHeight={(h) => {
                  setHeights(prev => prev[toast.id!] === h ? prev : { ...prev, [toast.id!]: h });
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
