import z from 'zod';
import axios from 'axios';
import type { ActionState } from '../interfaces';

export const createInitialState = <T>(): ActionState<T> => {
  return {
    errors: {},
    message: '',
  };
};

export const handleZodErros = <T>(error: unknown, rawData: Partial<T>) => {
  if (error instanceof z.ZodError) {
    const fieldErrors = error.flatten().fieldErrors;
    return {
      errors: fieldErrors,
      message: 'Por favor corrige los errores en el formulario',
      formData: rawData,
    };
  }
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Error en el servidor';
    return {
      errors: {},
      message,
      formData: rawData,
    };
  }
  return {
    errors: {},
    message: 'Ocurrió un problema inesperado',
    formData: rawData,
  };
};
