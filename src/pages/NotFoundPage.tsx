import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-8xl font-bold text-primary opacity-40">404</p>
      <h1 className="text-2xl font-bold">This page doesn't exist</h1>
      <p className="text-muted-foreground max-w-xs">
        Looks like you wandered somewhere we haven't built yet.
      </p>
      <Button onClick={() => navigate('/')}>Back to home</Button>
    </div>
  );
}
