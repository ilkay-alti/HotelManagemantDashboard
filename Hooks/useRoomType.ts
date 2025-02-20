import { RoomType } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const apiUrl = "/api/roomType";

//Fetch all RoomTypes

const fetchAllRoomType = async (): Promise<RoomType[]> => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Fetch a RoomType by id
const fetchRoomTypeById = async (id: string): Promise<RoomType> => {
  const response = await fetch(`${apiUrl}?id=${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Create a new RoomType
const createRoomType = async (newRoomType: RoomType): Promise<RoomType> => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRoomType),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Update a RoomType
const updateRoomType = async (updatedRoomType: RoomType): Promise<RoomType> => {
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRoomType),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Delete a RoomType
const deleteRoomType = async (id: string): Promise<void> => {
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
};

// Custom Hook
export const useRoomType = () => {
  const queryClient = useQueryClient();

  //fetch all RoomTypes
  const roomTypeQuery = useQuery({
    queryKey: ["roomType"],
    queryFn: fetchAllRoomType,
  });

  //fetch a RoomType by id

  const useRoomTypeQueryById = (id: string) => {
    return useQuery({
      queryKey: ["roomType", id],
      queryFn: () => fetchRoomTypeById(id),
    });
  };

  // Create a new RoomType
  const createRoomTypeMutation = useMutation({
    mutationFn: createRoomType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roomType"],
      });
    },
  });

  // Update a RoomType
  const updateRoomTypeMutation = useMutation({
    mutationFn: updateRoomType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roomType"],
      });
    },
  });

  // Delete a RoomType

  const deleteRoomTypeMutation = useMutation({
    mutationFn: deleteRoomType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roomType"],
      });
    },
  });

  return {
    roomTypeQuery,
    useRoomTypeQueryById,
    createRoomTypeMutation,
    updateRoomTypeMutation,
    deleteRoomTypeMutation,
  };
};
