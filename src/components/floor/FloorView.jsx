import React from 'react';
import { Plus, ShoppingBag, Bike, Users, DollarSign, CheckSquare, Sparkles } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { TableCard } from './TableCard';
import { AttentionPanel } from './AttentionPanel';

export const FloorView = () => {
  const {
    tables,
    todaysSales,
    todaysBilledCount,
    staffOnDutyCount,
    staffList,
    startTakeawayOrder,
    startDeliveryOrder,
  } = useAppState();

  const freeCount = tables.filter(t => t.status === 'free').length;
  const occupiedCount = tables.filter(t => t.status === 'occupied').length;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Top Heading & Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 className="title-page">Floor — {tables.length} tables</h1>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
            Dine-in floor status & active table management
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={startTakeawayOrder}>
            <ShoppingBag size={16} color="#3366FF" />
            <span>New Takeaway</span>
          </button>

          <button className="btn btn-primary" onClick={startDeliveryOrder}>
            <Bike size={16} color="#FFFFFF" />
            <span>New Delivery</span>
          </button>
        </div>
      </div>

      {/* Operational KPI Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '14px',
        marginBottom: '20px'
      }}>
        {/* Free Tables Card */}
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            backgroundColor: '#F0FDF4',
            color: '#16A34A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #BBF7D0'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#16A34A', lineHeight: 1 }}>{freeCount} Free</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Available tables</div>
          </div>
        </div>

        {/* Occupied Card */}
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #BFDBFE'
          }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#2563EB', lineHeight: 1 }}>{occupiedCount} Occupied</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Active dining</div>
          </div>
        </div>

        {/* Today's Sales Card */}
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E2E8F0'
          }}>
            <DollarSign size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#111827', lineHeight: 1 }}>₹{todaysSales.toLocaleString()}</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Today's Revenue</div>
          </div>
        </div>

        {/* Orders Billed Card */}
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E2E8F0'
          }}>
            <CheckSquare size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#111827', lineHeight: 1 }}>{todaysBilledCount} Billed</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Completed invoices</div>
          </div>
        </div>

        {/* Staff Duty Card */}
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E2E8F0'
          }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#111827', lineHeight: 1 }}>{staffOnDutyCount}/{staffList.length} On Duty</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Staff presence</div>
          </div>
        </div>
      </div>

      {/* Actionable Attention Panel */}
      <AttentionPanel />

      {/* Table Grid */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h2 className="title-section">Dining Tables</h2>
        <span style={{ fontSize: '12px', color: '#64748B' }}>Click any free table to open order screen</span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px'
      }}>
        {tables.map(table => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </div>
  );
};
