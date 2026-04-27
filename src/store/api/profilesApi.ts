import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Profile } from '../../types/profile';

type SaveProfileArg = Omit<Profile, 'id'>;
type UpdateProfileArg = { id: string; firstName: string; lastName: string };

interface DbProfile extends Omit<Profile, 'id'> {
  _id: string;
}

function mapDbProfile(p: DbProfile): Profile {
  return { ...p, id: p._id };
}

export const profilesApi = createApi({
  reducerPath: 'profilesApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfiles: builder.query<Profile[], void>({
      query: () => '/api/profiles',
      transformResponse: (response: DbProfile[]): Profile[] =>
        response.map(mapDbProfile),
      providesTags: ['Profile'],
    }),
    saveProfile: builder.mutation<Profile, SaveProfileArg>({
      query: (body) => ({ url: '/api/profiles', method: 'POST', body }),
      transformResponse: (response: DbProfile): Profile => mapDbProfile(response),
      invalidatesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<Profile, UpdateProfileArg>({
      query: ({ id, ...body }) => ({
        url: `/api/profiles/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: DbProfile): Profile => mapDbProfile(response),
      invalidatesTags: ['Profile'],
    }),
    deleteProfile: builder.mutation<void, string>({
      query: (id) => ({ url: `/api/profiles/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useSaveProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profilesApi;
