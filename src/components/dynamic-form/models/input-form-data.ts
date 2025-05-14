export type InputFormData = {
  field: string;
  value: string | number | boolean;
  type?: 'text' | 'number';
  label?: string;
  description?: string;
  placeholder?: string;
  colspan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};
