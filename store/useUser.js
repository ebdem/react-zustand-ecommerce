import create from 'zustand';
import { persist } from 'zustand/middleware';
const useUser = create(
  persist(
    (set, get) => ({
        user: {},
        setUser: (user) => set((state) => ({ user })),
        clearUser: () => set((state) => ({ user: {} })),
    }),
      
    { name: 'user' }
  )
);
export default useUser;