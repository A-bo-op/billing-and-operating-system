import React from 'react';
import { Users, Clock, Utensils, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const TableCard = ({ table }) => {
  const { openTableOrder, orders } = useAppState();

  const isOccupied = table.status === 'occupied';
  const tableOrder = isOccupied ? orders.find(o => o.id === table.orderId) : null;
  const itemCount = tableOrder ? tableOrder.items.reduce((acc, i) => acc + i.quantity, 0) : 0;
  const totalAmount = tableOrder ? tableOrder.total : 0;

  return (
    <div
      onClick={() => openTableOrder(table.id)}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: isOccupied
          ? table.pendingKot ? '1.5px solid #F59E0B' : '1.5px solid #3B82F6'
          : '1px solid #E2E8F0',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        boxShadow: isOccupied
          ? table.pendingKot ? '0 4px 14px rgba(245, 158, 11, 0.12)' : '0 4px 14px rgba(59, 130, 246, 0.12)'
          : '0 1px 3px rgba(15, 23, 42, 0.04)',
        position: 'relative',
        minHeight: '160px',
        background: isOccupied
          ? table.pendingKot
            ? 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF5 100%)'
            : 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFF 100%)'
          : '#FFFFFF'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = isOccupied
          ? '0 10px 20px rgba(59, 130, 246, 0.18)'
          : '0 10px 20px rgba(15, 23, 42, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = isOccupied
          ? table.pendingKot ? '0 4px 14px rgba(245, 158, 11, 0.12)' : '0 4px 14px rgba(59, 130, 246, 0.12)'
          : '0 1px 3px rgba(15, 23, 42, 0.04)';
      }}
    >
      {/* Top Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: isOccupied
              ? table.pendingKot
                ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)'
                : 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)'
              : '#F1F5F9',
            color: isOccupied
              ? table.pendingKot ? '#B45309' : '#2563EB'
              : '#475569',
            fontWeight: '800',
            fontSize: '17px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: isOccupied
              ? table.pendingKot ? '1px solid #FCD34D' : '1px solid #BFDBFE'
              : '1px solid #E2E8F0',
            letterSpacing: '-0.02em'
          }}>
            {table.name}
          </div>

          <div>
            <div style={{ fontSize: '15.5px', fontWeight: '800', color: '#0F172A', lineHeight: 1.2 }}>
              Table {table.name}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
              <Users size={12} color="#94A3B8" />
              <span>{table.seats} Seats</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {isOccupied ? (
          <span className="badge badge-blue" style={{ fontWeight: '700' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563EB', display: 'inline-block' }} />
            Occupied
          </span>
        ) : (
          <span className="badge badge-green" style={{ fontWeight: '700' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
            Free
          </span>
        )}
      </div>

      {/* Body Content */}
      <div style={{ margin: '14px 0 10px 0' }}>
        {isOccupied ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#64748B' }}>₹</span>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.03em' }}>
                {totalAmount.toLocaleString()}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px', color: '#475569', marginTop: '4px', fontWeight: '500' }}>
              <span>{itemCount} items</span>
              <span style={{ color: '#CBD5E1' }}>&bull;</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748B' }}>
                <Clock size={13} color="#94A3B8" /> {table.elapsedMinutes} mins ago
              </span>
            </div>

            {/* KOT Status Indicator */}
            <div style={{ marginTop: '10px' }}>
              {tableOrder?.kotStatus === 'sent' ? (
                <span className="badge badge-green" style={{ fontSize: '11px', padding: '2px 8px' }}>
                  <CheckCircle2 size={11} /> KOT Sent to Kitchen
                </span>
              ) : (
                <span className="badge badge-amber" style={{ fontSize: '11px', padding: '2px 8px', fontWeight: '700' }}>
                  <Utensils size={11} /> Pending KOT
                </span>
              )}
            </div>
          </div>
        ) : (
          <div style={{ color: '#94A3B8', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 0' }}>
            <Sparkles size={14} color="#10B981" />
            <span>Ready for new guests</span>
          </div>
        )}
      </div>

      {/* Footer action prompt */}
      <div style={{
        paddingTop: '10px',
        borderTop: '1px solid #F1F5F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12.5px',
        fontWeight: '700',
        color: isOccupied ? '#2563EB' : '#64748B'
      }}>
        <span>{isOccupied ? 'View / Modify Order' : 'Tap to Create Order'}</span>
        <ChevronRight size={15} />
      </div>
    </div>
  );
};
