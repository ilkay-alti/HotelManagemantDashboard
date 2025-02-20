import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const roomTypeId = searchParams.get("roomTypeId");

  // GET - Get RoomStatus by Id
  if (id) {
    try {
      console.log("Fetching room by ID:", id);
      const getRoomById = await prisma.room.findUnique({
        where: {
          id,
        },
      });

      return NextResponse.json(getRoomById, { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message, message: "Error Fetching RoomStatus" },
          { status: 500 },
        );
      }
      return NextResponse.json(
        {
          error: "An unknown error occurred",
          message: "Error Fetching RoomStatus",
        },
        { status: 500 },
      );
    }
  }

  // GET - Get Rooms by RoomTypeId
  if (roomTypeId) {
    try {
      console.log("Fetching rooms by roomTypeId:", roomTypeId);
      const getRoomsByRoomTypeId = await prisma.room.findMany({
        where: {
          roomTypeId,
        },
      });

      return NextResponse.json(getRoomsByRoomTypeId, { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json(
          {
            error: error.message,
            message: "Error Fetching Rooms by RoomTypeId",
          },
          { status: 500 },
        );
      }
      return NextResponse.json(
        {
          error: "An unknown error occurred",
          message: "Error Fetching Rooms by RoomTypeId",
        },
        { status: 500 },
      );
    }
  }

  // GET - Get All RoomStatus
  try {
    console.log("Fetching all rooms");
    const GetAllRoom = await prisma.room.findMany();
    return NextResponse.json(GetAllRoom, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Fetching RoomStatus" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Fetching RoomStatus",
      },
      { status: 500 },
    );
  }
}

// POST - Create a new RoomStatus
export async function POST(req: Request) {
  const {
    roomNumber,
    bedTypeId,
    floor,
    price,
    isAvailable,
    roomTypeId,
    bookings,
    statusId,
  } = await req.json();

  const createRoom = await prisma.room.create({
    data: {
      roomNumber,
      bedTypeId,
      floor,
      price,
      isAvailable,
      roomTypeId,
      bookings,
      statusId,
    },
  });

  return NextResponse.json(createRoom, { status: 201 });
}

// PUT - Update RoomStatus

export async function PUT(req: Request) {
  try {
    const {
      id,
      roomNumber,
      bedTypeId,
      floor,
      price,
      isAvailable,
      roomTypeId,
      bookings,
      statusId,
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for updating" },
        { status: 400 },
      );
    }
    const updateRoom = await prisma.room.update({
      where: { id },
      data: {
        roomNumber,
        bedTypeId,
        floor,
        price,
        isAvailable,
        roomTypeId,
        bookings,
        statusId,
      },
    });

    return NextResponse.json(updateRoom, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Updating RoomStatus" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Updating RoomStatus",
      },
      { status: 500 },
    );
  }
}

// DELETE - Delete RoomStatus

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for deletion" },
        { status: 400 },
      );
    }

    await prisma.room.delete({ where: { id } });
    return NextResponse.json(
      { message: "RoomStatus deleted successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Deleting RoomStatus" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Deleting RoomStatus",
      },
      { status: 500 },
    );
  }
}
