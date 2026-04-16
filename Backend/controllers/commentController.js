import { postCommentService, getCommentByEssay, editCommentService } from "../services/commentServices.js";

export async function postComment(req, res){
    try {
        const { content} = req.body
        const authorId = req.user.id
        const {groupId, essayId} = req.params
        if(!content ){
            return res.status(400).json({message: "Content is empty"})
        }
        const comment = await postCommentService(content, authorId, groupId, essayId)
        return res.status(201).json({message: 'Comment posted successfully', details: comment})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export async function getEssayComment(req, res){
    try {
        const comment = await getCommentByEssay(req.params.essayId)
        return res.status(201).json({message: "Comments fetched successfully", details: comment})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
export async function editComment(req, res){
    try {
        const { content } = req.body
        const { id } = req.params
        const userId = req.user.id
        const comment = await editCommentService(id, content, userId)
        return res.status(200).json({message: "Comment edited successfully", details: comment})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message)
    }
}