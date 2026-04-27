import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { FetchListPage } from '../pages/FetchListPage';
import { HistoryPage } from '../pages/HistoryPage';
import { ProfilePage } from '../pages/ProfilePage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/fetch', element: <FetchListPage /> },
  { path: '/history', element: <HistoryPage /> },
  { path: '/profile/:id', element: <ProfilePage /> },
  { path: '*', element: <NotFoundPage /> },
]);
