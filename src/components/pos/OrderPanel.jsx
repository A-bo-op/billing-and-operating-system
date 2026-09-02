import React, { useState } from 'react';
import {
  Send,
  CreditCard,
  Plus,
  Minus,
  Trash2,
  Tag,
  Clock,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  User,
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { SentItemCancelModal } from './SentItemCancelModal';

export const OrderPanel = () => {
  const {
    activeOrder,
    updateItemQuantity,
    removeSentItem,
    sendKotToKitchen,
    applyOrderDiscount,
    setIsPaymentModalOpen,
    restaurantInfo,
    showToast,
  } = useAppState();

  const [itemToCancel, setItemToCancel] = useState(null);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discountInput, setDiscountInput] = useState('');

  if (!activeOrder) {
    return (
      <div style={{
        width: '420px',
        backgroundColor: '#FFFFFF',
        borderLeft: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
        color: '#64748B',
        textAlign: 'center'
      }}>
        <Clock size={40} color="#CBD5E1" style={{ marginBottom: '12px' }} />
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>No Active Order</div>
        <div style={{ fontSize: '13px', marginTop: '4px' }}>Select a table or start a takeaway order from the floor view.</div>
      </div>
    );
  }

  const handleRemoveClick = (item) => {
    if (item.kotState === 'sent') {
      setItemToCancel(item);
    } else {
      updateItemQuantity(item.id, -item.quantity);
    }
  };

  const handleApplyDiscount = () => {
    const val = parseFloat(discountInput);
    if (!isNaN(val) && val >= 0) {
      applyOrderDiscount(val);
      setIsDiscountModalOpen(false);
    } else {
      showToast('Enter a valid discount amount', 'warning');
    }
  };

  const hasUnsentItems = activeOrder.items.some(i => i.kotState === 'not_sent');

  return (
    <div style={{
      width: '420px',
      height: '100%',
      backgroundColor: '#FFFFFF',
      borderLeft: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #E2E8F0',
        backgroundColor: '#F8FAFC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>
              ORDER — {activeOrder.tableName}
            </span>
            <span className="badge badge-blue" style={{ fontSize: '11px' }}>
              {activeOrder.orderType.toUpperCase()}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
            <span>Waiter: {activeOrder.waiter || 'Divya S.'}</span>
            <span>•</span>
            <span>{activeOrder.guests} Guests</span>
          </div>
        </div>

        <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>
          #{activeOrder.id}
        </div>
      </div>

      {/* Order Lines */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {activeOrder.items.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center', color: '#94A3B8' }}>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>Order is empty</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>Click dishes on the menu to add them</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeOrder.items.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: item.kotState === 'sent' ? '#F8FAFC' : '#FFFFFF',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                      {item.name}
                    </div>

                    {item.notes && (
                      <div style={{ fontSize: '11px', color: '#D97706', fontStyle: 'italic', marginTop: '2px' }}>
                        Note: {item.notes}
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>
                    ₹{item.price * item.quantity}
                  </span>
                </div>

                {/* Status & Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                  {item.kotState === 'sent' ? (
                    <span className="badge badge-green" style={{ fontSize: '11px' }}>
                      <CheckCircle2 size={11} /> Sent to Kitchen
                    </span>
                  ) : (
                    <span className="badge badge-amber" style={{ fontSize: '11px' }}>
                      Not Sent
                    </span>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      onClick={() => updateItemQuantity(item.id, -1)}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '4px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Minus size={14} color="#475569" />
                    </button>

                    <span style={{ fontSize: '14px', fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateItemQuantity(item.id, 1)}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '4px',
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={14} color="#475569" />
                    </button>

                    <button
                      onClick={() => handleRemoveClick(item)}
                      style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#FEF2F2',
                        color: '#DC2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        marginLeft: '6px'
                      }}
                      title="Remove item"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bill Summary */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569', marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal</span>
            <span style={{ fontWeight: '600', color: '#111827' }}>₹{activeOrder.subtotal}</span>
          </div>

          {activeOrder.discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A' }}>
              <span>Discount</span>
              <span style={{ fontWeight: '600' }}>-₹{activeOrder.discount}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>GST ({restaurantInfo.taxRate}%)</span>
            <span style={{ fontWeight: '600', color: '#111827' }}>₹{activeOrder.tax}</span>
          </div>

          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '8px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', color: '#111827' }}>
            <span>Total Payable</span>
            <span style={{ color: '#3366FF' }}>₹{activeOrder.total}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary"
              style={{ flex: 1, fontSize: '12px' }}
              onClick={() => setIsDiscountModalOpen(true)}
            >
              <Tag size={14} color="#64748B" />
              <span>{activeOrder.discount > 0 ? 'Edit Discount' : 'Apply Discount'}</span>
            </button>

            <button
              className="btn btn-secondary"
              style={{ flex: 1, fontSize: '12px' }}
              onClick={sendKotToKitchen}
              disabled={activeOrder.items.length === 0}
            >
              <Send size={14} color="#D97706" />
              <span>Send KOT</span>
            </button>
          </div>

          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            onClick={() => setIsPaymentModalOpen(true)}
            disabled={activeOrder.items.length === 0}
          >
            <CreditCard size={18} />
            <span>Proceed to Payment — ₹{activeOrder.total}</span>
          </button>
        </div>
      </div>

      {/* Cancellation Modal trigger */}
      <SentItemCancelModal
        item={itemToCancel}
        isOpen={Boolean(itemToCancel)}
        onClose={() => setItemToCancel(null)}
        onConfirm={(id, reason) => removeSentItem(id, reason)}
      />

      {/* Discount Modal */}
      {isDiscountModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(17,24,39,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', width: '320px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px' }}>Apply Discount (₹)</h3>
            <input
              type="number"
              className="input-field"
              placeholder="Enter discount amount"
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              style={{ marginBottom: '14px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setIsDiscountModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleApplyDiscount}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
