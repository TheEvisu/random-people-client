import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface HealthResponse {
  server: 'ok';
  db: 'ok' | 'down';
}

export const healthApi = createApi({
  reducerPath: 'healthApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getHealth: builder.query<HealthResponse, void>({
      query: () => '/api/health',
    }),
  }),
});

export const { useGetHealthQuery } = healthApi;
