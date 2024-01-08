import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { philosopherId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;

    if (!params.philosopherId) {
      return new NextResponse("Philosopher ID is required", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauothorized", { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // TODO: Check subscription

    const philosopher = await prismadb.philosopher.update({
      where: {
        id: params.philosopherId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        username: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });

    return NextResponse.json(philosopher);
  } catch (error) {
    console.log("[PHILOSOPHER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { philosopherId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const philosopher = await prismadb.philosopher.delete({
      where: {
        userId,
        id: params.philosopherId,
      },
    });

    return NextResponse.json(philosopher);
  } catch (error) {
    console.log("[PHILOSOPHER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
