import { useHealth } from '../store/hooks';

export function StatusBanner() {
  const { serverUp, dbUp } = useHealth();

  if (serverUp && dbUp) return null;

  const message = !serverUp
    ? "Can't reach the server right now - history and saving are paused."
    : 'Database is offline - history and saving are temporarily unavailable.';

  return (
    <div className="bg-destructive text-destructive-foreground text-sm text-center px-4 py-2.5 font-medium">
      {message}
    </div>
  );
}
