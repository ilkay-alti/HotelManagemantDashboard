import { BedType } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const apiUrl = "/api/bedType";

// Fetch all BedTypes
const fetchBedTypes = async (): Promise<BedType[]> => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Fetch a BedType by id
const fetchIDBedType = async (id: string): Promise<BedType> => {
  const response = await fetch(`${apiUrl}?id=${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Create a new BedType
const createBedType = async (newBedType: BedType): Promise<BedType> => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBedType),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Update a BedType
const updateBedType = async (updatedBedType: BedType): Promise<BedType> => {
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBedType),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Delete a BedType
const deleteBedType = async (id: string): Promise<void> => {
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
export const useBedTypes = () => {
  const queryClient = useQueryClient();

  // Fetch all BedTypes
  const bedTypesQuery = useQuery({
    queryKey: ["bedTypes"],
    queryFn: fetchBedTypes,
  });

  // Fetch a single BedType by ID (as a custom hook)
  const useBedTypeQuery = (id: string) => {
    return useQuery({
      queryKey: ["bedType", id], // Pass the ID as part of the query key
      queryFn: () => fetchIDBedType(id), // Call the fetch function with the ID
    });
  };

  // Create a new BedType
  const createBedTypeMutation = useMutation({
    mutationFn: createBedType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bedTypes"] });
    },
  });

  // Update a BedType
  const updateBedTypeMutation = useMutation({
    mutationFn: updateBedType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bedTypes"] });
    },
  });

  // Delete a BedType
  const deleteBedTypeMutation = useMutation({
    mutationFn: deleteBedType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bedTypes"] });
    },
  });

  return {
    bedTypesQuery,
    useBedTypeQuery, // Return the custom hook
    createBedTypeMutation,
    updateBedTypeMutation,
    deleteBedTypeMutation,
  };
};
