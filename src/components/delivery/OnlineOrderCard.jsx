import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  XCircle,
  ChefHat,
  PackageCheck,
  Bike,
  Printer,
  FileText,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const OnlineOrderCard = ({ order, onOpenRejectModal, onOpenSlipModal }) => {
  const {
    acceptOnlineOrder,
    markOnlineOrderReady,
    dispatchOnlineOrder,
    completeOnlineOrder,
  } = useAppState();

  const [selectedPrepTime, setSelectedPrepTime] = useState(20);

  const isZomato = order.platform === 'zomato';
  const isSwiggy = order.platform === 'swiggy';
  const isDirect = order.platform === 'direct';

  const platformBrandColor = isZomato ? '#E23744' : isSwiggy ? '#FC8019' : '#3B82F6';
  const platformBgLight = isZomato ? '#FEF2F2' : isSwiggy ? '#FFF7ED' : '#EFF6FF';
  const platformBorder = isZomato ? '#FECACA' : isSwiggy ? '#FED7AA' : '#BFDBFE';
  const platformName = isZomato ? 'Zomato' : isSwiggy ? 'Swiggy' : 'Direct Store';

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: order.stage === 'incoming'
          ? `2px solid ${platformBrandColor}`
          : '1px solid #E2E8F0',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: order.stage === 'incoming'
          ? `0 6px 20px ${platformBrandColor}22`
          : '0 2px 6px rgba(15, 23, 42, 0.04)',
        position: 'relative',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        background: order.stage === 'incoming'
          ? `linear-gradient(180deg, #FFFFFF 0%, ${platformBgLight} 100%)`
          : '#FFFFFF'
      }}
      className="card-panel-hover animate-slide-up"
    >
      {/* Top Platform & Stage Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            backgroundColor: platformBrandColor,
            color: '#FFFFFF',
            fontWeight: '800',
            fontSize: '12px',
            padding: '4px 10px',
            borderRadius: '6px',
            letterSpacing: '0.02em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: `0 2px 6px ${platformBrandColor}44`
          }}>
            {platformName.toUpperCase()}
          </span>

          <span style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>
            {order.orderNo}
          </span>
        </div>

        {/* Stage Status Badge */}
        {order.stage === 'incoming' && (
          <span className="badge badge-red" style={{ fontWeight: '800', padding: '4px 10px', animation: 'pulseGlow 1.5s infinite' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E11D48', display: 'inline-block' }} />
            Incoming ({order.createdAt})
          </span>
        )}
        {order.stage === 'preparing' && (
          <span className="badge badge-amber" style={{ fontWeight: '700', padding: '4px 10px' }}>
            <ChefHat size={12} />
            In Kitchen ({order.prepTimeRemaining}m left)
          </span>
        )}
        {order.stage === 'ready' && (
          <span className="badge badge-blue" style={{ fontWeight: '700', padding: '4px 10px' }}>
            <PackageCheck size={12} />
            Ready for Pickup
          </span>
        )}
        {order.stage === 'dispatched' && (
          <span className="badge badge-purple" style={{ fontWeight: '700', padding: '4px 10px' }}>
            <Bike size={12} />
            Out for Delivery
          </span>
        )}
        {order.stage === 'delivered' && (
          <span className="badge badge-green" style={{ fontWeight: '700', padding: '4px 10px' }}>
            <CheckCircle2 size={12} />
            Delivered
          </span>
        )}
      </div>

      {/* Customer Info Box */}
      <div style={{
        padding: '12px 14px',
        backgroundColor: '#F8FAFC',
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        marginBottom: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>
            {order.customer.name}
          </div>
          <div style={{ fontSize: '11.5px', color: '#2563EB', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Phone size={11} /> {order.customer.phone}
          </div>
        </div>

        <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'flex-start', gap: '4px', lineHeight: 1.35 }}>
          <MapPin size={13} color="#94A3B8" style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>{order.customer.address} ({order.customer.distance})</span>
        </div>

        {order.customer.instructions && (
          <div style={{
            marginTop: '8px',
            fontSize: '11.5px',
            color: '#B45309',
            backgroundColor: '#FEF3C7',
            padding: '5px 8px',
            borderRadius: '6px',
            fontWeight: '600'
          }}>
            &ldquo;{order.customer.instructions}&rdquo;
          </div>
        )}
      </div>

      {/* Items List */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
          Items ({order.items.reduce((acc, i) => acc + i.quantity, 0)})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  fontSize: '11.5px',
                  fontWeight: '800',
                  color: '#2563EB',
                  backgroundColor: '#EFF6FF',
                  padding: '1px 6px',
                  borderRadius: '4px'
                }}>
                  {item.quantity}x
                </span>
                <span style={{ fontWeight: '600', color: '#0F172A' }}>{item.name}</span>
              </div>
              <span style={{ fontWeight: '700', color: '#475569' }}>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rider & OTP info if active */}
      {order.rider && (
        <div style={{
          padding: '10px 12px',
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: '8px',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#1E40AF', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Bike size={14} /> {order.rider.name}
            </div>
            <div style={{ fontSize: '11px', color: '#3B82F6', marginTop: '2px' }}>
              {order.rider.vehicleNo} &bull; {order.rider.status}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Pickup OTP</div>
            <div style={{ fontSize: '15px', fontWeight: '900', color: '#1E40AF', letterSpacing: '0.05em' }}>{order.rider.otp}</div>
          </div>
        </div>
      )}

      {/* Bill & Aggregator Payout Summary */}
      <div style={{
        paddingTop: '12px',
        borderTop: '1px solid #F1F5F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Customer Total ({order.paymentStatus})</div>
          <div style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A' }}>₹{order.totalBill}</div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '11px', color: '#059669', fontWeight: '600' }}>Est. Net Restaurant Payout</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#059669' }}>₹{order.netPayout}</div>
        </div>
      </div>

      {/* Action Buttons depending on lifecycle stage */}
      <div>
        {order.stage === 'incoming' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>Prep Time:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[15, 20, 30, 45].map(mins => (
                  <button
                    key={mins}
                    onClick={() => setSelectedPrepTime(mins)}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: selectedPrepTime === mins ? '700' : '500',
                      border: selectedPrepTime === mins ? '1px solid #3B82F6' : '1px solid #E2E8F0',
                      backgroundColor: selectedPrepTime === mins ? '#EFF6FF' : '#FFFFFF',
                      color: selectedPrepTime === mins ? '#2563EB' : '#64748B',
                      cursor: 'pointer'
                    }}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, borderColor: '#FECACA', color: '#E11D48' }}
                onClick={() => onOpenRejectModal(order)}
              >
                <XCircle size={14} /> Reject
              </button>

              <button
                className="btn btn-success btn-sm"
                style={{ flex: 2, height: '36px', fontSize: '13px' }}
                onClick={() => acceptOnlineOrder(order.id, selectedPrepTime)}
              >
                <CheckCircle2 size={15} /> Accept ({selectedPrepTime}m)
              </button>
            </div>
          </div>
        )}

        {order.stage === 'preparing' && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
              onClick={() => onOpenSlipModal(order)}
              title="Print Delivery KOT & Bill Slip"
            >
              <Printer size={14} color="#64748B" /> Print Slip
            </button>

            <button
              className="btn btn-primary btn-sm"
              style={{ flex: 2, height: '36px' }}
              onClick={() => markOnlineOrderReady(order.id)}
            >
              <PackageCheck size={15} /> Food Ready & Packed
            </button>
          </div>
        )}

        {order.stage === 'ready' && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
              onClick={() => onOpenSlipModal(order)}
            >
              <Printer size={14} /> Slip
            </button>

            <button
              className="btn btn-primary btn-sm"
              style={{ flex: 2, background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)', height: '36px' }}
              onClick={() => dispatchOnlineOrder(order.id)}
            >
              <Bike size={15} /> Handover to Rider
            </button>
          </div>
        )}

        {order.stage === 'dispatched' && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{ flex: 1 }}
              onClick={() => onOpenSlipModal(order)}
            >
              <Printer size={14} /> Slip
            </button>

            <button
              className="btn btn-success btn-sm"
              style={{ flex: 2, height: '36px' }}
              onClick={() => completeOnlineOrder(order.id)}
            >
              <CheckCircle2 size={15} /> Mark Delivered
            </button>
          </div>
        )}

        {order.stage === 'delivered' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#059669', fontWeight: '700' }}>✓ Order Settled</span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onOpenSlipModal(order)}
            >
              <FileText size={13} color="#3B82F6" /> View Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
