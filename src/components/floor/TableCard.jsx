import React from 'react';
import { Users, Clock, Utensils, CheckCircle2, ChevronRight } from 'lucide-react';
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
        borderRadius: '10px',
        border: isOccupied ? '2px solid #3366FF' : '1px solid #E2E8F0',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
        boxShadow: isOccupied ? '0 4px 12px rgba(51, 102, 255, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
        position: 'relative',
        minHeight: '150px'
      }}
    >
      {/* Top Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            backgroundColor: isOccupied ? '#EFF6FF' : '#F1F5F9',
            color: isOccupied ? '#3366FF' : '#475569',
            fontWeight: '700',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: isOccupied ? '1px solid #BFDBFE' : '1px solid #CBD5E1'
          }}>
            {table.name}
          </div>

          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827', lineHeight: 1.1 }}>
              Table {table.name}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Users size={12} />
              <span>{table.seats} Seats</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {isOccupied ? (
          <span className="badge badge-blue">
            Occupied
          </span>
        ) : (
          <span className="badge badge-green">
            Free
          </span>
        )}
      </div>

      {/* Body Content */}
      <div style={{ margin: '14px 0' }}>
        {isOccupied ? (
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#111827', letterSpacing: '-0.02em' }}>
              ₹{totalAmount}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569', marginTop: '4px' }}>
              <span>{itemCount} items</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Clock size={12} /> {table.elapsedMinutes} mins
              </span>
            </div>

            {/* KOT Status Indicator */}
            <div style={{ marginTop: '8px' }}>
              {tableOrder?.kotStatus === 'sent' ? (
                <span className="badge badge-green" style={{ fontSize: '11px' }}>
                  <CheckCircle2 size={11} /> KOT Sent to Kitchen
                </span>
              ) : (
                <span className="badge badge-amber" style={{ fontSize: '11px' }}>
                  <Utensils size={11} /> Items Pending KOT
                </span>
              )}
            </div>
          </div>
        ) : (
          <div style={{ color: '#64748B', fontSize: '13px' }}>
            Tap to seat guests & create order
          </div>
        )}
      </div>

      {/* Footer action prompt */}
      <div style={{
        paddingTop: '8px',
        borderTop: '1px solid #F1F5F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        fontWeight: '600',
        color: isOccupied ? '#3366FF' : '#64748B'
      }}>
        <span>{isOccupied ? 'View / Edit Order' : 'Start Order'}</span>
        <ChevronRight size={14} />
      </div>
    </div>
  );
};
