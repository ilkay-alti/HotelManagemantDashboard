import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  // GET - Get RoomType by Id
  if (id) {
    try {
      const getRoomTypeById = await prisma.roomType.findUnique({
        where: {
          id,
        },
      });
      return NextResponse.json(getRoomTypeById, { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message, message: "Error Fetching RoomType" },
          { status: 500 },
        );
      }
      return NextResponse.json(
        {
          error: "An unknown error occurred",
          message: "Error Fetching RoomType",
        },
        { status: 500 },
      );
    }
  }

  // GET - Get all RoomTypes
  try {
    const roomTypes = await prisma.roomType.findMany();
    return NextResponse.json(roomTypes, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Fetching RoomTypes" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Fetching RoomTypes",
      },
      { status: 500 },
    );
  }
}

// POST - Create a new RoomType
export async function POST(req: Request) {
  try {
    const { description, type, deals } = await req.json();

    const createRoomType = await prisma.roomType.create({
      data: { description, type, deals },
    });

    return NextResponse.json(createRoomType, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Creating RoomType" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Creating RoomType",
      },
      { status: 500 },
    );
  }
}

// PUT - Update a RoomType

export async function PUT(req: Request) {
  try {
    const { id, description, type, deals } = await req.json();
    if (!id) {
      return NextResponse.json(
        { error: "ID is required for updating" },
        { status: 400 },
      );
    }

    const updateRoomType = await prisma.roomType.update({
      where: { id },
      data: {
        deals,
        type,
        description,
      },
    });

    return NextResponse.json(updateRoomType, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Updating RoomType" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Updating RoomType",
      },
      { status: 500 },
    );
  }
}

// DELETE - Delete a RoomType

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for deletion" },
        { status: 400 },
      );
    }

    await prisma.roomType.delete({ where: { id } });
    return NextResponse.json(
      { message: "RoomType Deleted Successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Deleting RoomType" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Deleting RoomType",
      },
      { status: 500 },
    );
  }
}
