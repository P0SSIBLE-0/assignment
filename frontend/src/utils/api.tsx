// src/services/api.ts
import axios from 'axios';
import type { RegisterFormInputs, RegisterResponse, ApiErrorData, TLoginFormInputs } from '../schemas/authSchema'; // Adjust paths as needed
import type { AxiosError } from 'axios'; // Import AxiosError type

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to register a user
export const registerUser = async (data: RegisterFormInputs): Promise<RegisterResponse> => {
  // Note: We let potential errors bubble up to be caught by React Query's onError
  const response = await apiClient.post<RegisterResponse>('/auth/register', data);
  return response.data; // Return the data part of the response on success
};

export const loginUser = async (data: TLoginFormInputs): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>('/auth/login', data);
  return response.data;
}

// Helper type guard to check if an error is an Axios API error with our expected data structure
export const isApiError = (error: unknown): error is AxiosError<ApiErrorData> => {
  return axios.isAxiosError(error) && typeof error.response?.data?.message === 'string';
}

export type { ApiErrorData }; // Re-export for convenience