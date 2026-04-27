import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAppDispatch } from '../store/hooks';
import { useHealth } from '../store/hooks';
import { clearSelected } from '../store/slices/profilesSlice';

export function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { serverUp, dbUp } = useHealth();

  const backendAvailable = serverUp && dbUp;

  function handleFetch() {
    dispatch(clearSelected());
    navigate('/fetch');
  }

  function handleHistory() {
    dispatch(clearSelected());
    navigate('/history');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold text-foreground">Random People</h1>
      <div className="flex gap-4">
        <Button size="lg" onClick={handleFetch}>
          Fetch
        </Button>
        <Button
          size="lg"
          variant="secondary"
          onClick={handleHistory}
          disabled={!backendAvailable}
          title={!backendAvailable ? 'Service unavailable' : undefined}
        >
          History
        </Button>
      </div>
    </div>
  );
}
