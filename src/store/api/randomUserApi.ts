import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Profile } from '../../types/profile';

interface RandomUserResult {
  login: { uuid: string };
  gender: string;
  name: { title: string; first: string; last: string };
  email: string;
  phone: string;
  location: {
    country: string;
    city: string;
    state: string;
    street: { number: number; name: string };
  };
  dob: { age: number; date: string };
  picture: { large: string; thumbnail: string };
}

interface RandomUserResponse {
  results: RandomUserResult[];
}

function mapUser(u: RandomUserResult): Profile {
  return {
    id: u.login.uuid,
    originalId: u.login.uuid,
    gender: u.gender,
    title: u.name.title,
    firstName: u.name.first,
    lastName: u.name.last,
    email: u.email,
    phone: u.phone,
    country: u.location.country,
    city: u.location.city,
    state: u.location.state,
    streetNumber: u.location.street.number,
    streetName: u.location.street.name,
    age: u.dob.age,
    dobYear: new Date(u.dob.date).getFullYear(),
    pictureLarge: u.picture.large,
    pictureThumbnail: u.picture.thumbnail,
  };
}

export const randomUserApi = createApi({
  reducerPath: 'randomUserApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://randomuser.me/api' }),
  endpoints: (builder) => ({
    getRandomUsers: builder.query<Profile[], void>({
      query: () => '/?results=10',
      transformResponse: (response: RandomUserResponse): Profile[] =>
        response.results.map(mapUser),
    }),
  }),
});

export const { useGetRandomUsersQuery } = randomUserApi;
