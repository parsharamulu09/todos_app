import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"

export const PATCH=async (req:Request,context:{params:{id:number}})=>{
    const {id}=await context.params;
    const todoId=Number(id)
    const {title}=await req.json()

    const todo=await prisma.todo.findUnique({
        where:{id:todoId}
    })

    if(!todo){
        return NextResponse.json("the todo doesn't exits")
    }
    const updateTODO=await prisma.todo.update({
        where:{id:todoId},
        data:{
            title,
            completed:!todo.completed
        }
    })
    return NextResponse.json(updateTODO)
}
export const DELETE=async(req:Request,context:{params:{id:number}})=>{
    const {id}= await context.params
    const todoId=Number(id)

    await prisma.todo.delete({
        where:{id:todoId}
    });
    return NextResponse.json("Todo has been deleted")
}

