import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';
import { useGetHealthQuery } from './api/healthApi';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useHealth() {
  const { data, isError, isLoading } = useGetHealthQuery(undefined, {
    pollingInterval: 30_000,
  });

  if (isLoading) return { serverUp: true, dbUp: true };

  return {
    serverUp: !isError,
    dbUp: !isError && data?.db === 'ok',
  };
}
