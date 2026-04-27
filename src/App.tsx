import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ErrorBoundary } from './components/ErrorBoundary';
import { StatusBanner } from './components/StatusBanner';

export function App() {
  return (
    <ErrorBoundary>
      <StatusBanner />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
