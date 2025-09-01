  import { create  } from 'zustand'
  import { jwtDecode } from 'jwt-decode'

  const useUserStore = create((set) => ({
    userId: null,
    onboarded: null,
    role: null,
    loading: false,

    userInfo: async () => {
      set({ loading: true });
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return set({ loading: false })
        }

        const decodeToken = jwtDecode(token);
        const { id, onboarded, role } = decodeToken

        set({
          userId: id,
          role: role,
          onboarded: onboarded,
          loading: false
        })

      } catch (error) {
        console.error("User Details Store Faild : ", error);
        set({
          userId: null,
          role: null,
          loading:false
        })
      }
    }
  }))

  export default useUserStore;
