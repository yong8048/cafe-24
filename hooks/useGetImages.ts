import { useSelectedStore } from "@/store/selectedStore";
import { GetStoreImages } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";

export const useGetImages = (id: string) => {
  const {
    data: urls,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["images"],
    queryFn: () => {
      GetStoreImages(id);
    },
  });
  return { urls, isLoading, isError };
};
