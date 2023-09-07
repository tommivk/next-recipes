import { NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newComment = await prisma.comment.create({ data: body });
    return NextResponse.json(newComment, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
