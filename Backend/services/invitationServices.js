import prisma from "../config/db.js";

// pending invitations
export async function myPendingInvitesService(userId){
    const invites = await prisma.groupInvitation.findMany({
        where: {
            userId: userId,
            status: 'PENDING'
        },
        include: {
            group: true
        }
    })
    return invites
}
export async function acceptInviteService(inviteId){
    const invite = await prisma.groupInvitation.update({
        where: 
        { 
            id: inviteId
        },
        data: { status: 'ACCEPTED'},
        include: { group: true}
    })
    await prisma.groupMember.create({
        data: {
            userId: invite.userId,
            groupId: invite.groupId,
            role: 'MEMBER'
        }
    })
    return invite
}
export async function declineInviteService(inviteId){
    const invites = await prisma.groupInvitation.update({
        where: 
        { 
            id: inviteId,
        },
        data: { status: 'DECLINED'},
        include: { group: true}
    })
    return invites
}