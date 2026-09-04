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
  Sparkles,
  Receipt,
  Utensils
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
        width: '430px',
        backgroundColor: '#FFFFFF',
        borderLeft: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px',
        color: '#64748B',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <Receipt size={32} color="#94A3B8" />
        </div>
        <div style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.02em' }}>No Active Order</div>
        <div style={{ fontSize: '13.5px', marginTop: '6px', color: '#64748B', maxWidth: '260px', lineHeight: 1.4 }}>
          Select a table on the floor or start a quick takeaway order to start billing.
        </div>
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
      width: '430px',
      height: '100%',
      backgroundColor: '#FFFFFF',
      borderLeft: '1px solid #E2E8F0',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      boxShadow: '-2px 0 10px rgba(15, 23, 42, 0.02)'
    }} className="animate-fade-in">
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
            <span style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.02em' }}>
              {activeOrder.tableName}
            </span>
            <span className="badge badge-blue" style={{ fontSize: '11px', fontWeight: '700' }}>
              {activeOrder.orderType.toUpperCase()}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
            <span>Waiter: <strong style={{ color: '#0F172A' }}>{activeOrder.waiter || 'Divya S.'}</strong></span>
            <span>&bull;</span>
            <span>{activeOrder.guests} Guests</span>
          </div>
        </div>

        <div style={{
          fontSize: '11px',
          fontWeight: '700',
          color: '#64748B',
          backgroundColor: '#FFFFFF',
          padding: '3px 8px',
          borderRadius: '6px',
          border: '1px solid #E2E8F0'
        }}>
          #{activeOrder.id}
        </div>
      </div>

      {/* Order Lines */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {activeOrder.items.length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: '#94A3B8' }}>
            <Utensils size={36} color="#CBD5E1" style={{ margin: '0 auto 12px auto', display: 'block' }} />
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#64748B' }}>Order is empty</div>
            <div style={{ fontSize: '12.5px', marginTop: '4px', color: '#94A3B8' }}>Click menu items on the left to add</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeOrder.items.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: item.kotState === 'sent' ? '#F8FAFC' : '#FFFFFF',
                  boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', lineHeight: 1.2 }}>
                      {item.name}
                    </div>

                    {item.notes && (
                      <div style={{ fontSize: '11.5px', color: '#D97706', fontStyle: 'italic', marginTop: '3px' }}>
                        Note: {item.notes}
                      </div>
                    )}
                  </div>

                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>
                    ₹{item.price * item.quantity}
                  </span>
                </div>

                {/* Status & Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                  {item.kotState === 'sent' ? (
                    <span className="badge badge-green" style={{ fontSize: '11px', padding: '2px 7px' }}>
                      <CheckCircle2 size={11} /> Sent to Kitchen
                    </span>
                  ) : (
                    <span className="badge badge-amber" style={{ fontSize: '11px', padding: '2px 7px', fontWeight: '700' }}>
                      Not Sent
                    </span>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <button
                        onClick={() => updateItemQuantity(item.id, -1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <Minus size={13} color="#475569" />
                      </button>

                      <span style={{ fontSize: '13.5px', fontWeight: '800', minWidth: '24px', textAlign: 'center', color: '#0F172A' }}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateItemQuantity(item.id, 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={13} color="#475569" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveClick(item)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#FEF2F2',
                        color: '#E11D48',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        marginLeft: '4px'
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#475569', marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal</span>
            <span style={{ fontWeight: '700', color: '#0F172A' }}>₹{activeOrder.subtotal}</span>
          </div>

          {activeOrder.discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
              <span>Discount</span>
              <span style={{ fontWeight: '700' }}>-₹{activeOrder.discount}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>GST ({restaurantInfo.taxRate}%)</span>
            <span style={{ fontWeight: '700', color: '#0F172A' }}>₹{activeOrder.tax}</span>
          </div>

          <div style={{
            borderTop: '1px solid #E2E8F0',
            paddingTop: '8px',
            marginTop: '4px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline'
          }}>
            <span style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>Total Payable</span>
            <span style={{ fontSize: '22px', fontWeight: '800', color: '#2563EB', letterSpacing: '-0.02em' }}>
              ₹{activeOrder.total}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary"
              style={{ flex: 1, fontSize: '12.5px', height: '38px' }}
              onClick={() => setIsDiscountModalOpen(true)}
            >
              <Tag size={14} color="#64748B" />
              <span>{activeOrder.discount > 0 ? 'Edit Discount' : 'Discount'}</span>
            </button>

            <button
              className="btn btn-amber"
              style={{ flex: 1, fontSize: '12.5px', height: '38px' }}
              onClick={sendKotToKitchen}
              disabled={activeOrder.items.length === 0}
            >
              <Send size={14} color="#FFFFFF" />
              <span>Send KOT</span>
            </button>
          </div>

          <button
            className="btn btn-primary btn-lg"
            style={{ width: '100%', height: '48px', fontSize: '15px', fontWeight: '800' }}
            onClick={() => setIsPaymentModalOpen(true)}
            disabled={activeOrder.items.length === 0}
          >
            <CreditCard size={18} />
            <span>Pay & Settle &bull; ₹{activeOrder.total}</span>
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
          backgroundColor: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '14px', width: '340px', boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.2)' }} className="animate-slide-up">
            <h3 style={{ fontSize: '17px', fontWeight: '800', marginBottom: '8px', color: '#0F172A' }}>Apply Order Discount</h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>Enter the amount in Rupees to deduct from the bill.</p>
            <input
              type="number"
              className="input-field"
              placeholder="e.g. 50"
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              style={{ marginBottom: '18px' }}
              autoFocus
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setIsDiscountModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleApplyDiscount}>Apply Discount</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
