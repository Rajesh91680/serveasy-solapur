import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, Wrench, X } from 'lucide-react';
import axios from 'axios';
import { Navbar } from '../../Navbar';
import { Footer } from '../../Footer';

const API_URL = 'http://127.0.0.1:8000/api/';

const getCurrentUser = () => {
  const user = sessionStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

function DropdownPanel({ open, onClose, children, width = 280 }) {
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        width: `${width}px`,
        background: 'white',
        zIndex: 9999,
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [sel, setSel] = useState('');
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceSearch, setServiceSearch] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(API_URL + 'services/');
        setServices(res.data);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };
    fetchServices();
  }, []);

  const selectedService = services.find((s) => (s.id === sel || s.name === sel));
  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  const goToProviders = (serviceId) => {
    const selected = services.find((s) => s.id === serviceId);
    navigate('/providers', {
      state: {
        serviceId,
        service: selected?.name || 'Service',
        description: selected?.description || '',
        date: new Date().toLocaleDateString(),
        time: 'ASAP',
        amount: selected?.price ? `₹${selected.price}` : '₹499',
      },
    });
  };

  const handleServiceChoose = (serviceId) => {
    setSel(serviceId);
    setServiceOpen(false);
    setServiceSearch('');

    const user = getCurrentUser();

    if (!user) {
      sessionStorage.setItem(
        'pendingHomeService',
        JSON.stringify({ serviceId })
      );
      window.dispatchEvent(new CustomEvent("openAuth", { detail: { mode: "login" } }));
      return;
    }

    goToProviders(serviceId);
  };

  const handleSearch = () => {
    if (!sel) {
      alert('Please select a service first.');
      return;
    }

    const user = getCurrentUser();

    if (!user) {
      sessionStorage.setItem(
        'pendingHomeService',
        JSON.stringify({ serviceId: sel })
      );
      window.dispatchEvent(new CustomEvent("openAuth", { detail: { mode: "login" } }));
      return;
    }

    goToProviders(sel);
  };


  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section
        style={{
          background: 'linear-gradient(160deg, #EEF4FF 0%, #F8FAFF 50%, #FFF7ED 100%)',
          paddingTop: '80px',
          paddingBottom: '100px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'rgba(37,99,235,0.05)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-80px',
              left: '-80px',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'rgba(249,115,22,0.06)',
            }}
          />
        </div>

        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 58px)',
              fontWeight: 800,
              color: '#1E3A8A',
              lineHeight: 1.1,
              marginBottom: '16px',
              letterSpacing: '-0.5px',
            }}
          >
            Trusted Home Services in <span style={{ color: '#F97316' }}>Solapur</span>
          </h1>

          <p
            style={{
              color: '#6B7280',
              fontSize: '17px',
              lineHeight: 1.75,
              maxWidth: '480px',
              margin: '0 auto 52px',
            }}
          >
            Book verified professionals for AC repair, cleaning, plumbing &amp; more — right at
            your doorstep.
          </p>

          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 32px rgba(37,99,235,0.10), 0 1px 4px rgba(0,0,0,0.04)',
              border: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              maxWidth: '640px',
              margin: '0 auto',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <div style={{ flex: 1, position: 'relative' }}>
              <button
                onClick={() => {
                  setServiceOpen((v) => !v);
                }}
                style={{
                  width: '100%',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '0 20px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '16px 0 0 16px',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#EEF4FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Wrench style={{ width: '17px', height: '17px', color: '#2563EB' }} />
                </div>

                <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#9CA3AF',
                      letterSpacing: '0.6px',
                      textTransform: 'uppercase',
                      marginBottom: '3px',
                    }}
                  >
                    Service
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: sel ? 600 : 400,
                      color: sel ? '#111827' : '#9CA3AF',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {selectedService ? `${selectedService.icon} ${selectedService.name}` : 'Select a service'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  {sel && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSel('');
                        setServiceSearch('');
                      }}
                      style={{
                        background: '#F3F4F6',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      <X style={{ width: '11px', height: '11px', color: '#6B7280' }} />
                    </button>
                  )}
                  <ChevronDown
                    style={{
                      width: '16px',
                      height: '16px',
                      color: '#9CA3AF',
                      transform: serviceOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                    }}
                  />
                </div>
              </button>

              <DropdownPanel
                open={serviceOpen}
                onClose={() => {
                  setServiceOpen(false);
                  setServiceSearch('');
                }}
                width={320}
              >
                <div style={{ padding: '12px 12px 8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#F9FAFB',
                      border: '1.5px solid #E5E7EB',
                      borderRadius: '10px',
                      padding: '8px 12px',
                    }}
                  >
                    <Search style={{ width: '14px', height: '14px', color: '#9CA3AF', flexShrink: 0 }} />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search service..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        background: 'none',
                        fontSize: '13px',
                        color: '#111827',
                        width: '100%',
                        fontFamily: 'inherit',
                      }}
                    />
                    {serviceSearch && (
                      <button
                        onClick={() => setServiceSearch('')}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#9CA3AF',
                          padding: 0,
                          fontSize: '13px',
                          lineHeight: 1,
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    padding: '2px 16px 6px',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#9CA3AF',
                    letterSpacing: '0.6px',
                    textTransform: 'uppercase',
                  }}
                >
                  All Services
                </div>

                <div style={{ maxHeight: '260px', overflowY: 'auto', padding: '0 8px 8px' }}>
                  {filteredServices.length > 0 ? (
                    filteredServices.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleServiceChoose(s.id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 12px',
                          background: sel === s.id ? '#EEF4FF' : 'none',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ fontSize: '20px', lineHeight: 1, width: '26px', textAlign: 'center' }}>
                          {s.icon}
                        </span>
                        <span
                          style={{
                            fontSize: '14px',
                            fontWeight: sel === s.id ? 600 : 500,
                            color: sel === s.id ? '#1E3A8A' : '#374151',
                            flex: 1,
                          }}
                        >
                          {s.name}
                        </span>
                        {sel === s.id && <span style={{ fontSize: '12px', color: '#2563EB' }}>✓</span>}
                      </button>
                    ))
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>
                      No services found
                    </div>
                  )}
                </div>
              </DropdownPanel>
            </div>

            <div style={{ padding: '10px', flexShrink: 0 }}>
              <button
                onClick={handleSearch}
                style={{
                  height: '44px',
                  padding: '0 32px',
                  background: '#F97316',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 12px rgba(249,115,22,0.3)',
                }}
              >
                <Search style={{ width: '16px', height: '16px' }} />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 style={{ color: '#1E3A8A', fontSize: '34px', fontWeight: 700, marginBottom: '10px' }}>
              Our Services
            </h2>
            <p style={{ color: '#6B7280', fontSize: '16px' }}>Professional home services at your fingertips</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => handleServiceChoose(s.id)}
                className="p-6 rounded-2xl text-left hover:shadow-lg transition-all hover:-translate-y-1 bg-white"
                style={{ border: sel === s.id ? '2px solid #2563EB' : '1.5px solid #E5E7EB' }}
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 style={{ color: '#1F2937', fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>
                  {s.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}