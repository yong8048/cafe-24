import { useSelectedStore } from "@/store/selectedStore";
import { getStoreImages } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

export const useGetImages = (id: string) => {
  const {
    data: urls,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["images"],
    queryFn: () => {
      getStoreImages(id);
      console.log(id);
    },
  });
  return { urls, isLoading, isError };
};
