import { createGroupService, deleteGroup, fetchAllGroups, fetchGroupById, updateGroup } from "../services/groupServices.js";

export async function createGroup(req, res){
    try {
        const { name, topic, description, privacy, members } = req.body
        if(!name || !topic || !description){
            return res.status(400).json({message: "All fields are required"})
        }
        const group = await createGroupService(name, topic, description, privacy, members)
        return res.status(201).json({message: "Group created successfully", details: group})
    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
}
export async function getAllGroups(req, res){
    try {
        const groups = await fetchAllGroups()
        return res.status(200).json({ message: "Groups fetched successfully", details: groups})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export async function fetchById(req, res){
    try {
        const group = await fetchGroupById(req.params.id)
        return res.status(200).json({message: "Group fetched successfully", details: group})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
export async function updatedGroupByid(req, res){
    try {
        const { name, topic, description} = req.body
        const group = await updateGroup(name, topic, description, req.params.id)
        return res.status(200).json({ message: 'Group updated successfully', details: group})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
export async function deleteGroupById(req, res){
    try {
        const result = await deleteGroup(req.params.id)
        return res.status(200).json({ result })
    } catch (error) {
        return res.status(404).json({ message: error.message})
        
    }
}