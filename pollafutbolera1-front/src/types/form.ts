
export interface UserFormData {
    cedula: string;
    name: string;
    lastname: string;
    password: string;
    confirmPassword: string;
    email: string;
    nickname: string;
    phone: string;
    photo?: File | null;
    photoPreview?: string | null;
  }
  
  export type StepProps = {
    data: UserFormData;
    updateFields: (fields: Partial<UserFormData>) => void;
  }