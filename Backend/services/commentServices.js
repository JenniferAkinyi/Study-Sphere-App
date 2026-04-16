import prisma from "../config/db.js";

export async function postCommentService(content, authorId, groupId, essayId){
    try {
        const comment = await prisma.comment.create({
            data:{
                content, authorId, groupId, essayId
            }
        })
        return comment
    } catch (error) {
        throw new Error("Error posting comment")
    }
}
// get comment by essay
export async function getCommentByEssay(essayId){
    try {
        const comments = await prisma.comment.findMany({
            where: { essayId},
            include: {
                author: {
                    select: { id: true, name: true}
                },
                likes: true,
                replies: true
            },
            orderBy: { createdAt: 'desc'}
        })
        return comments
    } catch (error) {
        throw new Error("Error fetching commments")
    }
}
export async function editCommentService(id, content, userId){
    const existingComment = await prisma.comment.findUnique({
        where: {id}
    })
    if(!existingComment){
        throw new Error("Comment not found")
    }
    if(existingComment.authorId !== userId){
        throw new Error("Unauthorized")
    }
    const edit = await prisma.comment.update({
        where: {id},
        data: {content}
    })
    return edit
}