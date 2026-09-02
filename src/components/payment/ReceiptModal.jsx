import React from 'react';
import { Printer, CheckCircle2, ArrowRight, FileText, X } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const ReceiptModal = () => {
  const { printedInvoice, setPrintedInvoice, restaurantInfo, setCurrentTab } = useAppState();

  if (!printedInvoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDone = () => {
    setPrintedInvoice(null);
    setCurrentTab('tables');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(17, 24, 39, 0.6)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        width: '440px',
        maxWidth: '90vw',
        border: '1px solid #BBF7D0',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          backgroundColor: '#F0FDF4',
          borderBottom: '1px solid #BBF7D0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={24} color="#16A34A" />
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#14532D' }}>Payment Successful!</div>
              <div style={{ fontSize: '12px', color: '#15803D' }}>Invoice #{printedInvoice.invoiceNo} Issued</div>
            </div>
          </div>

          <button onClick={handleDone} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={20} color="#16A34A" />
          </button>
        </div>

        {/* Printable Thermal Receipt Card */}
        <div style={{ padding: '20px', backgroundColor: '#F8FAFC', maxHeight: '420px', overflowY: 'auto' }}>
          <div
            id="thermal-receipt"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#111827',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{restaurantInfo.name.toUpperCase()}</div>
              <div style={{ fontSize: '11px', color: '#475569' }}>{restaurantInfo.outlet}</div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>{restaurantInfo.address}</div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>GSTIN: {restaurantInfo.gstin}</div>
              <div style={{ margin: '8px 0', borderTop: '1px dashed #94A3B8' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Inv: {printedInvoice.invoiceNo}</span>
              <span>{printedInvoice.date} {printedInvoice.time}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Type: {printedInvoice.orderType}</span>
              <span>Ref: {printedInvoice.tableOrCustomer}</span>
            </div>

            <div style={{ borderTop: '1px dashed #94A3B8', paddingTop: '6px', marginBottom: '6px' }}>
              <div style={{ display: 'flex', fontWeight: 'bold', borderBottom: '1px solid #E2E8F0', paddingBottom: '4px' }}>
                <span style={{ flex: 2 }}>Item</span>
                <span style={{ flex: 1, textAlign: 'center' }}>Qty</span>
                <span style={{ flex: 1, textAlign: 'right' }}>Amt</span>
              </div>
              {printedInvoice.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', padding: '3px 0' }}>
                  <span style={{ flex: 2 }}>{item.name}</span>
                  <span style={{ flex: 1, textAlign: 'center' }}>{item.quantity}</span>
                  <span style={{ flex: 1, textAlign: 'right' }}>₹{item.amount}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px dashed #94A3B8', paddingTop: '6px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal:</span>
                <span>₹{printedInvoice.subtotal}</span>
              </div>
              {printedInvoice.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Discount:</span>
                  <span>-₹{printedInvoice.discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GST (5%):</span>
                <span>₹{printedInvoice.tax}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', borderTop: '1px solid #111827', paddingTop: '4px', marginTop: '4px' }}>
                <span>TOTAL:</span>
                <span>₹{printedInvoice.total}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '4px', color: '#475569' }}>
                <span>Paid via {printedInvoice.paymentMethod}</span>
                <span>Cashier: {printedInvoice.cashier}</span>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '12px', paddingTop: '8px', borderTop: '1px dashed #94A3B8', fontSize: '10px', color: '#64748B' }}>
              Thank you for dining with us!
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handlePrint}>
            <Printer size={18} />
            <span>Print Receipt</span>
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => { setPrintedInvoice(null); setCurrentTab('invoices'); }}>
              <FileText size={15} />
              <span>View Invoices</span>
            </button>

            <button className="btn btn-success" style={{ flex: 1 }} onClick={handleDone}>
              <span>Back to Floor</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
