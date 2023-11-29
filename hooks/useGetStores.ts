import { GetStoreInfo } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

export const useGetStores = () => {
  const {
    data: stores,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["stores"], queryFn: GetStoreInfo, staleTime: Infinity });
  return { stores, isLoading, isError };
};
