import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    // GET - Get Customer by Id
    if (id) {
      try {
        const getCustomerById = await prisma.customer.findUnique({
          where: { id },
        });

        return NextResponse.json(getCustomerById, { status: 200 });
      } catch (error: unknown) {
        if (error instanceof Error) {
          return NextResponse.json(
            { error: error.message, message: "Error Fetching Customer Data" },
            { status: 500 },
          );
        }
        return NextResponse.json(
          {
            error: "An unknown error occurred",
            message: "Error Fetching Customer Data",
          },
          { status: 500 },
        );
      }
    }

    // GET - Get All Customer
    const GetAllCustomer = await prisma.customer.findMany();
    return NextResponse.json(GetAllCustomer, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Fetching Customer Data" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Fetching Customer Data",
      },
      { status: 500 },
    );
  }
}

// POST - Create a new Customer
export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, bookings } = await req.json();

    if (!firstName || !lastName || !email || !phone || !bookings) {
      return NextResponse.json(
        {
          error: "Please fill all fields",
          message: "Error Creating Customer",
        },
        { status: 400 },
      );
    }
    const createCustomer = await prisma.customer.create({
      data: {
        email,
        firstName,
        lastName,
        phone,
        bookings,
      },
    });

    return NextResponse.json(createCustomer, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Creating Customer" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Creating Customer",
      },
      { status: 500 },
    );
  }
}
//PUT - Update a Customer
export async function PUT(req: Request) {
  try {
    const { email, firstName, lastName, phone, bookings, id } =
      await req.json();

    if (!email || !firstName || !lastName || !phone || !bookings || !id) {
      return NextResponse.json(
        {
          error: "Please fill all fields",
          message: "Error Updating Customer",
        },
        { status: 400 },
      );
    }

    const updateCustomer = await prisma.customer.update({
      where: { id },
      data: {
        email,
        firstName,
        lastName,
        phone,
        bookings,
      },
    });

    return NextResponse.json(updateCustomer, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Updating Customer" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Updating Customer",
      },
      { status: 500 },
    );
  }
}
// DELETE - Delete a Customer

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for deleting" },
        { status: 400 },
      );
    }

    const deleteCustomer = await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json(deleteCustomer, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, message: "Error Deleting Customer" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      {
        error: "An unknown error occurred",
        message: "Error Deleting Customer",
      },
      { status: 500 },
    );
  }
}
