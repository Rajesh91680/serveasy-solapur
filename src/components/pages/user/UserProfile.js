// 

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  Mail,
  Calendar,
  LogOut,
  Edit2,
  Check,
  X,
  Clock,
  UserCheck,
} from 'lucide-react';
import { Navbar } from '../../Navbar';
import { Footer } from '../../Footer';
import {
  getCurrentUser,
  setCurrentUser,
  getBookings,
  getUsers,
  saveUsers,
  getProviders,
} from '../../../services/store';

export function UserProfile() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [saved, setSaved] = useState(false);

  if (!currentUser) {
    setTimeout(() => {
      if (!getCurrentUser()) navigate('/');
    }, 0);
    return null;
  }

  const userBookings = getBookings().filter((b) => b.userId === currentUser.id);
  const allProviders = getProviders();

  const handleSave = () => {
    const users = getUsers();
    saveUsers(
      users.map((u) =>
        u.id === currentUser.id ? { ...u, name: name.trim(), phone: phone.trim() } : u
      )
    );
    setCurrentUser({ ...currentUser, name: name.trim(), phone: phone.trim() });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 style={{ color: '#1A3C6E', fontSize: '28px', fontWeight: 700 }}>My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col items-center mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-3xl mb-3"
                  style={{ background: '#1A3C6E' }}
                >
                  {currentUser.name[0].toUpperCase()}
                </div>
                {saved && (
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: '#DCFCE7', color: '#166534' }}
                  >
                    ✅ Updated!
                  </span>
                )}
              </div>

              {editing ? (
                <div className="space-y-3 mb-4">
                  <div>
                    <label
                      className="text-xs font-semibold block mb-1"
                      style={{ color: '#6B7280' }}
                    >
                      Full Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs font-semibold block mb-1"
                      style={{ color: '#6B7280' }}
                    >
                      Phone
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none text-sm"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleSave}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1"
                      style={{ background: '#1A3C6E', color: 'white' }}
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setName(currentUser.name);
                        setPhone(currentUser.phone);
                      }}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1"
                      style={{ background: '#F1F5F9', color: '#64748B' }}
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 mb-4">
                  {[
                    { i: <User className="w-4 h-4" />, l: 'Name', v: currentUser.name },
                    { i: <Mail className="w-4 h-4" />, l: 'Email', v: currentUser.email },
                    { i: <Phone className="w-4 h-4" />, l: 'Phone', v: currentUser.phone || '—' },
                    { i: <Calendar className="w-4 h-4" />, l: 'Member Since', v: currentUser.createdAt },
                  ].map((x) => (
                    <div key={x.l} className="flex items-center gap-3">
                      <span className="flex-shrink-0" style={{ color: '#6B7280' }}>
                        {x.i}
                      </span>
                      <div>
                        <div className="text-xs" style={{ color: '#9CA3AF' }}>
                          {x.l}
                        </div>
                        <div className="font-semibold text-sm" style={{ color: '#1F2937' }}>
                          {x.v}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 mb-2"
                  style={{ background: '#EEF4FF', color: '#1A3C6E' }}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                style={{ background: '#FEE2E2', color: '#DC2626' }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-4">
              <div className="text-sm font-semibold mb-3" style={{ color: '#1A3C6E' }}>
                Booking Stats
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { l: 'Total', v: userBookings.length, c: '#1A3C6E' },
                  { l: 'Done', v: userBookings.filter((b) => b.status === 'completed').length, c: '#16A34A' },
                  { l: 'Active', v: userBookings.filter((b) => b.status !== 'completed').length, c: '#F97316' },
                ].map((s) => (
                  <div key={s.l} className="p-2 rounded-lg" style={{ background: '#F8FAFC' }}>
                    <div className="text-xl font-bold" style={{ color: s.c }}>
                      {s.v}
                    </div>
                    <div className="text-xs" style={{ color: '#94A3B8' }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 style={{ fontWeight: 700, color: '#1A3C6E', fontSize: '16px' }}>
                  My Bookings ({userBookings.length})
                </h2>
                <button
                  onClick={() => navigate('/')}
                  className="text-sm font-semibold px-4 py-2 rounded-lg"
                  style={{ background: '#F97316', color: 'white' }}
                >
                  + New
                </button>
              </div>

              {userBookings.length === 0 ? (
                <div className="text-center py-16">
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📋</div>
                  <div style={{ color: '#94A3B8' }}>No bookings yet.</div>
                  <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-6 py-2.5 rounded-lg font-semibold text-sm"
                    style={{ background: '#1A3C6E', color: 'white' }}
                  >
                    Book a Service
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {userBookings.map((b) => (
                    <div key={b.id} className="p-6 hover:bg-gray-50 transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div
                            className="font-bold flex items-center gap-2"
                            style={{ color: '#1F2937', fontSize: '18px' }}
                          >
                            {b.service}
                          </div>
                          <div
                            className="text-sm"
                            style={{ color: '#6B7280', marginTop: '2px' }}
                          >
                            {b.subType || 'General Maintenance'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-gray-400">ID: {b.id}</div>
                        </div>
                      </div>

                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm mt-3 pt-3 border-t border-gray-100"
                        style={{ color: '#4B5563' }}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>
                            {b.date} · {b.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="truncate" title={b.address}>
                            {b.address}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            navigate('/booking-request', {
                              state: {
                                service: b.service,
                                date: b.date,
                                time: b.time,
                                address: b.address,
                                providers: b.providers || [],
                                bookingId: `BK${String(b.id).slice(-6)}`,
                              },
                            })
                          }
                          className="px-4 py-2 rounded-lg text-sm font-semibold"
                          style={{ background: '#EEF4FF', color: '#1A3C6E' }}
                        >
                          View Booking Request
                        </button>

                        <button
                          onClick={() =>
                            navigate('/provider-accepted', {
                              state: {
                                providerName: b.providers?.[0] || 'Ravi Kumar',
                                scheduledTime: b.time || '10:00 AM',
                                contactNo: '9765271022',
                              },
                            })
                          }
                          className="px-4 py-2 rounded-lg text-sm font-semibold"
                          style={{ background: '#DBEAFE', color: '#1D4ED8' }}
                        >
                          <span className="inline-flex items-center gap-2">
                            <UserCheck className="w-4 h-4" />
                            Provider Accepted Page
                          </span>
                        </button>

                        <button
                          onClick={() => navigate('/service-completed')}
                          className="px-4 py-2 rounded-lg text-sm font-semibold"
                          style={{ background: '#F97316', color: 'white' }}
                        >
                          <span className="inline-flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Service Completed Page
                          </span>
                        </button>
                      </div>

                      {b.providers && b.providers.length > 0 && (
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-2">
                            <h4
                              className="text-[11px] font-extrabold"
                              style={{
                                color: '#94A3B8',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}
                            >
                              Professional Assignment & Status
                            </h4>
                          </div>

                          <div className="space-y-4">
                            {b.providers.map((pName) => {
                              const pEntry = allProviders.find((px) => px.name === pName);

                              return (
                                <div
                                  key={pName}
                                  className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:border-blue-200 transition-all duration-300"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-white shadow-sm flex items-center justify-center text-blue-700 font-extrabold text-lg">
                                        {pName[0].toUpperCase()}
                                      </div>
                                      <div>
                                        <div className="text-base font-bold" style={{ color: '#1F2937' }}>
                                          {pName}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                          <span
                                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{
                                              background: pEntry?.available ? '#DCFCE7' : '#FEF3C7',
                                              color: pEntry?.available ? '#166534' : '#92400E',
                                            }}
                                          >
                                            {pEntry?.available ? 'Available' : 'Pending'}
                                          </span>
                                          <span
                                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ background: '#EFF6FF', color: '#1E40AF' }}
                                          >
                                            Contract Given
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <a
                                      href={`tel:${pEntry?.phone}`}
                                      className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md active:scale-90"
                                      title="Call Professional"
                                    >
                                      <Phone className="w-5 h-5" />
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}