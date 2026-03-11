import { getCommentByGroup, postCommentService } from "../services/commentServices.js";

export async function postComment(req, res){
    try {
        const { content} = req.body
        const authorId = req.user.id
        const {groupId} = req.params
        if(!content ){
            return res.status(400).json({message: "Content is empty"})
        }
        const comment = await postCommentService(content, authorId, groupId)
        return res.status(201).json({message: 'Comment posted successfully', details: comment})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export async function getGroupComment(req, res){
    try {
        const comment = await getCommentByGroup(req.params.id)
        return res.status(201).json({message: "Comments fetched successfully", details: comment})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}