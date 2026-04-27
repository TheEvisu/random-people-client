import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} - Random People`;
    return () => {
      document.title = 'Random People';
    };
  }, [title]);
}
