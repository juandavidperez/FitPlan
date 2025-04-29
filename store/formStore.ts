// src/store/formStore.ts (o donde prefieras)
import { create } from 'zustand';
import { FormDataStep1, FormDataStep2, FormDataStep3 } from '@/types/navigation';

// Define la estructura completa de los datos del formulario en el store
interface FormState {
  step1Data?: FormDataStep1;
  step2Data?: FormDataStep2;
  step3Data?: FormDataStep3;
  setStep1Data: (data: FormDataStep1) => void;
  setStep2Data: (data: FormDataStep2) => void;
  setStep3Data: (data: FormDataStep3) => void;
  getAllData: () => Partial<FormDataStep1 & FormDataStep2 & FormDataStep3>; // Para obtener todo junto
  resetForm: () => void; // Para limpiar después de enviar
}

export const useFormStore = create<FormState>((set, get) => ({
  step1Data: undefined,
  step2Data: undefined,
  step3Data: undefined,

  setStep1Data: (data) => set({ step1Data: data }),
  setStep2Data: (data) => set({ step2Data: data }),
  setStep3Data: (data) => set({ step3Data: data }),

  getAllData: () => ({
      ...get().step1Data,
      ...get().step2Data,
      ...get().step3Data
  }),

  resetForm: () => set({ step1Data: undefined, step2Data: undefined, step3Data: undefined }),
}));