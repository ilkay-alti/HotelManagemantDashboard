import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    // GET - Get Payment by Id

    if (id) {
      const getPaymentById = await prisma.payment.findUnique({
        where: {
          id,
        },
      });

      return NextResponse.json(getPaymentById, { status: 200 });
    }
    // GET - Get All Payment
    const GetAllPayment = await prisma.payment.findMany();
    return NextResponse.json(GetAllPayment, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Fetching Payment Data" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Fetching Payment Data",
      },
      { status: 500 },
    );
  }
}

// POST - Create a new Payment
export async function POST(req: Request) {
  try {
    const { amount, paymentDate, status, bookingId } = await req.json();

    const createPayment = await prisma.payment.create({
      data: {
        amount,
        paymentDate,
        status,
        bookingId,
      },
    });

    return NextResponse.json(createPayment, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Creating Payment" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred", message: "Error Creating Payment" },
      { status: 500 },
    );
  }
}

// PUT - Update Payment

export async function PUT(req: Request) {
  try {
    const { id, amount, paymentDate, status, bookingId } = await req.json();

    const updatePayment = await prisma.payment.update({
      where: {
        id,
      },
      data: {
        amount,
        paymentDate,
        status,
        bookingId,
      },
    });

    return NextResponse.json(updatePayment, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Updating Payment" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred", message: "Error Updating Payment" },
      { status: 500 },
    );
  }
}
// DELETE - Delete Payment

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "ID is required for deleting" },
        { status: 400 },
      );
    }
    const deletePayment = await prisma.payment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletePayment, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Deleting Payment" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred", message: "Error Deleting Payment" },
      { status: 500 },
    );
  }
}
