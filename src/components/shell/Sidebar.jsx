import React from 'react';
import {
  LayoutGrid,
  ShoppingCart,
  Bike,
  UtensilsCrossed,
  Package,
  Truck,
  FileText,
  BarChart3,
  Users,
  PieChart,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const Sidebar = () => {
  const { currentTab, setCurrentTab, lowStockIngredients, tables, incomingOnlineOrdersCount } = useAppState();

  // Calculate table attention count
  const tableAttentionCount = tables.filter(t => t.status === 'occupied' && t.pendingKot).length;
  const lowStockCount = lowStockIngredients.length;

  const navItems = [
    { id: 'tables', label: 'Tables & Floor', icon: LayoutGrid, badge: tableAttentionCount > 0 ? tableAttentionCount : null, badgeColor: 'amber' },
    { id: 'pos', label: 'Point of Sale', icon: ShoppingCart },
    { id: 'online-orders', label: 'Online Deliveries', icon: Bike, badge: incomingOnlineOrdersCount > 0 ? incomingOnlineOrdersCount : null, badgeColor: 'red' },
    { id: 'menu', label: 'Menu & Recipes', icon: UtensilsCrossed },
    { id: 'inventory', label: 'Inventory', icon: Package, badge: lowStockCount > 0 ? lowStockCount : null, badgeColor: 'red' },
    { id: 'purchases', label: 'Purchases (GRN)', icon: Truck },
    { id: 'invoices', label: 'Invoices & Billing', icon: FileText },
    { id: 'dashboard', label: 'Live Analytics', icon: BarChart3 },
    { id: 'staff', label: 'Staff & Roles', icon: Users },
    { id: 'reports', label: 'EOD Reports', icon: PieChart },
  ];

  return (
    <aside style={{
      width: '220px',
      height: '100vh',
      backgroundColor: '#FFFFFF',
      borderRight: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      userSelect: 'none',
      boxShadow: '2px 0 8px rgba(15, 23, 42, 0.02)',
      zIndex: 10
    }}>
      {/* Top Logo */}
      <div style={{
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid #F1F5F9'
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
          borderRadius: '10px',
          color: '#FFFFFF',
          fontWeight: '800',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)',
          letterSpacing: '-0.02em'
        }}>
          N
        </div>
        <div>
          <div style={{
            fontWeight: '800',
            fontSize: '17px',
            color: '#0F172A',
            letterSpacing: '-0.03em',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            Navafi
            <span style={{
              fontSize: '9px',
              padding: '2px 6px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              borderRadius: '99px',
              fontWeight: '700',
              border: '1px solid #BFDBFE'
            }}>PRO</span>
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: '500' }}>Restaurant OS</div>
        </div>
      </div>

      {/* Main Navigation List */}
      <nav style={{ flex: 1, padding: '14px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: '700',
          color: '#94A3B8',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '6px 14px 4px 14px'
        }}>
          Operations
        </div>

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
                borderRadius: '8px',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, #EFF6FF 0%, #EEF2FF 100%)' : 'transparent',
                color: isActive ? '#2563EB' : '#475569',
                fontWeight: isActive ? '700' : '500',
                fontSize: '13.5px',
                cursor: 'pointer',
                transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                boxShadow: isActive ? '0 1px 3px rgba(37, 99, 235, 0.08)' : 'none',
                borderLeft: isActive ? '3px solid #3B82F6' : '3px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.color = '#0F172A';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#475569';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <IconComponent
                  size={18}
                  color={isActive ? '#3B82F6' : '#64748B'}
                  strokeWidth={isActive ? 2.3 : 1.9}
                />
                <span>{item.label}</span>
              </div>

              {item.badge !== null && item.badge !== undefined && (
                <span style={{
                  backgroundColor: item.badgeColor === 'red' ? '#F43F5E' : '#F59E0B',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  lineHeight: 1.1,
                  boxShadow: item.badgeColor === 'red'
                    ? '0 2px 6px rgba(244, 63, 94, 0.4)'
                    : '0 2px 6px rgba(245, 158, 11, 0.4)'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Settings */}
      <div style={{ padding: '14px 10px', borderTop: '1px solid #F1F5F9' }}>
        <button
          onClick={() => setCurrentTab('settings')}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '11px',
            padding: '10px 14px',
            borderRadius: '8px',
            border: 'none',
            background: currentTab === 'settings' ? 'linear-gradient(135deg, #EFF6FF 0%, #EEF2FF 100%)' : 'transparent',
            color: currentTab === 'settings' ? '#2563EB' : '#64748B',
            fontWeight: currentTab === 'settings' ? '700' : '500',
            fontSize: '13.5px',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            borderLeft: currentTab === 'settings' ? '3px solid #3B82F6' : '3px solid transparent'
          }}
          onMouseEnter={(e) => {
            if (currentTab !== 'settings') {
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.color = '#0F172A';
            }
          }}
          onMouseLeave={(e) => {
            if (currentTab !== 'settings') {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#64748B';
            }
          }}
        >
          <Settings size={18} color={currentTab === 'settings' ? '#3B82F6' : '#64748B'} />
          <span>System Settings</span>
        </button>
      </div>
    </aside>
  );
};
