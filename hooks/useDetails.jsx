import useSWR from 'swr';
import fetcher from '@/fetcher/fetcher';

const useDetails = (page) => {
  const { data, error } = useSWR(`/api/details?page=${page}`, fetcher);

  return {
    isLoading: !error && !data,
    isError: error,
    detailsData: data,
  };
};

export default useDetails;
