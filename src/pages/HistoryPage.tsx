import { useNavigate } from 'react-router-dom';
import { useGetProfilesQuery } from '../store/api/profilesApi';
import { useAppDispatch, useAppSelector, useHealth } from '../store/hooks';
import { setSelected } from '../store/slices/profilesSlice';
import { ProfileRow } from '../components/ProfileRow';
import { FilterBar } from '../components/FilterBar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export function HistoryPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { serverUp, dbUp } = useHealth();
  const filter = useAppSelector((s) => s.profiles.filter);

  const available = serverUp && dbUp;

  const { data, isLoading, isError } = useGetProfilesQuery(undefined, {
    skip: !available,
  });

  const filtered = (data ?? []).filter((p) => {
    const nameMatch = `${p.firstName} ${p.lastName}`
      .toLowerCase()
      .includes(filter.name.toLowerCase());
    const countryMatch = p.country.toLowerCase().includes(filter.country.toLowerCase());
    return nameMatch && countryMatch;
  });

  function handleClick(id: string) {
    dispatch(setSelected({ id, source: 'db' }));
    navigate(`/profile/${id}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          Back
        </Button>
        <h1 className="text-2xl font-bold">Saved Profiles</h1>
      </div>

      {!serverUp && (
        <p className="text-destructive">
          The server isn't responding right now. Come back in a moment.
        </p>
      )}
      {serverUp && !dbUp && (
        <p className="text-destructive">
          The database is temporarily down. Your saved profiles will be back soon.
        </p>
      )}

      {available && (
        <>
          <FilterBar />
          {isLoading && <p className="text-muted-foreground">Loading your profiles...</p>}
          {isError && (
            <p className="text-destructive">Something went wrong loading your profiles.</p>
          )}
          {!isLoading && !isError && (
            <Card>
              {filtered.map((p) => (
                <ProfileRow key={p.id} profile={p} onClick={() => handleClick(p.id)} />
              ))}
              {filtered.length === 0 && data && data.length === 0 && (
                <p className="p-4 text-muted-foreground">
                  Nothing saved yet. Go fetch some people and save the ones you like.
                </p>
              )}
              {filtered.length === 0 && data && data.length > 0 && (
                <p className="p-4 text-muted-foreground">No one matches your filters.</p>
              )}
            </Card>
          )}
        </>
      )}
    </div>
  );
}
