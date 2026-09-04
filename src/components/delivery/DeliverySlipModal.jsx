import React from 'react';
import { X, Printer, Bike, Store, MapPin, Phone } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const DeliverySlipModal = ({ order, isOpen, onClose }) => {
  const { restaurantInfo } = useAppState();

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const isZomato = order.platform === 'zomato';
  const isSwiggy = order.platform === 'swiggy';
  const platformBrandColor = isZomato ? '#E23744' : isSwiggy ? '#FC8019' : '#3B82F6';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        width: '440px',
        maxWidth: '92vw',
        border: '1px solid #E2E8F0',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh'
      }} className="animate-slide-up">
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F8FAFC'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Printer size={18} color="#3B82F6" />
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>
              Thermal Delivery Slip &bull; {order.orderNo}
            </h3>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={18} color="#64748B" />
          </button>
        </div>

        {/* Thermal Slip Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', backgroundColor: '#F8FAFC' }}>
          <div id="thermal-receipt" style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '20px',
            fontFamily: 'monospace',
            color: '#000000',
            fontSize: '12.5px',
            lineHeight: 1.4,
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)'
          }}>
            {/* Platform Banner */}
            <div style={{
              textAlign: 'center',
              padding: '6px',
              backgroundColor: platformBrandColor,
              color: '#FFFFFF',
              fontWeight: '900',
              fontSize: '14px',
              borderRadius: '4px',
              marginBottom: '12px',
              letterSpacing: '0.05em'
            }}>
              {order.platform.toUpperCase()} ONLINE ORDER
            </div>

            {/* Restaurant Info */}
            <div style={{ textAlign: 'center', borderBottom: '1px dashed #000000', paddingBottom: '10px', marginBottom: '10px' }}>
              <div style={{ fontSize: '16px', fontWeight: '900' }}>{restaurantInfo.name.toUpperCase()}</div>
              <div style={{ fontSize: '11px' }}>{restaurantInfo.outlet}</div>
              <div style={{ fontSize: '10px', color: '#444' }}>{restaurantInfo.address}</div>
              <div style={{ fontSize: '10px' }}>Ph: {restaurantInfo.phone}</div>
              <div style={{ fontSize: '10px' }}>FSSAI: {restaurantInfo.fssai}</div>
            </div>

            {/* Order Meta */}
            <div style={{ borderBottom: '1px dashed #000000', paddingBottom: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>ORDER: {order.orderNo}</span>
                <span>{order.createdAt}</span>
              </div>
              <div>Customer: <strong>{order.customer.name}</strong> ({order.customer.phone})</div>
              <div>Address: {order.customer.address}</div>
              {order.customer.instructions && (
                <div style={{ marginTop: '4px', backgroundColor: '#F1F5F9', padding: '4px', borderRadius: '3px', fontWeight: 'bold' }}>
                  NOTE: {order.customer.instructions}
                </div>
              )}
            </div>

            {/* Items */}
            <div style={{ borderBottom: '1px dashed #000000', paddingBottom: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '4px' }}>
                <span style={{ width: '60%' }}>ITEM</span>
                <span style={{ width: '15%', textAlign: 'center' }}>QTY</span>
                <span style={{ width: '25%', textAlign: 'right' }}>AMT</span>
              </div>
              {order.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', margin: '3px 0' }}>
                  <span style={{ width: '60%' }}>{item.name}</span>
                  <span style={{ width: '15%', textAlign: 'center' }}>{item.quantity}</span>
                  <span style={{ width: '25%', textAlign: 'right' }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ borderBottom: '1px dashed #000000', paddingBottom: '8px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Item Subtotal:</span>
                <span>₹{order.itemTotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GST (5%):</span>
                <span>₹{order.taxes}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Packaging:</span>
                <span>₹{order.packingCharge}</span>
              </div>
              {order.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Discount:</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '900', marginTop: '4px', borderTop: '1px solid #000', paddingTop: '4px' }}>
                <span>TOTAL:</span>
                <span>₹{order.totalBill}</span>
              </div>
            </div>

            {/* Payment & OTP */}
            <div style={{ textAlign: 'center', fontSize: '11px', marginTop: '8px' }}>
              <div>Payment: <strong>{order.paymentStatus}</strong></div>
              {order.rider && (
                <div style={{ marginTop: '4px', padding: '4px', border: '1px solid #000', borderRadius: '4px', fontWeight: 'bold' }}>
                  RIDER OTP: {order.rider.otp} &bull; Rider: {order.rider.name}
                </div>
              )}
              <div style={{ marginTop: '6px', fontSize: '10px' }}>Thank you for ordering via {platformName}!</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px'
        }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
          <button className="btn btn-primary btn-sm" onClick={handlePrint}>
            <Printer size={15} /> Print Thermal Slip
          </button>
        </div>
      </div>
    </div>
  );
};
