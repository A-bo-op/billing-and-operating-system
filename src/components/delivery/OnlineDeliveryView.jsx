import React, { useState } from 'react';
import {
  Bike,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChefHat,
  PackageCheck,
  Power,
  Zap,
  TrendingUp,
  Store,
  DollarSign,
  AlertCircle,
  Sparkles,
  Layers,
  ArrowRight,
  PlusCircle,
  BellRing
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { OnlineOrderCard } from './OnlineOrderCard';
import { RejectOrderModal } from './RejectOrderModal';
import { DeliverySlipModal } from './DeliverySlipModal';

export const OnlineDeliveryView = () => {
  const {
    aggregatorPlatforms,
    onlineOrders,
    togglePlatformOnline,
    toggleAutoAccept,
    simulateIncomingOrder,
    acceptOnlineOrder,
    setCurrentTab,
  } = useAppState();

  const [activeStageFilter, setActiveStageFilter] = useState('all-active'); // all-active | incoming | preparing | ready | dispatched | delivered
  const [selectedPlatform, setSelectedPlatform] = useState('all'); // all | zomato | swiggy | direct
  const [searchQuery, setSearchQuery] = useState('');
  
  const [orderToReject, setOrderToReject] = useState(null);
  const [orderForSlip, setOrderForSlip] = useState(null);

  // Counts by stage
  const incomingOrders = onlineOrders.filter(o => o.stage === 'incoming');
  const incomingCount = incomingOrders.length;
  const preparingCount = onlineOrders.filter(o => o.stage === 'preparing').length;
  const readyCount = onlineOrders.filter(o => o.stage === 'ready').length;
  const dispatchedCount = onlineOrders.filter(o => o.stage === 'dispatched').length;
  const deliveredCount = onlineOrders.filter(o => o.stage === 'delivered').length;
  const allActiveCount = incomingCount + preparingCount + readyCount + dispatchedCount;

  // Filter orders
  const filteredOrders = onlineOrders.filter(order => {
    // Stage Filter
    if (activeStageFilter === 'all-active') {
      if (order.stage === 'delivered' || order.stage === 'cancelled') return false;
    } else if (order.stage !== activeStageFilter) {
      return false;
    }

    // Platform Filter
    if (selectedPlatform !== 'all' && order.platform !== selectedPlatform) {
      return false;
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchOrderNo = order.orderNo.toLowerCase().includes(q);
      const matchCustomer = order.customer.name.toLowerCase().includes(q);
      const matchPhone = order.customer.phone.includes(q);
      const matchItem = order.items.some(i => i.name.toLowerCase().includes(q));
      return matchOrderNo || matchCustomer || matchPhone || matchItem;
    }

    return true;
  });

  const handleAcceptAllIncoming = () => {
    incomingOrders.forEach(o => acceptOnlineOrder(o.id, 20));
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1440px', margin: '0 auto' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="title-page">Online Deliveries & Aggregators</h1>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              padding: '3px 10px',
              backgroundColor: '#FEF2F2',
              color: '#E11D48',
              borderRadius: '99px',
              border: '1px solid #FECACA'
            }}>
              {allActiveCount} Active Orders
            </span>
          </div>
          <div style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
            Real-time live kitchen dispatch for Zomato, Swiggy & Direct Store orders
          </div>
        </div>

        {/* Live Simulation Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => simulateIncomingOrder('zomato')}
            style={{ borderColor: '#FECACA', color: '#E23744', fontWeight: '700', backgroundColor: '#FEF2F2' }}
            title="Simulate a real incoming customer order from Zomato"
          >
            <BellRing size={14} color="#E23744" />
            <span>+ Simulate Zomato</span>
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => simulateIncomingOrder('swiggy')}
            style={{ borderColor: '#FED7AA', color: '#FC8019', fontWeight: '700', backgroundColor: '#FFF7ED' }}
            title="Simulate a real incoming customer order from Swiggy"
          >
            <BellRing size={14} color="#FC8019" />
            <span>+ Simulate Swiggy</span>
          </button>
        </div>
      </div>

      {/* Incoming Orders Attention Banner */}
      {incomingCount > 0 && (
        <div style={{
          backgroundColor: '#FEF2F2',
          border: '1.5px solid #FECACA',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 14px rgba(225, 29, 72, 0.12)'
        }} className="animate-slide-up">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#E11D48',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(225, 29, 72, 0.35)',
              animation: 'pulseGlow 1.5s infinite'
            }}>
              <BellRing size={20} />
            </div>

            <div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#9F1239' }}>
                {incomingCount} New Incoming Online Order{incomingCount > 1 ? 's' : ''} Awaiting Kitchen Acceptance!
              </div>
              <div style={{ fontSize: '12.5px', color: '#E11D48', marginTop: '2px' }}>
                Accepting will automatically generate kitchen KOT and deduct ingredient stock.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="btn btn-success btn-sm"
              onClick={handleAcceptAllIncoming}
              style={{ height: '36px', padding: '0 16px', fontWeight: '800' }}
            >
              <CheckCircle2 size={16} /> Accept All Incoming ({incomingCount})
            </button>
          </div>
        </div>
      )}

      {/* Platform Integration Status Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {aggregatorPlatforms.map((platform) => {
          return (
            <div
              key={platform.id}
              className="card-panel"
              style={{
                background: '#FFFFFF',
                borderLeft: `4px solid ${platform.brandColor}`,
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: platform.brandColor,
                    color: '#FFFFFF',
                    fontWeight: '800',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 2px 8px ${platform.brandColor}40`
                  }}>
                    {platform.name[0]}
                  </div>

                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {platform.name}
                      <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: '600' }}>
                        ★ {platform.rating}
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: '500' }}>
                      Commission: {platform.commissionRate}%
                    </div>
                  </div>
                </div>

                {/* Online / Offline Switch */}
                <button
                  onClick={() => togglePlatformOnline(platform.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '99px',
                    border: platform.isOnline ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                    backgroundColor: platform.isOnline ? '#ECFDF5' : '#F1F5F9',
                    color: platform.isOnline ? '#059669' : '#64748B',
                    fontWeight: '700',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Power size={12} />
                  <span>{platform.isOnline ? 'ONLINE' : 'OFFLINE'}</span>
                </button>
              </div>

              {/* Bottom controls & stats */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid #F1F5F9',
                fontSize: '12.5px'
              }}>
                <div style={{ color: '#475569' }}>
                  Today's Sales: <strong style={{ color: '#0F172A' }}>₹{platform.todaySales.toLocaleString()}</strong>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', color: '#64748B', fontWeight: '600' }}>
                  <input
                    type="checkbox"
                    checked={platform.autoAccept}
                    onChange={() => toggleAutoAccept(platform.id)}
                    style={{ accentColor: platform.brandColor }}
                  />
                  <span>Auto-Accept</span>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Navigation Tabs & Filter Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #E2E8F0',
        marginBottom: '20px',
        paddingBottom: '2px'
      }}>
        {/* Stage Filter Buttons */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {[
            { id: 'all-active', label: 'All Active', count: allActiveCount },
            { id: 'incoming', label: 'Incoming', count: incomingCount, alert: incomingCount > 0 },
            { id: 'preparing', label: 'In Kitchen', count: preparingCount },
            { id: 'ready', label: 'Ready for Pickup', count: readyCount },
            { id: 'dispatched', label: 'Out for Delivery', count: dispatchedCount },
            { id: 'delivered', label: 'Delivered', count: deliveredCount },
          ].map(tab => {
            const isSel = activeStageFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveStageFilter(tab.id)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px 8px 0 0',
                  border: 'none',
                  borderBottom: isSel ? '3px solid #3B82F6' : '3px solid transparent',
                  backgroundColor: isSel ? '#EFF6FF' : 'transparent',
                  color: isSel ? '#2563EB' : '#64748B',
                  fontWeight: isSel ? '800' : '600',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{tab.label}</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '2px 7px',
                  borderRadius: '99px',
                  backgroundColor: tab.alert
                    ? '#E11D48'
                    : isSel ? '#3B82F6' : '#E2E8F0',
                  color: tab.alert || isSel ? '#FFFFFF' : '#475569'
                }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Platform Quick Switch */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'all', label: 'All Platforms' },
            { id: 'zomato', label: 'Zomato' },
            { id: 'swiggy', label: 'Swiggy' },
            { id: 'direct', label: 'Direct' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: selectedPlatform === p.id ? '700' : '500',
                border: selectedPlatform === p.id ? '1px solid #3B82F6' : '1px solid #E2E8F0',
                backgroundColor: selectedPlatform === p.id ? '#EFF6FF' : '#FFFFFF',
                color: selectedPlatform === p.id ? '#2563EB' : '#64748B',
                cursor: 'pointer'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Instant Search Bar */}
      <div className="card-panel" style={{ marginBottom: '20px', padding: '12px 16px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={17} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '38px', height: '38px' }}
            placeholder="Search online orders by customer name, phone number, item or order #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px dashed #CBD5E1'
        }}>
          <Bike size={44} color="#CBD5E1" style={{ margin: '0 auto 12px auto', display: 'block' }} />
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>No online orders in this stage</div>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', marginBottom: '16px' }}>
            Click the buttons above to simulate real incoming orders from Zomato or Swiggy.
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => simulateIncomingOrder('zomato')}>
              + Simulate Zomato Order
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => simulateIncomingOrder('swiggy')}>
              + Simulate Swiggy Order
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '20px'
        }}>
          {filteredOrders.map(order => (
            <OnlineOrderCard
              key={order.id}
              order={order}
              onOpenRejectModal={(ord) => setOrderToReject(ord)}
              onOpenSlipModal={(ord) => setOrderForSlip(ord)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <RejectOrderModal
        order={orderToReject}
        isOpen={Boolean(orderToReject)}
        onClose={() => setOrderToReject(null)}
      />

      <DeliverySlipModal
        order={orderForSlip}
        isOpen={Boolean(orderForSlip)}
        onClose={() => setOrderForSlip(null)}
      />
    </div>
  );
};
