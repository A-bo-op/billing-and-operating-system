import React, { useState } from 'react';
import { X, UserPlus, Phone, Clock, Shield } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

const ROLES = ['Cashier', 'Manager', 'Head Chef', 'Kitchen Helper', 'Waiter', 'Inventory Staff'];

const SHIFTS = [
  '9 AM – 7 PM',
  '10 AM – 10 PM',
  '11 AM – 11 PM',
  '12 PM – 10 PM',
  '4 PM – 12 AM',
  '6 PM – 2 AM',
];

const EMPTY_FORM = {
  name: '',
  role: 'Waiter',
  shift: '10 AM – 10 PM',
  phone: '',
  status: 'On duty',
};

export const AddStaffModal = ({ isOpen, onClose }) => {
  const { addStaff } = useAppState();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s\-]{7,15}$/.test(form.phone.trim()))
      newErrors.phone = 'Enter a valid phone number';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    addStaff({ ...form, name: form.name.trim(), phone: form.phone.trim() });
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  const initials = form.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(17, 24, 39, 0.5)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          width: '500px',
          maxWidth: '92vw',
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UserPlus size={18} color="#3366FF" />
            </div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                Add New Employee
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Fill in the staff profile details below
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} color="#64748B" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Avatar Preview + Name */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: form.status === 'On duty' ? '#3366FF' : '#CBD5E1',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '20px',
                  transition: 'background-color 0.2s',
                }}
              >
                {initials}
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#475569',
                    marginBottom: '5px',
                  }}
                >
                  Full Name <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Anita Sharma"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  style={{ borderColor: errors.name ? '#DC2626' : undefined }}
                  autoFocus
                />
                {errors.name && (
                  <div style={{ fontSize: '12px', color: '#DC2626', marginTop: '3px' }}>
                    {errors.name}
                  </div>
                )}
              </div>
            </div>

            {/* Role + Shift */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#475569',
                    marginBottom: '5px',
                  }}
                >
                  <Shield size={13} color="#64748B" /> Role
                </label>
                <select
                  className="input-field"
                  value={form.role}
                  onChange={e => set('role', e.target.value)}
                >
                  {ROLES.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#475569',
                    marginBottom: '5px',
                  }}
                >
                  <Clock size={13} color="#64748B" /> Shift
                </label>
                <select
                  className="input-field"
                  value={form.shift}
                  onChange={e => set('shift', e.target.value)}
                >
                  {SHIFTS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#475569',
                  marginBottom: '5px',
                }}
              >
                <Phone size={13} color="#64748B" /> Phone Number <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="tel"
                className="input-field"
                placeholder="+91 98XXX XXXXX"
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
                style={{ borderColor: errors.phone ? '#DC2626' : undefined }}
              />
              {errors.phone && (
                <div style={{ fontSize: '12px', color: '#DC2626', marginTop: '3px' }}>
                  {errors.phone}
                </div>
              )}
            </div>

            {/* Initial Duty Status */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#475569',
                  marginBottom: '8px',
                }}
              >
                Initial Duty Status
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['On duty', 'Off duty'].map(status => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => set('status', status)}
                    style={{
                      flex: 1,
                      height: '38px',
                      borderRadius: '6px',
                      border: '1px solid',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      borderColor: form.status === status
                        ? (status === 'On duty' ? '#16A34A' : '#DC2626')
                        : '#E2E8F0',
                      backgroundColor: form.status === status
                        ? (status === 'On duty' ? '#F0FDF4' : '#FEF2F2')
                        : '#FFFFFF',
                      color: form.status === status
                        ? (status === 'On duty' ? '#16A34A' : '#DC2626')
                        : '#64748B',
                    }}
                  >
                    {status === 'On duty' ? '● On Duty' : '○ Off Duty'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '14px 20px',
              borderTop: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
            }}
          >
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <UserPlus size={16} />
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
