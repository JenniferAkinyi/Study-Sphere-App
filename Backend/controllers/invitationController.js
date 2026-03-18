import { myPendingInvitesService, acceptInviteService, declineInviteService } from "../services/invitationServices.js";

export async function myPendingInvites(req, res){
    try {
        const userId = req.user.id
        const invites = await myPendingInvitesService(userId)
        res.status(200).json({message: "Pending invites fetched successfully", details: invites})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message })
        
    }
}
export async function acceptInvite(req, res){
    const {inviteId} = req.params
    try {
        const updateInvite = await acceptInviteService(inviteId)
        res.status(200).json({ message: "Successfully accepted the invite", details: updateInvite})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to accept invite" });
    }
}
export async function declineInvite(req, res){
    const {inviteId} = req.params
    try {
        const updateInvite = await declineInviteService(inviteId)
        res.status(200).json({ message: "Successfully declined the invite", details: updateInvite})
    } catch (error) {
        console.error(error)
        // throw error
        res.status(500).json({message: "Failed to decline invite"})
    }
}