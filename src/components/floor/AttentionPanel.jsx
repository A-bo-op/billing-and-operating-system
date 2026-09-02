import React from 'react';
import { AlertTriangle, ArrowRight, Package, Utensils } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const AttentionPanel = () => {
  const { lowStockIngredients, tables, setCurrentTab, openTableOrder } = useAppState();

  const occupiedTablesWithPendingKot = tables.filter(t => t.status === 'occupied' && t.pendingKot);

  if (lowStockIngredients.length === 0 && occupiedTablesWithPendingKot.length === 0) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: '#FFFBEB',
      border: '1px solid #FDE68A',
      borderRadius: '8px',
      padding: '14px 18px',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <AlertTriangle size={18} color="#D97706" />
        <span style={{ fontSize: '14px', fontWeight: '700', color: '#92400E' }}>
          Needs Attention ({lowStockIngredients.length + occupiedTablesWithPendingKot.length})
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '13px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={15} color="#D97706" />
              <span style={{ fontWeight: '600', color: '#111827' }}>{ing.name}</span>
              <span style={{ color: '#DC2626', fontWeight: '700' }}>is running low — {ing.stock} {ing.unit} left</span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>(Threshold: {ing.minStock} {ing.unit})</span>
            </div>

            <button
              onClick={() => setCurrentTab('inventory')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                border: 'none',
                background: 'transparent',
                color: '#3366FF',
                fontWeight: '600',
                fontSize: '12px',
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
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '13px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Utensils size={15} color="#2563EB" />
              <span style={{ fontWeight: '700', color: '#111827' }}>Table {tbl.name}</span>
              <span style={{ color: '#D97706', fontWeight: '600' }}>has items waiting to be sent to kitchen</span>
            </div>

            <button
              onClick={() => openTableOrder(tbl.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                border: 'none',
                background: 'transparent',
                color: '#3366FF',
                fontWeight: '600',
                fontSize: '12px',
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
