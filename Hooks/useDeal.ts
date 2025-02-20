import { Deal } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const apiUrl = "/api/deal";

// Fetch all Deals
const fetchDeals = async (): Promise<Deal[]> => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Fetch a Deal by id
const fetchIDDeal = async (id: string): Promise<Deal> => {
  const response = await fetch(`${apiUrl}?id=${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Create a new Deal
const createDeal = async (newDeal: Deal): Promise<Deal> => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDeal),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Update a Deal
const updateDeal = async (updatedDeal: Deal): Promise<Deal> => {
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDeal),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Delete a Deal
const deleteDeal = async (id: string): Promise<void> => {
  const response = await fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
// Custom Hook
export const useDeal = () => {
  const queryClient = useQueryClient();

  //Fetch all Deals
  const useDeals = useQuery({
    queryKey: ["deals"],
    queryFn: fetchDeals,
  });

  //Fetch a Deal by id
  const useDealById = (id: string) => {
    return useQuery({
      queryKey: ["deal", id],
      queryFn: () => fetchIDDeal(id),
    });
  };
  //Create a new Deal
  const useCreateDeal = useMutation({
    mutationFn: createDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deals"],
      });
    },
  });

  //Update a Deal
  const useUpdateDeal = useMutation({
    mutationFn: updateDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deals"],
      });
    },
  });

  //Delete a Deal
  const useDeleteDeal = useMutation({
    mutationFn: deleteDeal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deals"],
      });
    },
  });

  return {
    useDeals,
    useDealById,
    useCreateDeal,
    useUpdateDeal,
    useDeleteDeal,
  };
};
