import React, { useState } from 'react';
import { PieChart, Download, Calendar, DollarSign, Utensils, Package } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const ReportsView = () => {
  const { invoices, dishes, ingredients, showToast } = useAppState();

  const [dateRange, setDateRange] = useState('Today');
  const [reportTab, setReportTab] = useState('sales');

  const grossSales = invoices.reduce((sum, i) => sum + i.subtotal, 0);
  const totalTax = invoices.reduce((sum, i) => sum + i.tax, 0);
  const totalDiscount = invoices.reduce((sum, i) => sum + i.discount, 0);
  const netSales = grossSales - totalDiscount + totalTax;

  const handleExportCSV = () => {
    showToast(`Exported ${reportTab.toUpperCase()} report as CSV file`, 'success');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 className="title-page">Operational Reports & Analytics</h1>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
            Comprehensive sales, payment method, category performance & wastage reports
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <select className="input-field" style={{ width: '160px' }} value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="Today">Today</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="This Month">This Month</option>
          </select>

          <button className="btn btn-primary" onClick={handleExportCSV}>
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', marginBottom: '20px', gap: '20px' }}>
        {['sales', 'items', 'payments', 'inventory'].map((tab) => (
          <button
            key={tab}
            onClick={() => setReportTab(tab)}
            style={{
              padding: '10px 4px',
              border: 'none',
              background: 'transparent',
              borderBottom: reportTab === tab ? '2px solid #3366FF' : '2px solid transparent',
              color: reportTab === tab ? '#3366FF' : '#64748B',
              fontWeight: reportTab === tab ? '700' : '500',
              fontSize: '14px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab} Report
          </button>
        ))}
      </div>

      {/* Report Content */}
      <div className="card-panel" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>GROSS SALES</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>₹{grossSales.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>TOTAL DISCOUNTS</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#DC2626' }}>-₹{totalDiscount}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>GST TAX COLLECTED</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>₹{totalTax}</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>NET SALES</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#16A34A' }}>₹{netSales.toLocaleString()}</div>
          </div>
        </div>

        {/* Detailed Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Metric / Category</th>
              <th>Volume / Count</th>
              <th>Gross Amount</th>
              <th>Net Contribution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontWeight: '700' }}>Dine-In Operations</td>
              <td>18 orders</td>
              <td>₹8,400</td>
              <td style={{ fontWeight: '700' }}>68%</td>
            </tr>
            <tr>
              <td style={{ fontWeight: '700' }}>Takeaway Orders</td>
              <td>10 orders</td>
              <td>₹3,200</td>
              <td style={{ fontWeight: '700' }}>24%</td>
            </tr>
            <tr>
              <td style={{ fontWeight: '700' }}>Delivery Orders</td>
              <td>4 orders</td>
              <td>₹1,850</td>
              <td style={{ fontWeight: '700' }}>8%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
