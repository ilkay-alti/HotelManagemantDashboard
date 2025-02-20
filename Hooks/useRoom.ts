import { Room } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const apiUrl = "/api/room";

//Fetch all Rooms
const fetchRooms = async (): Promise<Room[]> => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Fetch a Room by id

const fetchIDRoom = async (id: string): Promise<Room> => {
  const response = await fetch(`${apiUrl}?id=${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Create a new Room

const createRoom = async (newRoom: Room): Promise<Room> => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRoom),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Update a Room

const updateRoom = async (updatedRoom: Room): Promise<Room> => {
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRoom),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

//Delete a Room

const deleteRoom = async (id: string): Promise<void> => {
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

//CustomHook
export const useRoom = () => {
  const queryClient = useQueryClient();

  //Fetch all Rooms
  const roomquery = useQuery({
    queryKey: ["room"],
    queryFn: fetchRooms,
  });

  //Fetch a Room by id
  const useRoomQueryById = (id: string) => {
    return useQuery({
      queryKey: ["room", id],
      queryFn: () => fetchIDRoom(id),
    });
  };

  //Create a new Room
  const createRoomMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["room"],
      });
    },
  });

  //Update a Room
  const updateRoomMutation = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["room"],
      });
    },
  });

  //Delete a Room
  const deleteRoomMutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["room"],
      });
    },
  });

  return {
    roomquery,
    useRoomQueryById,
    createRoomMutation,
    updateRoomMutation,
    deleteRoomMutation,
  };
};
