import React from 'react';
import { MenuGrid } from './MenuGrid';
import { OrderPanel } from './OrderPanel';

export const PosView = () => {
  return (
    <div style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: '#F8FAFC',
      overflow: 'hidden'
    }}>
      <MenuGrid />
      <OrderPanel />
    </div>
  );
};
