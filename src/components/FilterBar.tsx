import { Input } from './ui/input';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter } from '../store/slices/profilesSlice';

export function FilterBar() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((s) => s.profiles.filter);

  return (
    <div className="flex gap-3 mb-4">
      <Input
        placeholder="Filter by name"
        value={filter.name}
        onChange={(e) => dispatch(setFilter({ ...filter, name: e.target.value }))}
      />
      <Input
        placeholder="Filter by country"
        value={filter.country}
        onChange={(e) => dispatch(setFilter({ ...filter, country: e.target.value }))}
      />
    </div>
  );
}
