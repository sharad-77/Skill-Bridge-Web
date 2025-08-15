import { jwtDecode } from 'jwt-decode'; // ✅ fixed import
import { create } from 'zustand';
import axiosInstance from '../api/axiosInstance';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isOnBoarded: false,
  role: null,
  userId: null,
  loading: false,

  setOnBoardingStatus: (status) => {
    set({ isOnBoarded: status });
  },

  initAuth: async () => {
    const state = useAuthStore.getState(); // ✅ works fine here at runtime
    if (state.loading || state.isAuthenticated) return;

    const token = localStorage.getItem('token');
    if (!token) {
      set({ loading: false, isAuthenticated: false });
      return;
    }

    set({ loading: true });

    try {
      const decodedToken = jwtDecode(token); // ✅ fixed import use
      if (decodedToken) {
        const response = await axiosInstance.get('/api/Authentication/onboarding-status');
        const { onboarded, role, userId } = response.data;

        set({
          user: decodedToken,
          token,
          isAuthenticated: true,
          isOnBoarded: onboarded,
          role,
          userId,
          loading: false,
        });
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem('token');
      set({ loading: false, isAuthenticated: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isOnBoarded: false,
      role: null,
      userId: null,
    });
  },
}));

export default useAuthStore;
