import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"

export const GET=async()=>{
    const todo =await prisma.todo.findMany({
    orderBy:{createdAt:"desc"}
    });
    return NextResponse.json(todo)
}
export async function  POST(req:Request) {
    const {title}=await req.json();
    const todo=await prisma.todo.create({
        data:{
        title,
        }
    });
    return NextResponse.json(todo)
}
