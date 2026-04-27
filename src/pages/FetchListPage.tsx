import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetRandomUsersQuery } from '../store/api/randomUserApi';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setRandomList, setSelected } from '../store/slices/profilesSlice';
import { ProfileRow } from '../components/ProfileRow';
import { FilterBar } from '../components/FilterBar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export function FetchListPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetRandomUsersQuery();
  const filter = useAppSelector((s) => s.profiles.filter);
  const randomList = useAppSelector((s) => s.profiles.randomList);

  useEffect(() => {
    if (data) dispatch(setRandomList(data));
  }, [data, dispatch]);

  const displayList = randomList.length > 0 ? randomList : (data ?? []);

  const filtered = displayList.filter((p) => {
    const nameMatch = `${p.firstName} ${p.lastName}`
      .toLowerCase()
      .includes(filter.name.toLowerCase());
    const countryMatch = p.country.toLowerCase().includes(filter.country.toLowerCase());
    return nameMatch && countryMatch;
  });

  function handleClick(id: string) {
    dispatch(setSelected({ id, source: 'random' }));
    navigate(`/profile/${id}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          Back
        </Button>
        <h1 className="text-2xl font-bold">Random People</h1>
      </div>
      <FilterBar />
      {isLoading && <p className="text-muted-foreground">Loading...</p>}
      {isError && <p className="text-destructive">Failed to load users.</p>}
      {!isLoading && !isError && (
        <Card>
          {filtered.map((p) => (
            <ProfileRow key={p.id} profile={p} onClick={() => handleClick(p.id)} />
          ))}
          {filtered.length === 0 && (
            <p className="p-4 text-muted-foreground">No results.</p>
          )}
        </Card>
      )}
    </div>
  );
}
