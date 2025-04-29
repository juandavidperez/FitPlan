export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    BottomTab: undefined;
    FirstForm: undefined;
    SecondForm: { formDataStep1: FormDataStep1 };
    ThirdForm: {
      formDataStep1: FormDataStep1;
      formDataStep2: FormDataStep2;
    }
};
  
export type FormDataStep1 = {
  genero: string;
  edad: string;
  peso: string;
  altura: string;
  unidadPeso: 'Kg' | 'Lb';
  unidadAltura: 'Cm' | 'Ft';
};

export type FormDataStep2 = {
  meta: string;
  experiencia: string;
  lesion: string;
  diasSeleccionados: string[];
};

export type FormDataStep3 = {
  selectedSet: string;
};