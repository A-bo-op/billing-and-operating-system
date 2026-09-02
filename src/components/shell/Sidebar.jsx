import React from 'react';
import {
  LayoutGrid,
  ShoppingCart,
  UtensilsCrossed,
  Package,
  Truck,
  FileText,
  BarChart3,
  Users,
  PieChart,
  Settings,
  AlertCircle,
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const Sidebar = () => {
  const { currentTab, setCurrentTab, lowStockIngredients, tables } = useAppState();

  // Calculate table attention count
  const tableAttentionCount = tables.filter(t => t.status === 'occupied' && t.pendingKot).length;
  const lowStockCount = lowStockIngredients.length;

  const navItems = [
    { id: 'tables', label: 'Tables', icon: LayoutGrid, badge: tableAttentionCount > 0 ? tableAttentionCount : null, badgeColor: 'amber' },
    { id: 'pos', label: 'Orders', icon: ShoppingCart },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'inventory', label: 'Inventory', icon: Package, badge: lowStockCount > 0 ? lowStockCount : null, badgeColor: 'red' },
    { id: 'purchases', label: 'Purchases', icon: Truck },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'reports', label: 'Reports', icon: PieChart },
  ];

  return (
    <aside style={{
      width: '200px',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      borderRight: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      userSelect: 'none'
    }}>
      {/* Top Logo */}
      <div style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid #F1F5F9'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          backgroundColor: '#3366FF',
          borderRadius: '8px',
          color: '#FFFFFF',
          fontWeight: '700',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(51,102,255,0.2)'
        }}>
          NF
        </div>
        <div>
          <div style={{ fontWeight: '700', fontSize: '16px', color: '#111827', lineHeight: 1.1 }}>Navafi</div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>POS & Ops</div>
        </div>
      </div>

      {/* Main Navigation List */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                marginBottom: '4px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                color: isActive ? '#3366FF' : '#475569',
                fontWeight: isActive ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <IconComponent size={18} color={isActive ? '#3366FF' : '#64748B'} />
                <span>{item.label}</span>
              </div>

              {item.badge !== null && item.badge !== undefined && (
                <span style={{
                  backgroundColor: item.badgeColor === 'red' ? '#DC2626' : '#D97706',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '2px 6px',
                  borderRadius: '999px',
                  lineHeight: 1
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Settings */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid #F1F5F9' }}>
        <button
          onClick={() => setCurrentTab('settings')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: currentTab === 'settings' ? '#EFF6FF' : 'transparent',
            color: currentTab === 'settings' ? '#3366FF' : '#475569',
            fontWeight: '500',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <Settings size={18} color="#64748B" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};
