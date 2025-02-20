import { Payment } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const apiUrl = "/api/payment";

// Fetch all Payments

const fetchPayments = async (): Promise<Payment[]> => {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Fetch a Payment by id
const fetchIDPayment = async (id: string): Promise<Payment> => {
  const response = await fetch(`${apiUrl}?id=${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Create a new Payment
const createPayment = async (newPayment: Payment): Promise<Payment> => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPayment),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Update a Payment
const updatePayment = async (updatedPayment: Payment): Promise<Payment> => {
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPayment),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

// Delete a Payment
const deletePayment = async (id: string): Promise<void> => {
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

//Costum Hook

export const usePayment = () => {
  const queryClient = useQueryClient();

  //Fetch all Payments
  const usePayments = useQuery({
    queryKey: ["payments"],
    queryFn: fetchPayments,
  });
  //Fetch a Payment by id
  const usePaymentById = (id: string) => {
    return useQuery({
      queryKey: ["payment", id],
      queryFn: () => fetchIDPayment(id),
    });
  };
  //Create a new Payment
  const createPaymentMutation = useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });

  //Update a Payment
  const updatePaymentMutation = useMutation({
    mutationFn: updatePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
  //Delete a Payment
  const deletePaymentMutation = useMutation({
    mutationFn: deletePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });

  return {
    usePayments,
    usePaymentById,
    createPaymentMutation,
    updatePaymentMutation,
    deletePaymentMutation,
  };
};
