import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ErrorBoundary } from './components/ErrorBoundary';
import { StatusBanner } from './components/StatusBanner';
import { ToastProvider } from './context/ToastContext';

export function App() {
  return (
    <ToastProvider>
      <ErrorBoundary>
        <StatusBanner />
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ToastProvider>
  );
}
