// Dummy store.js to allow compiling admin pages without refactoring them yet.
// All user pages should use direct axios calls.

export const getCurrentUser = () => JSON.parse(sessionStorage.getItem('currentUser') || 'null');
export const setCurrentUser = (user) => sessionStorage.setItem('currentUser', JSON.stringify(user));
export const getBookings = () => [];
export const saveBookings = () => {};
export const getUsers = () => [];
export const saveUsers = () => {};
export const getProviders = () => [];
export const saveProviders = () => {};
export const getServices = () => [];
export const saveServices = () => {};
export const addUserAddress = () => {};
export const setDefaultAddress = () => {};
export const getDefaultAddress = () => null;
export const login = async () => ({ user: null });
export const register = async () => {};
export const addBooking = () => {};
export const isAdminLoggedIn = () => false;
export const setAdminLoggedIn = () => {};
export const loginUser = async () => ({ user: null });
export const getRatings = () => [];
export const updateRatingStatus = () => {};
