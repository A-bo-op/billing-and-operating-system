import React from 'react';
import { BarChart3, TrendingUp, ShoppingBag, IndianRupee, AlertTriangle, ArrowUpRight, Plus, Utensils, CheckCircle2, PieChart } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const DashboardView = () => {
  const { invoices, todaysSales, todaysBilledCount, lowStockIngredients, dishes, setCurrentTab, startTakeawayOrder } = useAppState();

  const avgOrderValue = todaysBilledCount > 0 ? Math.round(todaysSales / todaysBilledCount) : 0;

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1440px', margin: '0 auto' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="title-page">Operational Analytics</h1>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              padding: '3px 10px',
              backgroundColor: '#ECFDF5',
              color: '#059669',
              borderRadius: '99px',
              border: '1px solid #A7F3D0'
            }}>
              Live Shift
            </span>
          </div>
          <div style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
            Real-time business performance, billing velocity & inventory warnings
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setCurrentTab('tables')}>
            <Utensils size={15} color="#3B82F6" />
            <span>Floor View</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={startTakeawayOrder}>
            <Plus size={15} />
            <span>New Takeaway</span>
          </button>
        </div>
      </div>

      {/* Top Operational KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '18px', marginBottom: '24px' }}>
        <div className="card-panel card-panel-hover" style={{ background: '#FFFFFF', borderLeft: '4px solid #3B82F6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Today's Net Sales</span>
            <span className="badge badge-green" style={{ fontSize: '11px', padding: '2px 7px' }}>
              <TrendingUp size={11} /> +14.2%
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', margin: '8px 0 4px 0', letterSpacing: '-0.03em' }}>
            ₹{todaysSales.toLocaleString()}
          </div>
          <div style={{ fontSize: '12.5px', color: todaysSales > 0 ? '#059669' : '#94A3B8', fontWeight: '500' }}>
            {todaysSales > 0 ? '● Active daily revenue stream' : 'Awaiting first daily bill'}
          </div>
        </div>

        <div className="card-panel card-panel-hover" style={{ background: '#FFFFFF', borderLeft: '4px solid #10B981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Invoices Billed</span>
            <span className="badge badge-blue" style={{ fontSize: '11px', padding: '2px 7px' }}>
              Completed
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#2563EB', margin: '8px 0 4px 0', letterSpacing: '-0.03em' }}>
            {todaysBilledCount}
          </div>
          <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: '500' }}>Invoices completed today</div>
        </div>

        <div className="card-panel card-panel-hover" style={{ background: '#FFFFFF', borderLeft: '4px solid #6366F1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Avg Ticket Size</span>
            <span className="badge badge-purple" style={{ fontSize: '11px', padding: '2px 7px' }}>
              AOV
            </span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', margin: '8px 0 4px 0', letterSpacing: '-0.03em' }}>
            ₹{avgOrderValue}
          </div>
          <div style={{ fontSize: '12.5px', color: '#64748B', fontWeight: '500' }}>Average guest spend per order</div>
        </div>

        <div className="card-panel card-panel-hover" style={{ background: '#FFFFFF', borderLeft: '4px solid #F59E0B' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Order Channels</span>
            <span className="badge badge-amber" style={{ fontSize: '11px', padding: '2px 7px' }}>
              Dine / Take
            </span>
          </div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: '10px 0 8px 0' }}>
            60% Dine-In &bull; 40% Takeaway
          </div>
          <div style={{ width: '100%', height: '7px', backgroundColor: '#F1F5F9', borderRadius: '99px', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: '60%', background: 'linear-gradient(90deg, #3B82F6, #6366F1)', height: '100%' }} />
            <div style={{ width: '40%', background: 'linear-gradient(90deg, #10B981, #059669)', height: '100%' }} />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Recent Invoices Table */}
        <div className="card-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 className="title-section">Recent Invoices Billed</h2>
              <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>Latest customer transactions for this shift</div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setCurrentTab('invoices')}>
              View All Invoices
            </button>
          </div>

          {invoices.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', color: '#64748B', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px dashed #CBD5E1' }}>
              <Utensils size={36} color="#CBD5E1" style={{ margin: '0 auto 10px auto', display: 'block' }} />
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A' }}>No invoices billed today yet</div>
              <div style={{ fontSize: '13px', marginTop: '4px', marginBottom: '16px', color: '#64748B' }}>
                Open a free table or start a takeaway to process your first order.
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setCurrentTab('tables')}>
                Go to Floor Layout
              </button>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Time</th>
                  <th>Order Type</th>
                  <th>Reference</th>
                  <th>Payment</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 5).map((inv) => (
                  <tr key={inv.id}>
                    <td style={{ fontWeight: '700', color: '#2563EB' }}>{inv.invoiceNo}</td>
                    <td style={{ fontSize: '12.5px', color: '#64748B' }}>{inv.time}</td>
                    <td><span className="badge badge-gray" style={{ textTransform: 'capitalize' }}>{inv.orderType}</span></td>
                    <td style={{ fontWeight: '600' }}>{inv.tableOrCustomer}</td>
                    <td><span className="badge badge-blue">{inv.paymentMethod}</span></td>
                    <td style={{ fontWeight: '800', color: '#0F172A' }}>₹{inv.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Low Stock Alert Panel */}
        <div className="card-panel" style={{ border: '1px solid #FDE68A', backgroundColor: '#FFFDF5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} color="#D97706" />
              <h2 className="title-section" style={{ color: '#92400E' }}>Critical Stock Alerts</h2>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setCurrentTab('inventory')}>
              Inventory
            </button>
          </div>

          {lowStockIngredients.length === 0 ? (
            <div style={{ fontSize: '13px', color: '#059669', fontWeight: '600', padding: '16px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} /> All ingredient stock levels are above safety thresholds
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {lowStockIngredients.map(ing => (
                <div key={ing.id} style={{
                  backgroundColor: '#FFFFFF',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #FDE68A',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 1px 2px rgba(245, 158, 11, 0.05)'
                }}>
                  <div>
                    <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '13.5px' }}>{ing.name}</div>
                    <div style={{ fontSize: '11.5px', color: '#E11D48', fontWeight: '700', marginTop: '2px' }}>
                      {ing.stock} {ing.unit} left (Threshold: {ing.minStock})
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm" style={{ height: '30px', fontSize: '12px' }} onClick={() => setCurrentTab('inventory')}>
                    Restock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
