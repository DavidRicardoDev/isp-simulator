import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserPlan = 'Básico (50 Mbps)' | 'Familiar (100 Mbps)' | 'Ultra (300 Mbps)';
export type ServiceStatus = 'ACTIVE' | 'SUSPENDED';

export interface UserState {
  id: string;
  name: string;
  plan: UserPlan;
  status: ServiceStatus;
  monthlyCost: number;
  debt: number;
}

interface AppState {
  user: UserState | null;
  login: (name: string, plan: UserPlan, cost: number) => void;
  logout: () => void;
  payBill: (amount: number) => void;
  forceNextMonth: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,

      login: (name, plan, cost) =>
        set({
          user: {
            id: Math.random().toString(36).substr(2, 9),
            name,
            plan,
            status: 'ACTIVE',
            monthlyCost: cost,
            debt: 0,
          },
        }),

      logout: () => set({ user: null }),

      payBill: (amount: number) =>
        set((state) => {
          if (!state.user) return state;
          
          const newDebt = Math.max(0, state.user.debt - amount);
          // Si la deuda es $0, reactivamos el servicio automáticamente
          const newStatus = newDebt === 0 ? 'ACTIVE' : state.user.status;

          return {
            user: {
              ...state.user,
              debt: newDebt,
              status: newStatus,
            },
          };
        }),

      // Función para simular el paso del tiempo "1 mes después"
      forceNextMonth: () =>
        set((state) => {
          if (!state.user) return state;

          const newDebt = state.user.debt + state.user.monthlyCost;
          // Si tiene alguna deuda pendiente (o sea, más de 0), suspendemos servicio.
          // En un caso real podría haber 1 mes de gracia, pero para la simulación es inmediato.
          const isSuspended = newDebt > 0;

          return {
            user: {
              ...state.user,
              debt: newDebt,
              status: isSuspended ? 'SUSPENDED' : state.user.status,
            },
          };
        }),
    }),
    {
      name: 'isp-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
