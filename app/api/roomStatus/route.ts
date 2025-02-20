import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  // GET - Get RoomStatus by Id
  if (id) {
    try {
      const getRoomStatusId = await prisma.roomStatus.findUnique({
        where: {
          id,
        },
      });

      return NextResponse.json(getRoomStatusId, { status: 200 });
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

  // GET - Get All RoomStatus
  try {
    const RoomStatus = await prisma.roomStatus.findMany();

    return NextResponse.json(RoomStatus, { status: 200 });
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
  try {
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status is required", message: "Error Creating RoomStatus" },
        { status: 400 },
      );
    }

    const newRoomStatus = await prisma.roomStatus.create({
      data: {
        status,
      },
    });

    return NextResponse.json(newRoomStatus, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Creating RoomStatus" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Creating RoomStatus",
      },
      { status: 500 },
    );
  }
}

// PUT - Update RoomStatus

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        {
          error: "ID and Status are required",
          message: "Error Updating RoomStatus",
        },
        { status: 400 },
      );
    }

    const updateRoomStatus = await prisma.roomStatus.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updateRoomStatus, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Creating RoomStatus" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Creating RoomStatus",
      },
      { status: 500 },
    );
  }
}

// DELETE - Delete RoomStatus

export async function DELETE(req: Request) {
  try {
    const id = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "ID is required for deletion" },
        { status: 400 },
      );
    }

    await prisma.roomStatus.delete({ where: { id } });

    return NextResponse.json(
      { message: "RoomStatus deleted" },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Creating RoomStatus" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Creating RoomStatus",
      },
      { status: 500 },
    );
  }
}
