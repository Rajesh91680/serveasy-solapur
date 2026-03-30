import { Link } from 'react-router-dom';
import { Home, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer id="footer" style={{ backgroundColor: '#0F172A', color: '#94A3B8' }}>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div><Link to="/" className="flex items-center gap-2 mb-4"><div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F97316' }}><Home className="w-5 h-5 text-white" /></div><div><span style={{ color: 'white', fontWeight: 600, fontSize: '18px' }}>ServeEasy</span><span style={{ color: '#F97316', fontWeight: 600, fontSize: '18px', marginLeft: '2px' }}>Solapur</span></div></Link><p style={{ fontSize: '14px', lineHeight: '1.6' }}>Trusted home services in Solapur.</p></div>
                    <div><h4 style={{ color: 'white', fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Services</h4><ul className="space-y-2" style={{ fontSize: '14px' }}>{['AC Repair', 'Electrician', 'Plumber', 'Home Cleaning', 'Carpenter', 'Pest Control', 'Beauty at Home', 'RO Repair'].map(s => <li key={s}><span className="hover:text-white cursor-pointer">{s}</span></li>)}</ul></div>
                    <div><h4 style={{ color: 'white', fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Company</h4><ul className="space-y-2" style={{ fontSize: '14px' }}>{['About Us', 'How It Works', 'Careers', 'Privacy Policy', 'Terms of Service'].map(s => <li key={s}><span className="hover:text-white cursor-pointer">{s}</span></li>)}</ul></div>
                    <div><h4 style={{ color: 'white', fontWeight: 600, marginBottom: '16px', fontSize: '15px' }}>Contact</h4><ul className="space-y-3" style={{ fontSize: '14px' }}><li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5" /><span>Solapur, Maharashtra, India</span></li><li className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>+91 98000 00000</span></li><li className="flex items-center gap-2"><Mail className="w-4 h-4" /><span>hello@serveeasysolapur.com</span></li></ul></div>
                </div>
                <div className="border-t mt-12 pt-6 text-center" style={{ borderColor: '#1E293B', fontSize: '13px' }}>© 2026 ServeEasy Solapur. All rights reserved.</div>
            </div>
        </footer>
    );
}
