import React from 'react';
import { ShoppingBag, Bike, Users, IndianRupee, CheckCircle2, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';
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
    <div style={{ padding: '28px 32px', maxWidth: '1440px', margin: '0 auto' }} className="animate-fade-in">
      {/* Top Heading & Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="title-page">Dining Floor Management</h1>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              padding: '3px 10px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              borderRadius: '99px',
              border: '1px solid #DBEAFE'
            }}>
              {tables.length} Active Tables
            </span>
          </div>
          <div style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
            Real-time table occupancy, guest orders, and quick actions
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={startTakeawayOrder} style={{ height: '42px', padding: '0 18px' }}>
            <ShoppingBag size={17} color="#3B82F6" />
            <span>New Takeaway</span>
          </button>

          <button className="btn btn-primary" onClick={startDeliveryOrder} style={{ height: '42px', padding: '0 18px' }}>
            <Bike size={17} color="#FFFFFF" />
            <span>New Delivery</span>
          </button>
        </div>
      </div>

      {/* Operational KPI Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* Free Tables Card */}
        <div className="card-panel card-panel-hover" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%)',
          borderLeft: '4px solid #10B981'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: '#ECFDF5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #A7F3D0',
            boxShadow: '0 2px 6px rgba(16, 185, 129, 0.15)'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#059669', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {freeCount} Free
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px', fontWeight: '500' }}>Available tables</div>
          </div>
        </div>

        {/* Occupied Card */}
        <div className="card-panel card-panel-hover" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #EFF6FF 100%)',
          borderLeft: '4px solid #3B82F6'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #BFDBFE',
            boxShadow: '0 2px 6px rgba(59, 130, 246, 0.15)'
          }}>
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#2563EB', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {occupiedCount} Occupied
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px', fontWeight: '500' }}>Active dining</div>
          </div>
        </div>

        {/* Today's Sales Card */}
        <div className="card-panel card-panel-hover" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: '#FFFFFF',
          borderLeft: '4px solid #6366F1'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: '#EEF2FF',
            color: '#4F46E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #C7D2FE',
            boxShadow: '0 2px 6px rgba(99, 102, 241, 0.15)'
          }}>
            <IndianRupee size={22} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              ₹{todaysSales.toLocaleString()}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px', fontWeight: '500' }}>Today's Revenue</div>
          </div>
        </div>

        {/* Orders Billed Card */}
        <div className="card-panel card-panel-hover" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: '#FFFFFF',
          borderLeft: '4px solid #10B981'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: '#ECFDF5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #A7F3D0'
          }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {todaysBilledCount}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px', fontWeight: '500' }}>Paid Invoices</div>
          </div>
        </div>

        {/* Staff Duty Card */}
        <div className="card-panel card-panel-hover" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          background: '#FFFFFF',
          borderLeft: '4px solid #F59E0B'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: '#FFFBEB',
            color: '#D97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #FDE68A'
          }}>
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {staffOnDutyCount}/{staffList.length}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px', fontWeight: '500' }}>Staff on Shift</div>
          </div>
        </div>
      </div>

      {/* Actionable Attention Panel */}
      <AttentionPanel />

      {/* Table Grid Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 className="title-section">Dining Floor Layout</h2>
          <span style={{ fontSize: '13px', color: '#94A3B8' }}>&bull; Ground Floor Main Hall</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12.5px', color: '#64748B', fontWeight: '600' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} /> Free
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3B82F6' }} /> Occupied
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} /> Pending KOT
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '18px'
      }}>
        {tables.map(table => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </div>
  );
};
