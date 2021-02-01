import useSWR from 'swr';
import fetcher from '@/fetcher/fetcher';

const useAttributes = (page) => {
  const { data, error } = useSWR(`/api/attributes?page=${page}`, fetcher);

  return {
    isLoading: !error && !data,
    isError: error,
    attributesData: data,
  };
};

export default useAttributes;
