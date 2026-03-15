import { default as React } from '../react';
import { ToastConfig } from '../types';

export declare const AuraToast: React.FC<{
    config: ToastConfig;
    index?: number;
    isStacked?: boolean;
    totalToasts?: number;
    onHeight?: (h: number) => void;
}>;
