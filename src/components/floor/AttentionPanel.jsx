import React from 'react';
import { AlertTriangle, ArrowRight, Package, Utensils, Bike } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const AttentionPanel = () => {
  const {
    lowStockIngredients,
    tables,
    onlineOrders,
    setCurrentTab,
    openTableOrder,
  } = useAppState();

  const occupiedTablesWithPendingKot = tables.filter(t => t.status === 'occupied' && t.pendingKot);
  const incomingOnlineOrders = onlineOrders.filter(o => o.stage === 'incoming');

  const totalAlertCount = lowStockIngredients.length + occupiedTablesWithPendingKot.length + incomingOnlineOrders.length;

  if (totalAlertCount === 0) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: '#FFFBEB',
      border: '1px solid #FDE68A',
      borderRadius: '12px',
      padding: '16px 20px',
      marginBottom: '24px',
      boxShadow: '0 2px 8px rgba(245, 158, 11, 0.08)'
    }} className="animate-slide-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <AlertTriangle size={18} color="#D97706" />
        <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#92400E' }}>
          Needs Attention ({totalAlertCount})
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Incoming Online Delivery Orders Alert */}
        {incomingOnlineOrders.map(order => (
          <div
            key={order.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
              border: order.platform === 'zomato' ? '1px solid #FECACA' : '1px solid #FED7AA',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '13.5px',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                backgroundColor: order.platform === 'zomato' ? '#E23744' : '#FC8019',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '800'
              }}>
                <Bike size={15} />
              </div>
              <div>
                <span style={{ fontWeight: '800', color: '#0F172A' }}>
                  {order.platform.toUpperCase()} {order.orderNo}
                </span>
                <span style={{ color: '#E11D48', fontWeight: '700', marginLeft: '6px' }}>
                  New Incoming Online Order &bull; ₹{order.totalBill} ({order.items.length} items)
                </span>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab('online-orders')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                border: 'none',
                backgroundColor: order.platform === 'zomato' ? '#FEF2F2' : '#FFF7ED',
                color: order.platform === 'zomato' ? '#E23744' : '#FC8019',
                fontWeight: '700',
                fontSize: '12.5px',
                padding: '5px 10px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <span>Accept / View</span>
              <ArrowRight size={13} />
            </button>
          </div>
        ))}

        {/* Low Stock Alerts */}
        {lowStockIngredients.map(ing => (
          <div
            key={ing.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
              border: '1px solid #FCD34D',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '13.5px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={16} color="#D97706" />
              <span style={{ fontWeight: '700', color: '#0F172A' }}>{ing.name}</span>
              <span style={{ color: '#DC2626', fontWeight: '700' }}>is running low — {ing.stock} {ing.unit} left</span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>(Threshold: {ing.minStock} {ing.unit})</span>
            </div>

            <button
              onClick={() => setCurrentTab('inventory')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                border: 'none',
                background: 'transparent',
                color: '#3B82F6',
                fontWeight: '700',
                fontSize: '12.5px',
                cursor: 'pointer'
              }}
            >
              <span>Manage Stock</span>
              <ArrowRight size={13} />
            </button>
          </div>
        ))}

        {/* Pending KOT alerts */}
        {occupiedTablesWithPendingKot.map(tbl => (
          <div
            key={tbl.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#FFFFFF',
              border: '1px solid #BFDBFE',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '13.5px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Utensils size={16} color="#2563EB" />
              <span style={{ fontWeight: '800', color: '#0F172A' }}>Table {tbl.name}</span>
              <span style={{ color: '#D97706', fontWeight: '700' }}>has items waiting to be sent to kitchen</span>
            </div>

            <button
              onClick={() => openTableOrder(tbl.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                border: 'none',
                background: 'transparent',
                color: '#3B82F6',
                fontWeight: '700',
                fontSize: '12.5px',
                cursor: 'pointer'
              }}
            >
              <span>Open Table</span>
              <ArrowRight size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
