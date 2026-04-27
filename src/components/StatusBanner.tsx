import { useHealth } from '../store/hooks';

export function StatusBanner() {
  const { serverUp, dbUp } = useHealth();

  if (serverUp && dbUp) return null;

  const message = !serverUp
    ? 'Backend unavailable - save and history features are disabled'
    : 'Database unavailable - save and history features are disabled';

  return (
    <div className="bg-destructive text-destructive-foreground text-sm text-center px-4 py-2">
      {message}
    </div>
  );
}
