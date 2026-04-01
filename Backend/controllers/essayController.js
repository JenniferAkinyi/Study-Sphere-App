import { deleteEssayService, fetchEssayById, getGroupEssaysService, postEssayService, updateEssayService } from "../services/essayServices.js";

export async function postEssay(req, res) {
  try {
    const { title, content } = req.body;
    const { groupId } = req.params
    const authorId = req.user.id;
    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!authorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const essay = await postEssayService(title, content, authorId, groupId);
    return res
      .status(201)
      .json({ message: "Essay posted successfully", details: essay });
  } catch (error) {
    if (error.message === "You must be a member to post in this group") {
      return res.status(403).json({ message: error.message });
    }
    console.log(error)
    return res.status(500).json({ message: "Error posting essay" });
  }
}
export async function getGroupEssay(req, res){
    try {
        const essays = await getGroupEssaysService()
        return res.status(200).json({message: 'Essays fetched Successfully', details: essays})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export async function updateEssay(req, res){
    try {
        const {title, content} = req.body
        const essay = await updateEssayService(title, content, req.params.id)
        return res.status(200).json({message: "Essay updated successfully", details: essay})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message)
    }
}
export async function essayById(req, res){
    try {
        const essay = await fetchEssayById(req.params.id)
        return res.status(200).json({message: "Essay fetched successfully", details: essay})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export async function deleteEssay(req, res){
    try {
        const result = await deleteEssayService(req.params.id)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
}