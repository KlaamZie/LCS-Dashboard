import useSWR from 'swr';
import fetcher from '@/fetcher/fetcher';

const useProducts = (page) => {
  const { data, error } = useSWR(`/api/products?page=${page}`, fetcher);

  return {
    isLoading: !error && !data,
    isError: error,
    productsData: data,
  };
};

export default useProducts;
