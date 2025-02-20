import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET - Get Deal by Id or Get All Deal
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // GET - Get Deal by Id
    if (id) {
      const getDealById = await prisma.deal.findUnique({
        where: {
          id,
        },
      });

      return NextResponse.json(getDealById, { status: 200 });
    }
    // GET - Get All Deal
    const getAllDeal = await prisma.deal.findMany();
    return NextResponse.json(getAllDeal, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Fetching Deal Data" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Fetching Deal Data",
      },
      { status: 500 },
    );
  }
}

// POST - Create a new Deal

export async function POST(req: Request) {
  try {
    const { tags, dealName, price, discount, roomTypes, startDate, endDate } =
      await req.json();

    const createDeal = await prisma.deal.create({
      data: {
        tags,
        dealName,
        price,
        discount,
        roomTypes,
        startDate,
        endDate,
      },
    });

    return NextResponse.json(createDeal, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Creating Deal" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Creating Deal",
      },
      { status: 500 },
    );
  }
}

// PUT - Update a Deal
export async function PUT(req: Request) {
  try {
    const {
      id,
      tags,
      dealName,
      price,
      discount,
      roomTypes,
      startDate,
      endDate,
    } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updateDeal = await prisma.deal.update({
      where: {
        id,
      },
      data: {
        tags,
        dealName,
        price,
        discount,
        roomTypes,
        startDate,
        endDate,
      },
    });

    return NextResponse.json(updateDeal, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Updating Deal" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Updating Deal",
      },
      { status: 500 },
    );
  }
}

// DELETE - Delete a Deal

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deleteDeal = await prisma.deal.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deleteDeal, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Deleting Deal" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Deleting Deal",
      },
      { status: 500 },
    );
  }
}
