import prisma from "../config/db.js";

export async function postCommentService(content, authorId, groupId){
    try {
        const comment = await prisma.comment.create({
            data:{
                content, authorId, groupId
            }
        })
        return{
            comment
        }
    } catch (error) {
        throw new Error("Error posting comment")
    }
}

// get comment by group
export async function getCommentByGroup(id){
    const comment = await prisma.comment.findUnique({
        where: {id}
    })
    if(!comment){
        throw new Error("No comment Found")
    }
    return comment
}