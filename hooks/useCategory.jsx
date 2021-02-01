import useSWR from 'swr';
import fetcher from '@/fetcher/fetcher';

const useCategory = (id) => {
  const { data, error } = useSWR(`/api/category?id=${id}`, fetcher);

  return {
    isLoading: !error && !data,
    isError: error,
    categoryData: data,
  };
};

export default useCategory;
