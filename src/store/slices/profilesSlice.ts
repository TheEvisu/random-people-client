import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, ProfileSource } from '../../types/profile';

interface ProfilesState {
  filter: { name: string; country: string };
  randomList: Profile[];
  selected: { id: string; source: ProfileSource } | null;
}

const initialState: ProfilesState = {
  filter: { name: '', country: '' },
  randomList: [],
  selected: null,
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<{ name: string; country: string }>) {
      state.filter = action.payload;
    },
    setRandomList(state, action: PayloadAction<Profile[]>) {
      state.randomList = action.payload;
    },
    updateRandomProfile(
      state,
      action: PayloadAction<{ id: string; firstName: string; lastName: string }>
    ) {
      const p = state.randomList.find((x) => x.id === action.payload.id);
      if (p) {
        p.firstName = action.payload.firstName;
        p.lastName = action.payload.lastName;
      }
    },
    setSelected(state, action: PayloadAction<{ id: string; source: ProfileSource }>) {
      state.selected = action.payload;
    },
    clearSelected(state) {
      state.selected = null;
    },
  },
});

export const {
  setFilter,
  setRandomList,
  updateRandomProfile,
  setSelected,
  clearSelected,
} = profilesSlice.actions;

export default profilesSlice.reducer;
