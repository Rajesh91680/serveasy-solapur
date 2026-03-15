// // const SEED_USERS = [
// //   { id: 'admin1', name: 'Admin', email: 'admin@gmail.com', password: 'admin123', phone: '9800000000', createdAt: '2026-01-01', status: 'active', role: 'admin' },
// //   { id: 'u1', name: 'Rahul Sharma', email: 'rahul@email.com', password: 'rahul123', phone: '9876543210', createdAt: '2026-02-01', status: 'active', role: 'user' },
// //   { id: 'u2', name: 'Priya Patel', email: 'priya@email.com', password: 'priya123', phone: '9876543211', createdAt: '2026-02-05', status: 'active', role: 'user' },
// //   { id: 'u3', name: 'Amit Kumar', email: 'amit@email.com', password: 'amit123', phone: '9876543212', createdAt: '2026-02-10', status: 'active', role: 'user' },
// //   { id: 'u4', name: 'Sneha Joshi', email: 'sneha@email.com', password: 'sneha123', phone: '9876543213', createdAt: '2026-02-12', status: 'active', role: 'user' },
// //   { id: 'u5', name: 'Vikram More', email: 'vikram@email.com', password: 'vikram123', phone: '9876543214', createdAt: '2026-02-15', status: 'active', role: 'user' },
// // ];

// // const SEED_BOOKINGS = [
// //   { id: 'BK-001', userId: 'u1', userName: 'Rahul Sharma', userEmail: 'rahul@email.com', service: 'AC Repair', subType: 'Split AC Service', date: '28 Feb 2026', time: '7-11 AM', address: 'Vijapur Road', providers: ['Ravi Kumar'], status: 'confirmed', amount: '₹499', createdAt: '2026-02-25' },
// //   { id: 'BK-002', userId: 'u2', userName: 'Priya Patel', userEmail: 'priya@email.com', service: 'Cleaning', subType: 'Deep Clean', date: '27 Feb 2026', time: '12-4 PM', address: 'Hotgi Road', providers: ['Suresh Patil'], status: 'completed', amount: '₹799', createdAt: '2026-02-24' },
// //   { id: 'BK-003', userId: 'u3', userName: 'Amit Kumar', userEmail: 'amit@email.com', service: 'Plumber', subType: 'Pipe Repair', date: '26 Feb 2026', time: '5-8 PM', address: 'Akkalkot Road', providers: ['Ganesh Sharma'], status: 'completed', amount: '₹299', createdAt: '2026-02-23' },
// //   { id: 'BK-004', userId: 'u1', userName: 'Rahul Sharma', userEmail: 'rahul@email.com', service: 'Electrician', subType: 'Switch & Socket Repair', date: '25 Feb 2026', time: '7-11 AM', address: 'Vijapur Road', providers: ['Ravi Kumar'], status: 'cancelled', amount: '₹399', createdAt: '2026-02-20' },
// //   { id: 'BK-005', userId: 'u2', userName: 'Priya Patel', userEmail: 'priya@email.com', service: 'Carpenter', subType: 'Basic Service', date: '24 Feb 2026', time: '12-4 PM', address: 'Hotgi Road', providers: ['Suresh Patil'], status: 'completed', amount: '₹999', createdAt: '2026-02-18' },
// // ];

// // const SEED_PROVIDERS = [
// //   { id: 1, name: 'Ravi Kumar', specialty: 'AC Repair Specialist', location: 'Vijapur Road', experience: '6 years', rating: 4.9, reviews: 127, available: true, services: ['ac-repair', 'electrician'], phone: '9800001111', email: '', status: 'active', documents: { aadhar: null, photo: null } },
// //   { id: 2, name: 'Suresh Patil', specialty: 'Cleaning & Carpentry Expert', location: 'Hotgi Road', experience: '8 years', rating: 4.8, reviews: 93, available: true, services: ['cleaning', 'carpenter', 'pest-control'], phone: '9800002222', email: '', status: 'active', documents: { aadhar: null, photo: null } },
// //   { id: 3, name: 'Ganesh Sharma', specialty: 'Plumbing Specialist', location: 'Akkalkot Road', experience: '5 years', rating: 4.7, reviews: 68, available: true, services: ['plumber', 'ro-repair'], phone: '9800003333', email: '', status: 'active', documents: { aadhar: null, photo: null } },
// //   { id: 4, name: 'Vikas Kumar', specialty: 'Electrician', location: 'Datta Nagar', experience: '4 years', rating: 4.6, reviews: 45, available: true, services: ['electrician', 'ac-repair'], phone: '9800004444', email: '', status: 'active', documents: { aadhar: null, photo: null } },
// //   { id: 5, name: 'Sanjay More', specialty: 'Pest Control Expert', location: 'Railway Lines', experience: '7 years', rating: 4.5, reviews: 82, available: true, services: ['pest-control', 'cleaning'], phone: '9800005555', email: '', status: 'active', documents: { aadhar: null, photo: null } },
// //   { id: 6, name: 'Preethi Deshpande', specialty: 'Beauty Specialist', location: 'Budhwar Peth', experience: '3 years', rating: 4.8, reviews: 54, available: true, services: ['beauty'], phone: '9800006666', email: '', status: 'active', documents: { aadhar: null, photo: null } },
// //   { id: 7, name: 'Mahesh Jadhav', specialty: 'AC & RO Expert', location: 'Sakhar Peth', experience: '9 years', rating: 4.9, reviews: 210, available: true, services: ['ac-repair', 'ro-repair', 'plumber'], phone: '9800007777', email: '', status: 'active', documents: { aadhar: null, photo: null } },
// //   { id: 8, name: 'Kavita More', specialty: 'Home Cleaning Expert', location: 'Siddheshwar Peth', experience: '5 years', rating: 4.7, reviews: 76, available: true, services: ['cleaning', 'beauty'], phone: '9800008888', email: '', status: 'active', documents: { aadhar: null, photo: null } },

// //   // ── New provider added ────────────────────────────────────────────────────
// //   { id: 9, name: 'Rajesh', specialty: 'Electrician', location: 'Solapur', experience: '0 years', rating: 5.0, reviews: 0, available: true, services: ['electrician', 'ac-repair'], phone: '9168060027', email: '', status: 'active', documents: { aadhar: null, photo: null } },
// // ];

// // const SEED_SERVICES = [
// //   { id: 'ac-repair', name: 'AC Repair', category: 'Appliances', description: 'AC service, repair and installation', basePrice: '₹499', status: 'active', createdAt: '2026-01-01' },
// //   { id: 'electrician', name: 'Electrician', category: 'Electrical', description: 'All electrical repairs and installations', basePrice: '₹399', status: 'active', createdAt: '2026-01-01' },
// //   { id: 'plumber', name: 'Plumber', category: 'Plumbing', description: 'All plumbing repair and installation', basePrice: '₹299', status: 'active', createdAt: '2026-01-01' },
// //   { id: 'cleaning', name: 'Home Cleaning', category: 'Cleaning', description: 'Professional deep cleaning services', basePrice: '₹499', status: 'active', createdAt: '2026-01-01' },
// //   { id: 'carpenter', name: 'Carpenter', category: 'Carpentry', description: 'Furniture repair and woodwork', basePrice: '₹399', status: 'active', createdAt: '2026-01-01' },
// //   { id: 'pest-control', name: 'Pest Control', category: 'Pest', description: 'Complete pest elimination for your home', basePrice: '₹299', status: 'active', createdAt: '2026-01-01' },
// //   { id: 'beauty', name: 'Beauty at Home', category: 'Beauty', description: 'Professional beauty services at home', basePrice: '₹349', status: 'active', createdAt: '2026-01-01' },
// //   { id: 'ro-repair', name: 'RO Repair', category: 'Appliances', description: 'RO water purifier service and repair', basePrice: '₹249', status: 'active', createdAt: '2026-01-01' },
// // ];

// // // ─── Seed helpers ─────────────────────────────────────────────────────────────

// // function seedUsers() {
// //   const existing = localStorage.getItem('sp_users');
// //   if (existing) {
// //     try {
// //       const arr = JSON.parse(existing);
// //       if (!arr.find((u) => u.email === 'admin@gmail.com')) {
// //         localStorage.setItem('sp_users', JSON.stringify(SEED_USERS));
// //       }
// //     } catch {
// //       localStorage.setItem('sp_users', JSON.stringify(SEED_USERS));
// //     }
// //   } else {
// //     localStorage.setItem('sp_users', JSON.stringify(SEED_USERS));
// //   }
// // }

// // // Seeds key only if not present yet
// // function seed(key, data) {
// //   if (!localStorage.getItem(key)) {
// //     localStorage.setItem(key, JSON.stringify(data));
// //   }
// // }

// // // Seeds providers and also ensures Rajesh is always present (reseed-safe)
// // function seedProviders() {
// //   const existing = localStorage.getItem('sp_providers');
// //   if (!existing) {
// //     localStorage.setItem('sp_providers', JSON.stringify(SEED_PROVIDERS));
// //     return;
// //   }
// //   try {
// //     const arr = JSON.parse(existing);
// //     const hasRajesh = arr.find((p) => p.id === 9);
// //     if (!hasRajesh) {
// //       // Append Rajesh to existing providers without wiping other data
// //       arr.push(SEED_PROVIDERS[SEED_PROVIDERS.length - 1]);
// //       localStorage.setItem('sp_providers', JSON.stringify(arr));
// //     }
// //   } catch {
// //     localStorage.setItem('sp_providers', JSON.stringify(SEED_PROVIDERS));
// //   }
// // }

// // function get(key, defaultData) {
// //   seed(key, defaultData);
// //   const raw = localStorage.getItem(key);
// //   return raw ? JSON.parse(raw) : [];
// // }

// // function set(key, data) {
// //   localStorage.setItem(key, JSON.stringify(data));
// // }

// // // ─── Users ────────────────────────────────────────────────────────────────────

// // export const getUsers = () => {
// //   seedUsers();
// //   const raw = localStorage.getItem('sp_users');
// //   return raw ? JSON.parse(raw) : SEED_USERS;
// // };

// // export const saveUsers = (users) => set('sp_users', users);

// // export const registerUser = (name, email, password, phone) => {
// //   const users = getUsers();
// //   if (users.find((u) => u.email.toLowerCase().trim() === email.toLowerCase().trim())) {
// //     return null; // email already exists
// //   }
// //   const newUser = {
// //     id: 'u' + Date.now(),
// //     name,
// //     email: email.toLowerCase().trim(),
// //     password,
// //     phone,
// //     createdAt: new Date().toISOString().split('T')[0],
// //     status: 'active',
// //     role: 'user',
// //   };
// //   saveUsers([...users, newUser]);
// //   return newUser;
// // };

// // export const loginUser = (email, password) => {
// //   const users = getUsers();
// //   return (
// //     users.find(
// //       (u) =>
// //         u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
// //         u.password === password &&
// //         u.status === 'active'
// //     ) ?? null
// //   );
// // };

// // export const getCurrentUser = () => {
// //   const raw = localStorage.getItem('sp_current_user');
// //   return raw ? JSON.parse(raw) : null;
// // };

// // export const setCurrentUser = (user) => {
// //   if (user) localStorage.setItem('sp_current_user', JSON.stringify(user));
// //   else localStorage.removeItem('sp_current_user');
// // };

// // // ─── Bookings ─────────────────────────────────────────────────────────────────

// // export const getBookings = () => get('sp_bookings', SEED_BOOKINGS);

// // export const saveBookings = (bookings) => set('sp_bookings', bookings);

// // export const addBooking = (booking) => {
// //   const bookings = getBookings();
// //   const newBooking = {
// //     ...booking,
// //     id: 'BK-' + String(bookings.length + 1).padStart(3, '0'),
// //     createdAt: new Date().toISOString().split('T')[0],
// //   };
// //   saveBookings([newBooking, ...bookings]);
// //   return newBooking;
// // };

// // // ─── Providers ────────────────────────────────────────────────────────────────

// // export const getProviders = () => {
// //   seedProviders();
// //   const raw = localStorage.getItem('sp_providers');
// //   return raw ? JSON.parse(raw) : SEED_PROVIDERS;
// // };

// // export const saveProviders = (providers) => set('sp_providers', providers);

// // // Admin: add a new provider
// // export const addProvider = (providerData) => {
// //   const providers = getProviders();
// //   const newProvider = {
// //     ...providerData,
// //     id: Date.now(),
// //     available: true,
// //     status: 'active',
// //     rating: providerData.rating || 5.0,
// //     reviews: providerData.reviews || 0,
// //     documents: providerData.documents || { aadhar: null, photo: null },
// //   };
// //   saveProviders([...providers, newProvider]);
// //   return newProvider;
// // };

// // // Admin: update provider documents (Aadhaar + Photo URLs)
// // export const updateProviderDocuments = (providerId, { aadhar, photo }) => {
// //   const providers = getProviders().map((p) =>
// //     p.id === providerId
// //       ? { ...p, documents: { aadhar: aadhar ?? p.documents?.aadhar, photo: photo ?? p.documents?.photo } }
// //       : p
// //   );
// //   saveProviders(providers);
// // };

// // // ─── Services ─────────────────────────────────────────────────────────────────

// // export const getServices = () => get('sp_services', SEED_SERVICES);

// // export const saveServices = (services) => set('sp_services', services);

// // // ─── Admin auth ───────────────────────────────────────────────────────────────

// // export const isAdminLoggedIn = () => localStorage.getItem('sp_admin') === 'true';

// // export const setAdminLoggedIn = (value) =>
// //   value
// //     ? localStorage.setItem('sp_admin', 'true')
// //     : localStorage.removeItem('sp_admin');

// // // ─── Ratings ──────────────────────────────────────────────────────────────────

// // export const getRatings = () => get('sp_ratings', []);

// // export const updateRatingStatus = (id, status) => {
// //   const ratings = getRatings();
// //   const updated = ratings.map((r) => (r.id === id ? { ...r, status } : r));
// //   set('sp_ratings', updated);
// // };
// // // Add address to user profile
// // export const addUserAddress = (userId, address) => {
// //   const users = getUsers();
// //   const updated = users.map((u) =>
// //     u.id === userId
// //       ? { ...u, addresses: [...(u.addresses || []), address] }
// //       : u
// //   );
// //   saveUsers(updated);
// // };




// const SEED_USERS = [
//   { id: 'admin1', name: 'Admin', email: 'admin@gmail.com', password: 'admin123', phone: '9800000000', createdAt: '2026-01-01', status: 'active', role: 'admin' },
//   { id: 'u1', name: 'Rahul Sharma', email: 'rahul@email.com', password: 'rahul123', phone: '9876543210', createdAt: '2026-02-01', status: 'active', role: 'user' },
//   { id: 'u2', name: 'Priya Patel', email: 'priya@email.com', password: 'priya123', phone: '9876543211', createdAt: '2026-02-05', status: 'active', role: 'user' },
//   { id: 'u3', name: 'Amit Kumar', email: 'amit@email.com', password: 'amit123', phone: '9876543212', createdAt: '2026-02-10', status: 'active', role: 'user' },
//   { id: 'u4', name: 'Sneha Joshi', email: 'sneha@email.com', password: 'sneha123', phone: '9876543213', createdAt: '2026-02-12', status: 'active', role: 'user' },
//   { id: 'u5', name: 'Vikram More', email: 'vikram@email.com', password: 'vikram123', phone: '9876543214', createdAt: '2026-02-15', status: 'active', role: 'user' },
// ];

// const SEED_BOOKINGS = [
//   { id: 'BK-001', userId: 'u1', userName: 'Rahul Sharma', userEmail: 'rahul@email.com', service: 'AC Repair', subType: 'Split AC Service', date: '28 Feb 2026', time: '7-11 AM', address: 'Vijapur Road', providers: ['Ravi Kumar'], status: 'confirmed', amount: '₹499', createdAt: '2026-02-25' },
//   { id: 'BK-002', userId: 'u2', userName: 'Priya Patel', userEmail: 'priya@email.com', service: 'Cleaning', subType: 'Deep Clean', date: '27 Feb 2026', time: '12-4 PM', address: 'Hotgi Road', providers: ['Suresh Patil'], status: 'completed', amount: '₹799', createdAt: '2026-02-24' },
//   { id: 'BK-003', userId: 'u3', userName: 'Amit Kumar', userEmail: 'amit@email.com', service: 'Plumber', subType: 'Pipe Repair', date: '26 Feb 2026', time: '5-8 PM', address: 'Akkalkot Road', providers: ['Ganesh Sharma'], status: 'completed', amount: '₹299', createdAt: '2026-02-23' },
//   { id: 'BK-004', userId: 'u1', userName: 'Rahul Sharma', userEmail: 'rahul@email.com', service: 'Electrician', subType: 'Switch & Socket Repair', date: '25 Feb 2026', time: '7-11 AM', address: 'Vijapur Road', providers: ['Ravi Kumar'], status: 'cancelled', amount: '₹399', createdAt: '2026-02-20' },
//   { id: 'BK-005', userId: 'u2', userName: 'Priya Patel', userEmail: 'priya@email.com', service: 'Carpenter', subType: 'Basic Service', date: '24 Feb 2026', time: '12-4 PM', address: 'Hotgi Road', providers: ['Suresh Patil'], status: 'completed', amount: '₹999', createdAt: '2026-02-18' },
// ];

// const SEED_PROVIDERS = [
//   {
//     id: 1, name: 'Ravi Kumar', specialty: 'AC Repair Specialist', location: 'Vijapur Road',
//     experience: '6 years', rating: 4.9, reviews: 127, available: true,
//     services: ['ac-repair', 'electrician'], phone: '9800001111', email: 'ravi@serveeasySolapur.com', status: 'active',
//     documents: { aadhar: null, photo: null },
//     about: 'Expert in split & window AC servicing, gas refilling, and complete AC installation. Serving Solapur since 2018 with 100% customer satisfaction guarantee.',
//     languages: ['Marathi', 'Hindi'],
//     charge: '₹499/visit',
//     workingHours: '8 AM – 8 PM',
//     servicesOffered: ['AC Service', 'Gas Refilling', 'AC Installation', 'Electrician Work'],
//   },
//   {
//     id: 2, name: 'Suresh Patil', specialty: 'Cleaning & Carpentry Expert', location: 'Hotgi Road',
//     experience: '8 years', rating: 4.8, reviews: 93, available: true,
//     services: ['cleaning', 'carpenter', 'pest-control'], phone: '9800002222', email: 'suresh@serveeasysolapur.com', status: 'active',
//     documents: { aadhar: null, photo: null },
//     about: 'Professional deep cleaning and carpentry expert. Specialized in sofa cleaning, bathroom cleaning, kitchen deep clean, and all types of wooden furniture repair.',
//     languages: ['Marathi', 'Kannada'],
//     charge: '₹399/visit',
//     workingHours: '7 AM – 7 PM',
//     servicesOffered: ['Deep Cleaning', 'Sofa Cleaning', 'Furniture Repair', 'Pest Control'],
//   },
//   {
//     id: 3, name: 'Ganesh Sharma', specialty: 'Plumbing Specialist', location: 'Akkalkot Road',
//     experience: '5 years', rating: 4.7, reviews: 68, available: true,
//     services: ['plumber', 'ro-repair'], phone: '9800003333', email: '', status: 'active',
//     documents: { aadhar: null, photo: null },
//     about: 'Skilled plumber handling pipe leakage, tap & shower repair, toilet fitting, and RO water purifier installation and service across Solapur.',
//     languages: ['Hindi', 'Marathi'],
//     charge: '₹299/visit',
//     workingHours: '8 AM – 6 PM',
//     servicesOffered: ['Pipe Repair', 'Tap & Shower', 'Toilet Fitting', 'RO Service'],
//   },
//   {
//     id: 4, name: 'Vikas Kumar', specialty: 'Electrician', location: 'Datta Nagar',
//     experience: '4 years', rating: 4.6, reviews: 45, available: true,
//     services: ['electrician', 'ac-repair'], phone: '9800004444', email: '', status: 'active',
//     documents: { aadhar: null, photo: null },
//     about: 'Certified electrician for home wiring, switch & socket repair, ceiling fan installation, inverter setup, and minor AC electrical work.',
//     languages: ['Hindi', 'Marathi'],
//     charge: '₹399/visit',
//     workingHours: '9 AM – 7 PM',
//     servicesOffered: ['Home Wiring', 'Switch & Socket', 'Fan Installation', 'Inverter Setup'],
//   },
//   {
//     id: 5, name: 'Sanjay More', specialty: 'Pest Control Expert', location: 'Railway Lines',
//     experience: '7 years', rating: 4.5, reviews: 82, available: true,
//     services: ['pest-control', 'cleaning'], phone: '9800005555', email: '', status: 'active',
//     documents: { aadhar: null, photo: null },
//     about: 'Government-licensed pest control professional. Expert in cockroach, termite, bed bug, and rodent treatment using safe, certified chemicals for homes and offices.',
//     languages: ['Marathi', 'Urdu'],
//     charge: '₹299/visit',
//     workingHours: '8 AM – 6 PM',
//     servicesOffered: ['Cockroach Control', 'Termite Treatment', 'Bed Bug Removal', 'Rodent Control'],
//   },
//   {
//     id: 6, name: 'Preethi Deshpande', specialty: 'Beauty Specialist', location: 'Budhwar Peth',
//     experience: '3 years', rating: 4.8, reviews: 54, available: true,
//     services: ['beauty'], phone: '9800006666', email: '', status: 'active',
//     documents: { aadhar: null, photo: null },
//     about: 'Certified beauty professional offering bridal makeup, facial, waxing, threading, and hair care at your doorstep. Uses only branded and skin-safe products.',
//     languages: ['Marathi', 'Hindi', 'English'],
//     charge: '₹349/visit',
//     workingHours: '9 AM – 8 PM',
//     servicesOffered: ['Bridal Makeup', 'Facial & Cleanup', 'Waxing & Threading', 'Hair Care'],
//   },
//   {
//     id: 7, name: 'Mahesh Jadhav', specialty: 'AC & RO Expert', location: 'Sakhar Peth',
//     experience: '9 years', rating: 4.9, reviews: 210, available: true,
//     services: ['ac-repair', 'ro-repair', 'plumber'], phone: '9800007777', email: '', status: 'active',
//     documents: { aadhar: null, photo: null },
//     about: 'Senior technician with 9 years of AC and RO purifier expertise. Handles all brands — LG, Samsung, Voltas, Daikin, Kent, Aquaguard. Free diagnosis on every visit.',
//     languages: ['Marathi', 'Hindi'],
//     charge: '₹499/visit',
//     workingHours: '7 AM – 9 PM',
//     servicesOffered: ['AC Service All Brands', 'RO Installation', 'RO Service', 'Plumbing'],
//   },
//   {
//     id: 8, name: 'Kavita More', specialty: 'Home Cleaning Expert', location: 'Siddheshwar Peth',
//     experience: '5 years', rating: 4.7, reviews: 76, available: true,
//     services: ['cleaning', 'beauty'], phone: '9800008888', email: '', status: 'active',
//     documents: { aadhar: null, photo: null },
//     about: 'Professional home and office cleaning with eco-friendly products. Specializes in post-construction cleaning, kitchen deep clean, and regular maintenance cleaning.',
//     languages: ['Marathi', 'Kannada'],
//     charge: '₹399/visit',
//     workingHours: '8 AM – 6 PM',
//     servicesOffered: ['Deep Cleaning', 'Kitchen Clean', 'Bathroom Clean', 'Post-Construction'],
//   },
//   {
//     id: 9, name: 'Rajesh Kulkarni', specialty: 'Electrician', location: 'Solapur',
//     experience: '2 years', rating: 5.0, reviews: 0, available: true,
//     services: ['electrician', 'ac-repair'], phone: '9168060027', email: '', status: 'active',
//     documents: { aadhar: null, photo: null },
//     about: 'New but passionate electrician trained from ITI Solapur. Handles basic to advanced electrical work with full dedication and on-time service commitment.',
//     languages: ['Marathi', 'Hindi'],
//     charge: '₹299/visit',
//     workingHours: '9 AM – 7 PM',
//     servicesOffered: ['Wiring', 'Switch & Socket', 'AC Electrical', 'Fan & Light Fitting'],
//   },
// ];

// const SEED_SERVICES = [
//   { id: 'ac-repair', name: 'AC Repair', category: 'Appliances', description: 'AC service, repair and installation', basePrice: '₹499', status: 'active', createdAt: '2026-01-01' },
//   { id: 'electrician', name: 'Electrician', category: 'Electrical', description: 'All electrical repairs and installations', basePrice: '₹399', status: 'active', createdAt: '2026-01-01' },
//   { id: 'plumber', name: 'Plumber', category: 'Plumbing', description: 'All plumbing repair and installation', basePrice: '₹299', status: 'active', createdAt: '2026-01-01' },
//   { id: 'cleaning', name: 'Home Cleaning', category: 'Cleaning', description: 'Professional deep cleaning services', basePrice: '₹499', status: 'active', createdAt: '2026-01-01' },
//   { id: 'carpenter', name: 'Carpenter', category: 'Carpentry', description: 'Furniture repair and woodwork', basePrice: '₹399', status: 'active', createdAt: '2026-01-01' },
//   { id: 'pest-control', name: 'Pest Control', category: 'Pest', description: 'Complete pest elimination for your home', basePrice: '₹299', status: 'active', createdAt: '2026-01-01' },
//   { id: 'beauty', name: 'Beauty at Home', category: 'Beauty', description: 'Professional beauty services at home', basePrice: '₹349', status: 'active', createdAt: '2026-01-01' },
//   { id: 'ro-repair', name: 'RO Repair', category: 'Appliances', description: 'RO water purifier service and repair', basePrice: '₹249', status: 'active', createdAt: '2026-01-01' },
// ];

// // ─── Seed helpers ─────────────────────────────────────────────────────────────

// function seedUsers() {
//   const existing = localStorage.getItem('sp_users');
//   if (existing) {
//     try {
//       const arr = JSON.parse(existing);
//       if (!arr.find((u) => u.email === 'admin@gmail.com')) {
//         localStorage.setItem('sp_users', JSON.stringify(SEED_USERS));
//       }
//     } catch {
//       localStorage.setItem('sp_users', JSON.stringify(SEED_USERS));
//     }
//   } else {
//     localStorage.setItem('sp_users', JSON.stringify(SEED_USERS));
//   }
// }

// // Seeds key only if not present yet
// function seed(key, data) {
//   if (!localStorage.getItem(key)) {
//     localStorage.setItem(key, JSON.stringify(data));
//   }
// }

// // Seeds providers and also ensures Rajesh is always present (reseed-safe)
// function seedProviders() {
//   const existing = localStorage.getItem('sp_providers');
//   if (!existing) {
//     localStorage.setItem('sp_providers', JSON.stringify(SEED_PROVIDERS));
//     return;
//   }
//   try {
//     const arr = JSON.parse(existing);
//     const hasRajesh = arr.find((p) => p.id === 9);
//     if (!hasRajesh) {
//       // Append Rajesh to existing providers without wiping other data
//       arr.push(SEED_PROVIDERS[SEED_PROVIDERS.length - 1]);
//       localStorage.setItem('sp_providers', JSON.stringify(arr));
//     }
//   } catch {
//     localStorage.setItem('sp_providers', JSON.stringify(SEED_PROVIDERS));
//   }
// }

// function get(key, defaultData) {
//   seed(key, defaultData);
//   const raw = localStorage.getItem(key);
//   return raw ? JSON.parse(raw) : [];
// }

// function set(key, data) {
//   localStorage.setItem(key, JSON.stringify(data));
// }

// // ─── Users ────────────────────────────────────────────────────────────────────

// export const getUsers = () => {
//   seedUsers();
//   const raw = localStorage.getItem('sp_users');
//   return raw ? JSON.parse(raw) : SEED_USERS;
// };

// export const saveUsers = (users) => set('sp_users', users);

// export const registerUser = (name, email, password, phone) => {
//   const users = getUsers();
//   if (users.find((u) => u.email.toLowerCase().trim() === email.toLowerCase().trim())) {
//     return null; // email already exists
//   }
//   const newUser = {
//     id: 'u' + Date.now(),
//     name,
//     email: email.toLowerCase().trim(),
//     password,
//     phone,
//     createdAt: new Date().toISOString().split('T')[0],
//     status: 'active',
//     role: 'user',
//   };
//   saveUsers([...users, newUser]);
//   return newUser;
// };

// export const loginUser = (email, password) => {
//   const users = getUsers();
//   return (
//     users.find(
//       (u) =>
//         u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
//         u.password === password &&
//         u.status === 'active'
//     ) ?? null
//   );
// };

// export const getCurrentUser = () => {
//   const raw = localStorage.getItem('sp_current_user');
//   return raw ? JSON.parse(raw) : null;
// };

// export const setCurrentUser = (user) => {
//   if (user) localStorage.setItem('sp_current_user', JSON.stringify(user));
//   else localStorage.removeItem('sp_current_user');
// };

// // ─── Bookings ─────────────────────────────────────────────────────────────────

// export const getBookings = () => get('sp_bookings', SEED_BOOKINGS);

// export const saveBookings = (bookings) => set('sp_bookings', bookings);

// export const addBooking = (booking) => {
//   const bookings = getBookings();
//   const newBooking = {
//     ...booking,
//     id: 'BK-' + String(bookings.length + 1).padStart(3, '0'),
//     createdAt: new Date().toISOString().split('T')[0],
//   };
//   saveBookings([newBooking, ...bookings]);
//   return newBooking;
// };

// // ─── Providers ────────────────────────────────────────────────────────────────

// export const getProviders = () => {
//   seedProviders();
//   const raw = localStorage.getItem('sp_providers');
//   return raw ? JSON.parse(raw) : SEED_PROVIDERS;
// };

// export const saveProviders = (providers) => set('sp_providers', providers);

// // Admin: add a new provider
// export const addProvider = (providerData) => {
//   const providers = getProviders();
//   const newProvider = {
//     ...providerData,
//     id: Date.now(),
//     available: true,
//     status: 'active',
//     rating: providerData.rating || 5.0,
//     reviews: providerData.reviews || 0,
//     documents: providerData.documents || { aadhar: null, photo: null },
//   };
//   saveProviders([...providers, newProvider]);
//   return newProvider;
// };

// // Admin: update provider documents (Aadhaar + Photo URLs)
// export const updateProviderDocuments = (providerId, { aadhar, photo }) => {
//   const providers = getProviders().map((p) =>
//     p.id === providerId
//       ? { ...p, documents: { aadhar: aadhar ?? p.documents?.aadhar, photo: photo ?? p.documents?.photo } }
//       : p
//   );
//   saveProviders(providers);
// };

// // ─── Services ─────────────────────────────────────────────────────────────────

// export const getServices = () => get('sp_services', SEED_SERVICES);

// export const saveServices = (services) => set('sp_services', services);

// // ─── Admin auth ───────────────────────────────────────────────────────────────

// export const isAdminLoggedIn = () => localStorage.getItem('sp_admin') === 'true';

// export const setAdminLoggedIn = (value) =>
//   value
//     ? localStorage.setItem('sp_admin', 'true')
//     : localStorage.removeItem('sp_admin');

// // ─── Ratings ──────────────────────────────────────────────────────────────────

// export const getRatings = () => get('sp_ratings', []);

// export const updateRatingStatus = (id, status) => {
//   const ratings = getRatings();
//   const updated = ratings.map((r) => (r.id === id ? { ...r, status } : r));
//   set('sp_ratings', updated);
// };



const SEED_USERS = [
  { id: 'admin1', name: 'Admin', email: 'admin@gmail.com', password: 'admin123', phone: '9800000000', createdAt: '2026-01-01', status: 'active', role: 'admin' },
  { id: 'u1', name: 'Rahul Sharma', email: 'rahul@email.com', password: 'rahul123', phone: '9876543210', createdAt: '2026-02-01', status: 'active', role: 'user' },
  { id: 'u2', name: 'Priya Patel', email: 'priya@email.com', password: 'priya123', phone: '9876543211', createdAt: '2026-02-05', status: 'active', role: 'user' },
  { id: 'u3', name: 'Amit Kumar', email: 'amit@email.com', password: 'amit123', phone: '9876543212', createdAt: '2026-02-10', status: 'active', role: 'user' },
  { id: 'u4', name: 'Sneha Joshi', email: 'sneha@email.com', password: 'sneha123', phone: '9876543213', createdAt: '2026-02-12', status: 'active', role: 'user' },
  { id: 'u5', name: 'Vikram More', email: 'vikram@email.com', password: 'vikram123', phone: '9876543214', createdAt: '2026-02-15', status: 'active', role: 'user' },
];

const SEED_BOOKINGS = [
  { id: 'BK-001', userId: 'u1', userName: 'Rahul Sharma', userEmail: 'rahul@email.com', service: 'AC Repair', subType: 'Split AC Service', date: '28 Feb 2026', time: '7-11 AM', address: 'Vijapur Road', providers: ['Ravi Kumar'], status: 'confirmed', amount: '₹499', createdAt: '2026-02-25' },
  { id: 'BK-002', userId: 'u2', userName: 'Priya Patel', userEmail: 'priya@email.com', service: 'Cleaning', subType: 'Deep Clean', date: '27 Feb 2026', time: '12-4 PM', address: 'Hotgi Road', providers: ['Suresh Patil'], status: 'completed', amount: '₹799', createdAt: '2026-02-24' },
  { id: 'BK-003', userId: 'u3', userName: 'Amit Kumar', userEmail: 'amit@email.com', service: 'Plumber', subType: 'Pipe Repair', date: '26 Feb 2026', time: '5-8 PM', address: 'Akkalkot Road', providers: ['Ganesh Sharma'], status: 'completed', amount: '₹299', createdAt: '2026-02-23' },
  { id: 'BK-004', userId: 'u1', userName: 'Rahul Sharma', userEmail: 'rahul@email.com', service: 'Electrician', subType: 'Switch & Socket Repair', date: '25 Feb 2026', time: '7-11 AM', address: 'Vijapur Road', providers: ['Ravi Kumar'], status: 'cancelled', amount: '₹399', createdAt: '2026-02-20' },
  { id: 'BK-005', userId: 'u2', userName: 'Priya Patel', userEmail: 'priya@email.com', service: 'Carpenter', subType: 'Basic Service', date: '24 Feb 2026', time: '12-4 PM', address: 'Hotgi Road', providers: ['Suresh Patil'], status: 'completed', amount: '₹999', createdAt: '2026-02-18' },
];

const SEED_PROVIDERS = [
  {
    id: 1, name: 'Ravi Kumar', specialty: 'AC Repair Specialist', location: 'Vijapur Road',
    experience: '6 years', rating: 4.9, reviews: 127, available: true,
    services: ['ac-repair', 'electrician'], phone: '9800001111', email: 'ravi@serveeasySolapur.com', status: 'active',
    documents: { aadhar: null, photo: null },
    about: 'Expert in split & window AC servicing, gas refilling, and complete AC installation. Serving Solapur since 2018 with 100% customer satisfaction guarantee.',
    languages: ['Marathi', 'Hindi'],
    charge: '₹499/visit',
    workingHours: '8 AM – 8 PM',
    servicesOffered: ['AC Service', 'Gas Refilling', 'AC Installation', 'Electrician Work'],
  },
  {
    id: 2, name: 'Suresh Patil', specialty: 'Cleaning & Carpentry Expert', location: 'Hotgi Road',
    experience: '8 years', rating: 4.8, reviews: 93, available: true,
    services: ['cleaning', 'carpenter', 'pest-control'], phone: '9800002222', email: 'suresh@serveeasysolapur.com', status: 'active',
    documents: { aadhar: null, photo: null },
    about: 'Professional deep cleaning and carpentry expert. Specialized in sofa cleaning, bathroom cleaning, kitchen deep clean, and all types of wooden furniture repair.',
    languages: ['Marathi', 'Kannada'],
    charge: '₹399/visit',
    workingHours: '7 AM – 7 PM',
    servicesOffered: ['Deep Cleaning', 'Sofa Cleaning', 'Furniture Repair', 'Pest Control'],
  },
  {
    id: 3, name: 'Ganesh Sharma', specialty: 'Plumbing Specialist', location: 'Akkalkot Road',
    experience: '5 years', rating: 4.7, reviews: 68, available: true,
    services: ['plumber', 'ro-repair'], phone: '9800003333', email: '', status: 'active',
    documents: { aadhar: null, photo: null },
    about: 'Skilled plumber handling pipe leakage, tap & shower repair, toilet fitting, and RO water purifier installation and service across Solapur.',
    languages: ['Hindi', 'Marathi'],
    charge: '₹299/visit',
    workingHours: '8 AM – 6 PM',
    servicesOffered: ['Pipe Repair', 'Tap & Shower', 'Toilet Fitting', 'RO Service'],
  },
  {
    id: 4, name: 'Vikas Kumar', specialty: 'Electrician', location: 'Datta Nagar',
    experience: '4 years', rating: 4.6, reviews: 45, available: true,
    services: ['electrician', 'ac-repair'], phone: '9800004444', email: '', status: 'active',
    documents: { aadhar: null, photo: null },
    about: 'Certified electrician for home wiring, switch & socket repair, ceiling fan installation, inverter setup, and minor AC electrical work.',
    languages: ['Hindi', 'Marathi'],
    charge: '₹399/visit',
    workingHours: '9 AM – 7 PM',
    servicesOffered: ['Home Wiring', 'Switch & Socket', 'Fan Installation', 'Inverter Setup'],
  },
  {
    id: 5, name: 'Sanjay More', specialty: 'Pest Control Expert', location: 'Railway Lines',
    experience: '7 years', rating: 4.5, reviews: 82, available: true,
    services: ['pest-control', 'cleaning'], phone: '9800005555', email: '', status: 'active',
    documents: { aadhar: null, photo: null },
    about: 'Government-licensed pest control professional. Expert in cockroach, termite, bed bug, and rodent treatment using safe, certified chemicals for homes and offices.',
    languages: ['Marathi', 'Urdu'],
    charge: '₹299/visit',
    workingHours: '8 AM – 6 PM',
    servicesOffered: ['Cockroach Control', 'Termite Treatment', 'Bed Bug Removal', 'Rodent Control'],
  },
  {
    id: 6, name: 'Preethi Deshpande', specialty: 'Beauty Specialist', location: 'Budhwar Peth',
    experience: '3 years', rating: 4.8, reviews: 54, available: true,
    services: ['beauty'], phone: '9800006666', email: '', status: 'active',
    documents: { aadhar: null, photo: null },
    about: 'Certified beauty professional offering bridal makeup, facial, waxing, threading, and hair care at your doorstep. Uses only branded and skin-safe products.',
    languages: ['Marathi', 'Hindi', 'English'],
    charge: '₹349/visit',
    workingHours: '9 AM – 8 PM',
    servicesOffered: ['Bridal Makeup', 'Facial & Cleanup', 'Waxing & Threading', 'Hair Care'],
  },
  {
    id: 7, name: 'Mahesh Jadhav', specialty: 'AC & RO Expert', location: 'Sakhar Peth',
    experience: '9 years', rating: 4.9, reviews: 210, available: true,
    services: ['ac-repair', 'ro-repair', 'plumber'], phone: '9800007777', email: '', status: 'active',
    documents: { aadhar: null, photo: null },
    about: 'Senior technician with 9 years of AC and RO purifier expertise. Handles all brands — LG, Samsung, Voltas, Daikin, Kent, Aquaguard. Free diagnosis on every visit.',
    languages: ['Marathi', 'Hindi'],
    charge: '₹499/visit',
    workingHours: '7 AM – 9 PM',
    servicesOffered: ['AC Service All Brands', 'RO Installation', 'RO Service', 'Plumbing'],
  },
  {
    id: 8, name: 'Kavita More', specialty: 'Home Cleaning Expert', location: 'Siddheshwar Peth',
    experience: '5 years', rating: 4.7, reviews: 76, available: true,
    services: ['cleaning', 'beauty'], phone: '9800008888', email: '', status: 'active',
    documents: { aadhar: null, photo: null },
    about: 'Professional home and office cleaning with eco-friendly products. Specializes in post-construction cleaning, kitchen deep clean, and regular maintenance cleaning.',
    languages: ['Marathi', 'Kannada'],
    charge: '₹399/visit',
    workingHours: '8 AM – 6 PM',
    servicesOffered: ['Deep Cleaning', 'Kitchen Clean', 'Bathroom Clean', 'Post-Construction'],
  },
  {
    id: 9, name: 'Rajesh Kulkarni', specialty: 'Electrician', location: 'Solapur',
    experience: '2 years', rating: 5.0, reviews: 0, available: true,
    services: ['electrician', 'ac-repair'], phone: '9168060027', email: '', status: 'active',
    documents: { aadhar: null, photo: null },
    about: 'New but passionate electrician trained from ITI Solapur. Handles basic to advanced electrical work with full dedication and on-time service commitment.',
    languages: ['Marathi', 'Hindi'],
    charge: '₹299/visit',
    workingHours: '9 AM – 7 PM',
    servicesOffered: ['Wiring', 'Switch & Socket', 'AC Electrical', 'Fan & Light Fitting'],
  },
];

const SEED_SERVICES = [
  { id: 'ac-repair', name: 'AC Repair', category: 'Appliances', description: 'AC service, repair and installation', basePrice: '₹499', status: 'active', createdAt: '2026-01-01' },
  { id: 'electrician', name: 'Electrician', category: 'Electrical', description: 'All electrical repairs and installations', basePrice: '₹399', status: 'active', createdAt: '2026-01-01' },
  { id: 'plumber', name: 'Plumber', category: 'Plumbing', description: 'All plumbing repair and installation', basePrice: '₹299', status: 'active', createdAt: '2026-01-01' },
  { id: 'cleaning', name: 'Home Cleaning', category: 'Cleaning', description: 'Professional deep cleaning services', basePrice: '₹499', status: 'active', createdAt: '2026-01-01' },
  { id: 'carpenter', name: 'Carpenter', category: 'Carpentry', description: 'Furniture repair and woodwork', basePrice: '₹399', status: 'active', createdAt: '2026-01-01' },
  { id: 'pest-control', name: 'Pest Control', category: 'Pest', description: 'Complete pest elimination for your home', basePrice: '₹299', status: 'active', createdAt: '2026-01-01' },
  { id: 'beauty', name: 'Beauty at Home', category: 'Beauty', description: 'Professional beauty services at home', basePrice: '₹349', status: 'active', createdAt: '2026-01-01' },
  { id: 'ro-repair', name: 'RO Repair', category: 'Appliances', description: 'RO water purifier service and repair', basePrice: '₹249', status: 'active', createdAt: '2026-01-01' },
];

// ─── Seed helpers ─────────────────────────────────────────────────────────────

function seedUsers() {
  const existing = localStorage.getItem('sp_users');
  if (existing) {
    try {
      const arr = JSON.parse(existing);
      if (!arr.find((u) => u.email === 'admin@gmail.com')) {
        localStorage.setItem('sp_users', JSON.stringify(SEED_USERS));
      }
    } catch {
      localStorage.setItem('sp_users', JSON.stringify(SEED_USERS));
    }
  } else {
    localStorage.setItem('sp_users', JSON.stringify(SEED_USERS));
  }
}

// Seeds key only if not present yet
function seed(key, data) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

// Force-reseeds providers when schema version changes
const PROVIDER_VERSION = 'v3'; // bump this whenever you add new fields
function seedProviders() {
  const savedVersion = localStorage.getItem('sp_providers_version');
  if (savedVersion !== PROVIDER_VERSION) {
    // New version — always overwrite with fresh seed data
    localStorage.setItem('sp_providers', JSON.stringify(SEED_PROVIDERS));
    localStorage.setItem('sp_providers_version', PROVIDER_VERSION);
    return;
  }
  const existing = localStorage.getItem('sp_providers');
  if (!existing) {
    localStorage.setItem('sp_providers', JSON.stringify(SEED_PROVIDERS));
  }
}

function get(key, defaultData) {
  seed(key, defaultData);
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

function set(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── Users ────────────────────────────────────────────────────────────────────

export const getUsers = () => {
  seedUsers();
  const raw = localStorage.getItem('sp_users');
  return raw ? JSON.parse(raw) : SEED_USERS;
};

export const saveUsers = (users) => set('sp_users', users);

export const registerUser = (name, email, password, phone) => {
  const users = getUsers();
  if (users.find((u) => u.email.toLowerCase().trim() === email.toLowerCase().trim())) {
    return null; // email already exists
  }
  const newUser = {
    id: 'u' + Date.now(),
    name,
    email: email.toLowerCase().trim(),
    password,
    phone,
    createdAt: new Date().toISOString().split('T')[0],
    status: 'active',
    role: 'user',
  };
  saveUsers([...users, newUser]);
  return newUser;
};

export const loginUser = (email, password) => {
  const users = getUsers();
  return (
    users.find(
      (u) =>
        u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        u.password === password &&
        u.status === 'active'
    ) ?? null
  );
};

export const getCurrentUser = () => {
  const raw = localStorage.getItem('sp_current_user');
  return raw ? JSON.parse(raw) : null;
};

export const setCurrentUser = (user) => {
  if (user) localStorage.setItem('sp_current_user', JSON.stringify(user));
  else localStorage.removeItem('sp_current_user');
};

// ─── User Address Functions ───────────────────────────────────────────────────

export const addUserAddress = (userId, address) => {
  const users = getUsers();
  const updated = users.map((u) => {
    if (u.id !== userId) return u;
    const addresses = u.addresses || [];
    const newAddress = {
      id: 'addr-' + Date.now(),
      ...address,
      isDefault: addresses.length === 0, // first address is default
    };
    return { ...u, addresses: [...addresses, newAddress] };
  });
  saveUsers(updated);

  // update currentUser in localStorage too
  const current = getCurrentUser();
  if (current && current.id === userId) {
    const updatedUser = updated.find((u) => u.id === userId);
    if (updatedUser) setCurrentUser(updatedUser);
  }
};

export const getDefaultAddress = (userId) => {
  const users = getUsers();
  const user = users.find((u) => u.id === userId);
  if (!user || !user.addresses) return null;
  return user.addresses.find((a) => a.isDefault) || user.addresses[0] || null;
};

export const setDefaultAddress = (userId, addressId) => {
  const users = getUsers();
  const updated = users.map((u) => {
    if (u.id !== userId) return u;
    const addresses = (u.addresses || []).map((a) => ({
      ...a,
      isDefault: a.id === addressId,
    }));
    return { ...u, addresses };
  });
  saveUsers(updated);

  // update currentUser in localStorage too
  const current = getCurrentUser();
  if (current && current.id === userId) {
    const updatedUser = updated.find((u) => u.id === userId);
    if (updatedUser) setCurrentUser(updatedUser);
  }
};

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const getBookings = () => get('sp_bookings', SEED_BOOKINGS);

export const saveBookings = (bookings) => set('sp_bookings', bookings);

export const addBooking = (booking) => {
  const bookings = getBookings();
  const newBooking = {
    ...booking,
    id: 'BK-' + String(bookings.length + 1).padStart(3, '0'),
    createdAt: new Date().toISOString().split('T')[0],
  };
  saveBookings([newBooking, ...bookings]);
  return newBooking;
};

// ─── Providers ────────────────────────────────────────────────────────────────

export const getProviders = () => {
  seedProviders();
  const raw = localStorage.getItem('sp_providers');
  return raw ? JSON.parse(raw) : SEED_PROVIDERS;
};

export const saveProviders = (providers) => set('sp_providers', providers);

// Admin: add a new provider
export const addProvider = (providerData) => {
  const providers = getProviders();
  const newProvider = {
    ...providerData,
    id: Date.now(),
    available: true,
    status: 'active',
    rating: providerData.rating || 5.0,
    reviews: providerData.reviews || 0,
    documents: providerData.documents || { aadhar: null, photo: null },
  };
  saveProviders([...providers, newProvider]);
  return newProvider;
};

// Admin: update provider documents (Aadhaar + Photo URLs)
export const updateProviderDocuments = (providerId, { aadhar, photo }) => {
  const providers = getProviders().map((p) =>
    p.id === providerId
      ? { ...p, documents: { aadhar: aadhar ?? p.documents?.aadhar, photo: photo ?? p.documents?.photo } }
      : p
  );
  saveProviders(providers);
};

// ─── Services ─────────────────────────────────────────────────────────────────

export const getServices = () => get('sp_services', SEED_SERVICES);

export const saveServices = (services) => set('sp_services', services);

// ─── Admin auth ───────────────────────────────────────────────────────────────

export const isAdminLoggedIn = () => localStorage.getItem('sp_admin') === 'true';

export const setAdminLoggedIn = (value) =>
  value
    ? localStorage.setItem('sp_admin', 'true')
    : localStorage.removeItem('sp_admin');

// ─── Ratings ──────────────────────────────────────────────────────────────────

export const getRatings = () => get('sp_ratings', []);

export const updateRatingStatus = (id, status) => {
  const ratings = getRatings();
  const updated = ratings.map((r) => (r.id === id ? { ...r, status } : r));
  set('sp_ratings', updated);
};