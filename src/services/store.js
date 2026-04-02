// Real store.js using sessionStorage for persistent state
// All user pages should use direct axios calls for data.

export const getCurrentUser = () => JSON.parse(sessionStorage.getItem('currentUser') || 'null');
export const setCurrentUser = (user) => {
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        sessionStorage.removeItem('currentUser');
    }
    // Dispatch event to notify components
    window.dispatchEvent(new Event("authChange"));
};

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

export const isAdminLoggedIn = () => sessionStorage.getItem('adminLoggedIn') === 'true';
export const setAdminLoggedIn = (status) => {
    if (status) {
        sessionStorage.setItem('adminLoggedIn', 'true');
    } else {
        sessionStorage.removeItem('adminLoggedIn');
    }
};

export const loginUser = async (email, password) => {
    // This is now just a wrapper for the API if needed, 
    // but components should use axios directly.
    return { user: null };
};

export const getRatings = () => [];
export const updateRatingStatus = () => {};
