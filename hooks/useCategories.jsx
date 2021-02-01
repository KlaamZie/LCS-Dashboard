import useSWR from 'swr';
import fetcher from '@/fetcher/fetcher';

const useCategories = (page) => {
  const { data, error } = useSWR(`/api/categories?page=${page}`, fetcher);

  return {
    isLoading: !error && !data,
    isError: error,
    categoriesData: data,
  };
};

export default useCategories;
