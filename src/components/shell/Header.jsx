import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, ChevronDown, Store, Sparkles, Wifi } from 'lucide-react';
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
      height: '60px',
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      userSelect: 'none',
      boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)',
      zIndex: 9
    }}>
      {/* Left Outlet Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: '700',
          color: '#0F172A',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)'
        }}>
          <Store size={16} color="#3B82F6" />
          <span>{restaurantInfo.outlet}</span>
          <span style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#10B981',
            boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.25)',
            display: 'inline-block',
            marginLeft: '2px'
          }} title="Outlet Online & Synced" />
        </div>

        <span style={{ fontSize: '13px', color: '#E2E8F0' }}>|</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#64748B', fontWeight: '500' }}>
          <Wifi size={14} color="#10B981" />
          <span>Terminal #1 &bull; Main Counter</span>
        </div>
      </div>

      {/* Right Time & User Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Live Time Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          color: '#475569',
          fontWeight: '500',
          padding: '6px 14px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '8px'
        }}>
          <Clock size={15} color="#64748B" />
          <span>{dateString}</span>
          <span style={{
            fontWeight: '800',
            color: '#0F172A',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '0.02em'
          }}>
            {timeString}
          </span>
        </div>

        {/* Role Switcher & User Profile */}
        <button
          onClick={onOpenRoleModal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '5px 12px 5px 6px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '999px',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#93C5FD';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(59, 130, 246, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#CBD5E1';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.05)';
          }}
          title="Click to switch employee role & permissions"
        >
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
            color: '#FFFFFF',
            borderRadius: '50%',
            fontSize: '13px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(59, 130, 246, 0.3)'
          }}>
            {activeUser.avatar}
          </div>

          <div style={{ textAlign: 'left', lineHeight: 1.25 }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{activeUser.name}</div>
            <div style={{ fontSize: '11px', color: '#2563EB', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ShieldCheck size={11} />
              <span>{activeUserRole}</span>
            </div>
          </div>

          <ChevronDown size={14} color="#64748B" style={{ marginLeft: '2px' }} />
        </button>
      </div>
    </header>
  );
};
