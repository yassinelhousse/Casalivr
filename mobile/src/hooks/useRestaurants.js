import { useQuery } from "@tanstack/react-query";
import { fetchRestaurants } from "../services/restaurant.service";

export const useRestaurants = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });
};
