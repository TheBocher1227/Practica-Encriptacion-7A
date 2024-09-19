export interface User {
  id: number;
  email: string;
  name: string;
  email_verified_at: null | string; // Ajusta según el tipo de dato correcto
  is_active: boolean | number; // Si esperas un booleano, necesitarás convertir el 1 o 0 de la respuesta a true o false
  verificacion: string;
  codigoVerificado: boolean | number; // Ajusta según cómo quieras manejar este campo
  created_at: string;
  updated_at: string;
}