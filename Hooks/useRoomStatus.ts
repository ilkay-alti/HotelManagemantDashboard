import { RoomStatus } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const apiUrl = "/api/roomStatus";

//Fetch all RoomStatus
const fetchRoomStatus = async (): Promise<RoomStatus[]> => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Fetch a RoomStatus by id
const fetchIDRoomStatus = async (id: string): Promise<RoomStatus> => {
  const response = await fetch(`${apiUrl}?id=${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Create a new RoomStatus
const createRoomStatus = async (
  newRoomStatus: RoomStatus,
): Promise<RoomStatus> => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRoomStatus),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Update a RoomStatus

const updateRoomStatus = async (
  updatedRoomStatus: RoomStatus,
): Promise<RoomStatus> => {
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRoomStatus),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Delete a RoomStatus

const deleteRoomStatus = async (id: string): Promise<void> => {
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

//Custom Hook
export const useRoomStatus = () => {
  const queryClient = useQueryClient();

  //Fetch all RoomStatus
  const roomStatusQuery = useQuery({
    queryKey: ["roomStatus"],
    queryFn: fetchRoomStatus,
  });

  // Fetch a RoomStatus by id
  const useRoomStatusQueryById = (id: string) => {
    return useQuery({
      queryKey: ["roomStatus", id],
      queryFn: () => fetchIDRoomStatus(id),
    });
  };

  // Create a new RoomStatus
  const createRoomStatusMutation = useMutation({
    mutationFn: createRoomStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roomStatus"],
      });
    },
  });

  //Update a RoomStatus
  const updatedRoomStatusMutation = useMutation({
    mutationFn: updateRoomStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roomStatus"],
      });
    },
  });

  //Delete a RoomStatus
  const deleteRoomStatusMutation = useMutation({
    mutationFn: deleteRoomStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["roomStatus"],
      });
    },
  });

  return {
    roomStatusQuery,
    useRoomStatusQueryById,
    createRoomStatusMutation,
    updatedRoomStatusMutation,
    deleteRoomStatusMutation,
  };
};
