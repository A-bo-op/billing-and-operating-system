import React from 'react';
import { BarChart3, TrendingUp, ShoppingBag, DollarSign, AlertTriangle, ArrowUpRight, Plus, Utensils } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const DashboardView = () => {
  const { invoices, todaysSales, todaysBilledCount, lowStockIngredients, dishes, setCurrentTab, startTakeawayOrder } = useAppState();

  const avgOrderValue = todaysBilledCount > 0 ? Math.round(todaysSales / todaysBilledCount) : 0;

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 className="title-page">Operational Dashboard</h1>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
            Real-time business activity, sales trends & inventory alerts
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setCurrentTab('tables')}>
            <Utensils size={14} color="#3366FF" />
            <span>Open Floor View</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={startTakeawayOrder}>
            <Plus size={14} />
            <span>New Takeaway Order</span>
          </button>
        </div>
      </div>

      {/* Top Operational KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
        <div className="card-panel">
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>Today's Net Sales</div>
          <div style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: '4px 0' }}>₹{todaysSales.toLocaleString()}</div>
          <div style={{ fontSize: '12px', color: todaysSales > 0 ? '#16A34A' : '#64748B' }}>
            {todaysSales > 0 ? '● Active daily revenue' : 'Waiting for first daily invoice'}
          </div>
        </div>

        <div className="card-panel">
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>Orders Billed</div>
          <div style={{ fontSize: '26px', fontWeight: '700', color: '#3366FF', margin: '4px 0' }}>{todaysBilledCount}</div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>Invoices completed today</div>
        </div>

        <div className="card-panel">
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>Avg Order Value</div>
          <div style={{ fontSize: '26px', fontWeight: '700', color: '#111827', margin: '4px 0' }}>₹{avgOrderValue}</div>
          <div style={{ fontSize: '12px', color: '#64748B' }}>Per invoice average</div>
        </div>

        <div className="card-panel">
          <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>Order Type Ratio</div>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '8px 0' }}>
            {todaysBilledCount > 0 ? 'Active Shift Sales' : 'Dine-in / Takeaway / Delivery'}
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: '60%', backgroundColor: '#3366FF', height: '100%' }} />
            <div style={{ width: '40%', backgroundColor: '#10B981', height: '100%' }} />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        {/* Recent Invoices Table */}
        <div className="card-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 className="title-section">Recent Invoices Billed</h2>
            <button className="btn btn-secondary btn-sm" onClick={() => setCurrentTab('invoices')}>
              View All Invoices
            </button>
          </div>

          {invoices.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748B', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px dashed #CBD5E1' }}>
              <Utensils size={32} color="#CBD5E1" style={{ marginBottom: '8px' }} />
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>No invoices billed today yet</div>
              <div style={{ fontSize: '13px', marginTop: '4px', marginBottom: '14px' }}>Click any free table on the floor or start a takeaway order to process your first bill.</div>
              <button className="btn btn-primary btn-sm" onClick={() => setCurrentTab('tables')}>
                Go to Floor / Tables
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
                    <td style={{ fontWeight: '700', color: '#3366FF' }}>{inv.invoiceNo}</td>
                    <td style={{ fontSize: '13px', color: '#64748B' }}>{inv.time}</td>
                    <td><span className="badge badge-gray">{inv.orderType}</span></td>
                    <td style={{ fontWeight: '600' }}>{inv.tableOrCustomer}</td>
                    <td><span className="badge badge-blue">{inv.paymentMethod}</span></td>
                    <td style={{ fontWeight: '700', color: '#111827' }}>₹{inv.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Low Stock Alert Panel */}
        <div className="card-panel" style={{ border: '1px solid #FDE68A', backgroundColor: '#FFFBEB' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} color="#D97706" />
              <h2 className="title-section" style={{ color: '#92400E' }}>Urgent Low Stock</h2>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => setCurrentTab('inventory')}>
              Inventory
            </button>
          </div>

          {lowStockIngredients.length === 0 ? (
            <div style={{ fontSize: '13px', color: '#16A34A', fontWeight: '600', padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '6px', border: '1px solid #BBF7D0' }}>
              ✓ All ingredient stock levels are above safety thresholds
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {lowStockIngredients.map(ing => (
                <div key={ing.id} style={{ backgroundColor: '#FFFFFF', padding: '10px 12px', borderRadius: '6px', border: '1px solid #FCD34D', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '700', color: '#111827', fontSize: '14px' }}>{ing.name}</div>
                    <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: '600' }}>Stock: {ing.stock} {ing.unit} (Min: {ing.minStock})</div>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={() => setCurrentTab('inventory')}>Adjust</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
