import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface MatchFormData {
  location: string;
  date: string;
  time: string;
  notes: string;
  teamAName: string;
  teamBName: string;
}

interface MatchFormState {
  formData: MatchFormData;
  updateFormData: (data: Partial<MatchFormData>) => void;
  resetFormData: () => void;
}

const initialState: MatchFormData = {
  location: '',
  date: '',
  time: '',
  notes: '',
  teamAName: 'Time A',
  teamBName: 'Time B'
};

export const useMatchFormStore = create<MatchFormState>()(
  persist(
    (set) => ({
      formData: initialState,
      updateFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      resetFormData: () => set({ formData: initialState })
    }),
    {
      name: 'match-form-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
); 