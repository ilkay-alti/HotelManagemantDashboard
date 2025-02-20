import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  // ✅ GET - Id ye göre BedType'ları getir
  if (id) {
    try {
      const getBedTypeId = await prisma.bedType.findUnique({
        where: {
          id,
        },
      });

      return NextResponse.json(getBedTypeId, { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message, message: "Error Fetching BedType" },
          { status: 500 },
        );
      }
      return NextResponse.json(
        {
          error: "An unknown error occurred",
          message: "Error Fetching BedType",
        },
        { status: 500 },
      );
    }
  }

  // ✅ GET - Tüm BedType'ları getir
  try {
    const bedTypes = await prisma.bedType.findMany();
    return NextResponse.json(bedTypes, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Fetching BedTypes" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Fetching BedTypes",
      },
      { status: 500 },
    );
  }
}

// ✅ POST - Yeni bir BedType oluştur
export async function POST(req: Request) {
  try {
    const { type, description } = await req.json();

    if (!type || !description) {
      return NextResponse.json(
        { error: "Type and description are required" },
        { status: 400 },
      );
    }

    const newBedType = await prisma.bedType.create({
      data: { type, description },
    });

    return NextResponse.json(newBedType, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Creating BedType" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred", message: "Error Creating BedType" },
      { status: 500 },
    );
  }
}

// ✅ PUT - BedType güncelle
export async function PUT(req: Request) {
  try {
    const { id, type, description } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for updating" },
        { status: 400 },
      );
    }

    const updatedBedType = await prisma.bedType.update({
      where: { id },
      data: { type, description },
    });

    return NextResponse.json(updatedBedType, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Updating BedType" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred", message: "Error Updating BedType" },
      { status: 500 },
    );
  }
}

// ✅ DELETE - BedType sil
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for deletion" },
        { status: 400 },
      );
    }

    await prisma.bedType.delete({ where: { id } });
    return NextResponse.json(
      { message: "BedType deleted successfully" },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Deleting BedType" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred", message: "Error Deleting BedType" },
      { status: 500 },
    );
  }
}
