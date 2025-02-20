import { Booking } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const apiUrl = "/api/booking";

// Fetch all Bookings
const fetchBookings = async (): Promise<Booking[]> => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Fetch a Booking by id
const fetchIDBooking = async (id: string): Promise<Booking> => {
  const response = await fetch(`${apiUrl}?id=${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Create a new Booking
const createBooking = async (newBooking: Booking): Promise<Booking> => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Update a Booking
const updateBooking = async (updatedBooking: Booking): Promise<Booking> => {
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBooking),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Delete a Booking
const deleteBooking = async (id: string): Promise<void> => {
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
export const useBookings = () => {
  const queryClient = useQueryClient();

  // Fetch all Bookings
  const useBookings = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  // Fetch a Booking by id
  const useBookingsById = (id: string) => {
    return useQuery({
      queryKey: ["bookings", id],
      queryFn: () => fetchIDBooking(id),
    });
  };

  // Create a new Booking
  const createBookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });

  // Update a Booking
  const updateBookingMutation = useMutation({
    mutationFn: updateBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });

  // Delete a Booking
  const deleteBookingMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });

  return {
    useBookings,
    useBookingsById,
    createBookingMutation,
    updateBookingMutation,
    deleteBookingMutation,
  };
};
