import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  // GET - Get Booking by Id
  if (id) {
    try {
      const getBookingById = await prisma.booking.findUnique({
        where: {
          id,
        },
      });

      return NextResponse.json(getBookingById, { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message, message: "Error Fetching Booking Data" },
          { status: 500 },
        );
      }
      return NextResponse.json(
        {
          error: "An unknown error occurred",
          message: "Error Fetching Booking Data",
        },
        { status: 500 },
      );
    }
  }

  // GET - Get All RoomStatus
  try {
    const GetAllBooking = await prisma.booking.findMany();
    return NextResponse.json(GetAllBooking, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Fetching Booking" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Fetching Booking",
      },
      { status: 500 },
    );
  }
}

// POST - Create a new RoomStatus

export async function POST(req: Request) {
  try {
    const {
      customerId,
      roomId,
      checkInDate,
      checkOutDate,
      totalPrice,
      payments,
    } = await req.json();

    if (
      !customerId ||
      !roomId ||
      !checkInDate ||
      !checkOutDate ||
      !totalPrice ||
      !payments
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const newBooking = await prisma.booking.create({
      data: {
        customerId,
        roomId,
        checkInDate,
        checkOutDate,
        totalPrice,
        payments,
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Creating Booking" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Creating Booking",
      },
      { status: 500 },
    );
  }
}

// PUT - Update a RoomStatus
export async function PUT(req: Request) {
  try {
    const {
      id,
      customerId,
      roomId,
      checkInDate,
      checkOutDate,
      totalPrice,
      payments,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for updating" },
        { status: 400 },
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        customerId,
        roomId,
        checkInDate,
        checkOutDate,
        totalPrice,
        payments,
      },
    });

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Updating Booking" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred", message: "Error Updating Booking" },
      { status: 500 },
    );
  }
}
