import React, { useState } from 'react';
import { X, Printer, AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const InvoiceDetailDrawer = ({ invoice, isOpen, onClose }) => {
  const { restaurantInfo, voidInvoice, activeUserRole } = useAppState();

  const [isVoidModalOpen, setIsVoidModalOpen] = useState(false);
  const [voidReason, setVoidReason] = useState('');

  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleConfirmVoid = () => {
    if (!voidReason.trim()) {
      alert('Void reason is mandatory');
      return;
    }
    voidInvoice(invoice.id, voidReason);
    setIsVoidModalOpen(false);
    onClose();
  };

  const isVoided = invoice.status === 'Voided';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(17, 24, 39, 0.5)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      justifyContent: 'flex-end',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        width: '460px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 25px -5px rgba(0,0,0,0.1)',
        borderLeft: '1px solid #E2E8F0'
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
              Invoice {invoice.invoiceNo}
            </div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              {invoice.date} • {invoice.time}
            </div>
          </div>

          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {isVoided && (
            <div style={{ padding: '12px', borderRadius: '6px', backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', fontSize: '13px', marginBottom: '16px' }}>
              <div style={{ fontWeight: '700' }}>⚠ INVOICE VOIDED</div>
              <div>Reason: {invoice.voidReason || 'Manager Cancellation'}</div>
            </div>
          )}

          {/* Thermal Receipt Box */}
          <div
            id="thermal-receipt"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#111827'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '15px', fontWeight: 'bold' }}>{restaurantInfo.name}</div>
              <div style={{ fontSize: '11px', color: '#64748B' }}>{restaurantInfo.address}</div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>GSTIN: {restaurantInfo.gstin}</div>
              <div style={{ margin: '8px 0', borderTop: '1px dashed #94A3B8' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Invoice #: {invoice.invoiceNo}</span>
              <span>{invoice.time}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Type: {invoice.orderType}</span>
              <span>Ref: {invoice.tableOrCustomer}</span>
            </div>

            <div style={{ borderTop: '1px dashed #94A3B8', paddingTop: '6px', marginBottom: '6px' }}>
              <div style={{ display: 'flex', fontWeight: 'bold', borderBottom: '1px solid #E2E8F0', paddingBottom: '4px' }}>
                <span style={{ flex: 2 }}>Item</span>
                <span style={{ flex: 1, textAlign: 'center' }}>Qty</span>
                <span style={{ flex: 1, textAlign: 'right' }}>Amt</span>
              </div>
              {invoice.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', padding: '3px 0' }}>
                  <span style={{ flex: 2 }}>{item.name}</span>
                  <span style={{ flex: 1, textAlign: 'center' }}>{item.quantity}</span>
                  <span style={{ flex: 1, textAlign: 'right' }}>₹{item.amount}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px dashed #94A3B8', paddingTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal:</span>
                <span>₹{invoice.subtotal}</span>
              </div>
              {invoice.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A' }}>
                  <span>Discount:</span>
                  <span>-₹{invoice.discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GST (5%):</span>
                <span>₹{invoice.tax}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', borderTop: '1px solid #111827', paddingTop: '4px', marginTop: '4px' }}>
                <span>TOTAL:</span>
                <span>₹{invoice.total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '6px', color: '#475569' }}>
                <span>Paid via {invoice.paymentMethod}</span>
                <span>Cashier: {invoice.cashier}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handlePrint}>
            <Printer size={16} />
            <span>Reprint Thermal Receipt</span>
          </button>

          {!isVoided && (
            <button
              className="btn btn-danger"
              style={{ width: '100%', opacity: activeUserRole === 'Cashier' ? 0.6 : 1 }}
              onClick={() => setIsVoidModalOpen(true)}
            >
              <AlertOctagon size={16} />
              <span>Void Invoice (Manager Only)</span>
            </button>
          )}
        </div>
      </div>

      {/* Manager Void Confirmation Modal */}
      {isVoidModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(17,24,39,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', width: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', color: '#DC2626', fontWeight: '700' }}>
              <ShieldAlert size={20} />
              <span>Void Invoice {invoice.invoiceNo}?</span>
            </div>
            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '14px' }}>
              The sale record will remain in transaction history flagged as Voided. Required by accounting rules.
            </p>

            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
              Select Void Reason <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Wrong payment method selected, Order duplicate"
              value={voidReason}
              onChange={(e) => setVoidReason(e.target.value)}
              style={{ marginBottom: '16px' }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setIsVoidModalOpen(false)}>Cancel</button>
              <button className="btn btn-danger btn-sm" onClick={handleConfirmVoid}>Confirm Void</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
