import React, { useState } from 'react';
import { Settings, Save, Store, Printer, Percent } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const SettingsView = () => {
  const { restaurantInfo, setRestaurantInfo, showToast } = useAppState();

  const [formState, setFormState] = useState({ ...restaurantInfo });

  const handleSave = (e) => {
    e.preventDefault();
    setRestaurantInfo({ ...formState });
    showToast('Restaurant configuration saved successfully!', 'success');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 className="title-page">System Settings & Outlet Config</h1>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
            Restaurant profile, GST tax rates, thermal printer settings & receipt header
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={16} />
          <span>Save Settings</span>
        </button>
      </div>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Restaurant Profile Panel */}
        <div className="card-panel">
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Store size={18} color="#3366FF" />
            <span>Restaurant Outlet Information</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Business Name</label>
              <input
                type="text"
                className="input-field"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Outlet Branch</label>
              <input
                type="text"
                className="input-field"
                value={formState.outlet}
                onChange={(e) => setFormState({ ...formState, outlet: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Address</label>
              <input
                type="text"
                className="input-field"
                value={formState.address}
                onChange={(e) => setFormState({ ...formState, address: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>GSTIN Number</label>
                <input
                  type="text"
                  className="input-field"
                  value={formState.gstin}
                  onChange={(e) => setFormState({ ...formState, gstin: e.target.value })}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Default GST Tax Rate (%)</label>
                <input
                  type="number"
                  className="input-field"
                  value={formState.taxRate}
                  onChange={(e) => setFormState({ ...formState, taxRate: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Thermal Printer Settings */}
        <div className="card-panel">
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Printer size={18} color="#3366FF" />
            <span>Thermal Printer Configuration</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>Kitchen KOT Printer (80mm)</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Status: Connected (USB / Network 192.168.1.100)</div>
            </div>
            <span className="badge badge-green">Connected</span>
          </div>
        </div>
      </form>
    </div>
  );
};
