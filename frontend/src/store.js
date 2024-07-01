import { create } from 'zustand';
// import {persist} from 'zustand/middleware'
export const useAuthStore = create(
    (set, get) => ({
    user: JSON.parse(localStorage.getItem('user')),
    authReducer: (action) => {
        switch(action.type) {
            case 'LOGIN':
                set(() => ({ user: action.payload }));
                break;
            case 'LOGOUT':
                set(() => ({ user: null }));
                break;
            default:
                return get().user;
        }
    },
}));
