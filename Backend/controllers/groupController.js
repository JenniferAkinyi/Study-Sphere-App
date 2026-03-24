import { createGroupService, deleteGroup, fetchAllGroups, fetchGroupById, updateGroup, myGroupsServices, discoverGroupService } from "../services/groupServices.js";

export async function createGroup(req, res){
    try {
        const { name, topic, description, privacy, members } = req.body
        const creatorId = req.user.id
        if(!name || !topic || !description){
            return res.status(400).json({message: "All fields are required"})
        }

        if (!creatorId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const group = await createGroupService(name, topic, description, privacy, creatorId, members || [])
        return res.status(201).json({message: "Group created successfully", details: group})
    } catch (error) {
        console.log(error)
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
export async function myGroups(req, res) {
    try {
        const id = req.user.id
        if(!id){
            return res.status(401).json({message: "Unauthorized"})
        }
        const groups = await myGroupsServices(id)
        return res.status(200).json({message: 'Groups fetched successfully', groups})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
export async function discoverGroups(req, res){
    try {
        const userId = req.user.id
        const groups = await discoverGroupService(userId)
        res.status(200).json(groups)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Failed to fetch groups'})
    }
}