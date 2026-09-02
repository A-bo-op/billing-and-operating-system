import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const Toast = () => {
  const { toast } = useAppState();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#16A34A" />,
    warning: <AlertTriangle size={18} color="#D97706" />,
    error: <AlertCircle size={18} color="#DC2626" />,
    info: <Info size={18} color="#2563EB" />,
  };

  const bgColors = {
    success: '#F0FDF4',
    warning: '#FFFBEB',
    error: '#FEF2F2',
    info: '#EFF6FF',
  };

  const borderColors = {
    success: '#BBF7D0',
    warning: '#FDE68A',
    error: '#FCA5A5',
    info: '#BFDBFE',
  };

  const textColors = {
    success: '#15803D',
    warning: '#B45309',
    error: '#B91C1C',
    info: '#1D4ED8',
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: bgColors[toast.type] || bgColors.success,
      border: `1px solid ${borderColors[toast.type] || borderColors.success}`,
      color: textColors[toast.type] || textColors.success,
      padding: '12px 18px',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      fontWeight: '600',
      zIndex: 10000,
      animation: 'slideUp 0.2s ease-out'
    }}>
      {icons[toast.type] || icons.success}
      <span>{toast.message}</span>
    </div>
  );
};
