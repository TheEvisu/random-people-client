export type ProfileSource = 'random' | 'db';

export interface Profile {
  id: string;
  originalId: string;
  gender: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  state: string;
  streetNumber: number;
  streetName: string;
  age: number;
  dobYear: number;
  pictureLarge: string;
  pictureThumbnail: string;
}
