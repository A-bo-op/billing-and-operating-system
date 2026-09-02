import React, { useState, useEffect } from 'react';
import { Clock, UserCheck, ShieldCheck, ChevronDown, Store } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const Header = ({ onOpenRoleModal }) => {
  const { restaurantInfo, activeUser, activeUserRole } = useAppState();
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateString(now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header style={{
      height: '56px',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      userSelect: 'none'
    }}>
      {/* Left Outlet Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '6px',
          fontSize: '13px',
          fontWeight: '600',
          color: '#111827'
        }}>
          <Store size={16} color="#3366FF" />
          <span>{restaurantInfo.outlet}</span>
        </div>

        <span style={{ fontSize: '13px', color: '#94A3B8' }}>|</span>

        <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>
          Terminal #1 (Main Billing Counter)
        </span>
      </div>

      {/* Right Time & User Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Live Time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#475569', fontWeight: '500' }}>
          <Clock size={16} color="#64748B" />
          <span>{dateString}</span>
          <span style={{ fontWeight: '700', color: '#111827' }}>{timeString}</span>
        </div>

        {/* Role Switcher & User Profile */}
        <button
          onClick={onOpenRoleModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '4px 10px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease'
          }}
          title="Click to switch employee role & permissions"
        >
          <div style={{
            width: '28px',
            height: '28px',
            backgroundColor: '#3366FF',
            color: '#FFFFFF',
            borderRadius: '50%',
            fontSize: '12px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {activeUser.avatar}
          </div>

          <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{activeUser.name}</div>
            <div style={{ fontSize: '11px', color: '#3366FF', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ShieldCheck size={11} />
              <span>{activeUserRole}</span>
            </div>
          </div>

          <ChevronDown size={14} color="#64748B" />
        </button>
      </div>
    </header>
  );
};
