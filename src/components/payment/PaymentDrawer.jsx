import React, { useState } from 'react';
import { X, DollarSign, QrCode, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const PaymentDrawer = () => {
  const {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    activeOrder,
    completePayment,
  } = useAppState();

  const [paymentMethod, setPaymentMethod] = useState('Cash'); // Cash | UPI | Card
  const [cashReceived, setCashReceived] = useState(activeOrder ? activeOrder.total : 0);
  const [referenceNo, setReferenceNo] = useState('');

  if (!isPaymentModalOpen || !activeOrder) return null;

  const changeDue = Math.max(0, cashReceived - activeOrder.total);

  const handleComplete = () => {
    completePayment(paymentMethod, referenceNo, {
      amountReceived: cashReceived,
      changeGiven: changeDue,
    });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(17, 24, 39, 0.5)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        width: '520px',
        maxWidth: '90vw',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F8FAFC'
        }}>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>
              Complete Payment — {activeOrder.tableName}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              Order Total: <strong style={{ color: '#3366FF' }}>₹{activeOrder.total}</strong>
            </div>
          </div>
          <button onClick={() => setIsPaymentModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {/* Payment Method Cards */}
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '10px' }}>
            Select Payment Method
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            <button
              onClick={() => { setPaymentMethod('Cash'); setCashReceived(activeOrder.total); }}
              style={{
                padding: '14px',
                borderRadius: '8px',
                border: paymentMethod === 'Cash' ? '2px solid #3366FF' : '1px solid #E2E8F0',
                backgroundColor: paymentMethod === 'Cash' ? '#EFF6FF' : '#FFFFFF',
                color: paymentMethod === 'Cash' ? '#3366FF' : '#111827',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <DollarSign size={20} />
              <span>Cash</span>
            </button>

            <button
              onClick={() => setPaymentMethod('UPI')}
              style={{
                padding: '14px',
                borderRadius: '8px',
                border: paymentMethod === 'UPI' ? '2px solid #3366FF' : '1px solid #E2E8F0',
                backgroundColor: paymentMethod === 'UPI' ? '#EFF6FF' : '#FFFFFF',
                color: paymentMethod === 'UPI' ? '#3366FF' : '#111827',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <QrCode size={20} />
              <span>UPI / QR</span>
            </button>

            <button
              onClick={() => setPaymentMethod('Card')}
              style={{
                padding: '14px',
                borderRadius: '8px',
                border: paymentMethod === 'Card' ? '2px solid #3366FF' : '1px solid #E2E8F0',
                backgroundColor: paymentMethod === 'Card' ? '#EFF6FF' : '#FFFFFF',
                color: paymentMethod === 'Card' ? '#3366FF' : '#111827',
                fontWeight: '700',
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <CreditCard size={20} />
              <span>Card</span>
            </button>
          </div>

          {/* Cash Details Panel */}
          {paymentMethod === 'Cash' && (
            <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
                Quick Cash Shortcuts
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCashReceived(activeOrder.total)}
                >
                  Exact (₹{activeOrder.total})
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCashReceived(Math.ceil(activeOrder.total / 100) * 100 || 500)}
                >
                  ₹{Math.ceil(activeOrder.total / 100) * 100 || 500}
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setCashReceived(1000)}
                >
                  ₹1,000
                </button>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>Amount Received (₹)</label>
                  <input
                    type="number"
                    className="input-field"
                    style={{ fontSize: '18px', fontWeight: '700' }}
                    value={cashReceived}
                    onChange={(e) => setCashReceived(parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div style={{ flex: 1, backgroundColor: '#FFFFFF', padding: '10px 14px', borderRadius: '6px', border: '1px solid #BBF7D0' }}>
                  <div style={{ fontSize: '11px', color: '#16A34A', fontWeight: '600' }}>CHANGE DUE</div>
                  <div style={{ fontSize: '22px', fontWeight: '700', color: '#16A34A' }}>
                    ₹{changeDue}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* UPI Panel */}
          {paymentMethod === 'UPI' && (
            <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ width: '120px', height: '120px', backgroundColor: '#FFFFFF', margin: '0 auto 12px auto', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QrCode size={80} color="#111827" />
              </div>
              <div style={{ fontSize: '13px', color: '#475569', marginBottom: '12px' }}>
                Scan QR code using Google Pay, PhonePe, or Paytm
              </div>
              <input
                type="text"
                className="input-field"
                placeholder="Enter UPI Reference / UTR Number (Optional)"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
              />
            </div>
          )}

          {/* Card Panel */}
          {paymentMethod === 'Card' && (
            <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '13px', color: '#475569', marginBottom: '12px' }}>
                Swipe / Tap card on EDC Terminal #1
              </div>
              <input
                type="text"
                className="input-field"
                placeholder="Enter Card Machine Txn Reference # (Optional)"
                value={referenceNo}
                onChange={(e) => setReferenceNo(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => setIsPaymentModalOpen(false)}>
            Cancel
          </button>
          <button className="btn btn-primary btn-lg" onClick={handleComplete}>
            <CheckCircle2 size={18} />
            <span>Complete Payment — ₹{activeOrder.total}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
