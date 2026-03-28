'use client';

import useSWR from 'swr';
import { api } from '@/lib/api';

const fetcher = (url) => api.get(url);

export function useFetch(url) {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

export function useProjects() {
  return useFetch('/api/projects');
}

export function useProject(id) {
  return useFetch(`/api/projects/${id}`);
}
