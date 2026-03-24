import prisma from "../config/db.js";

export async function createGroupService(name, topic, description, privacy, creatorId, inviteeIds = []){
    try {
        const group = await prisma.group.create({
            data: {
                name,
                topic,
                description,
                privacy,
                members: {
                    create: [
                        {
                            userId: creatorId,
                            role: 'OWNER'
                        }
                    ]
                },
                invitations: {
                    create: inviteeIds.map((id) => ({
                        userId: id,
                        status: 'PENDING'
                    }))
                }
            },
            include: {
                members: { include: {user: true}},
                invitations: { include: {user: true}}
            }
        })
        return group
    } catch (error) {
        throw new Error("Error creating group")
    }
}
// get all groups
export async function fetchAllGroups() {
    const groups = await prisma.group.findMany()
    return groups
}
// get a specifc group
export async function fetchGroupById(id) {
    const group = await prisma.group.findUnique({
        where:{ id }
    })
    if(!group){
        throw new Error("Group not found")
    }
    return group
}
// update group
export async function updateGroup(name, description, topic, id){
    const existingGroup = await prisma.group.findUnique({
        where: {id}
    })
    if(!existingGroup){
        throw new Error("Group not found")
    }
    const updated = await prisma.group.update({
        where: {id},
        data: { name, topic, description}
    })
    return { id: updated.id, name: updated.name, topic: updated.topic, description: updated.description}
}
// deleting group
export async function deleteGroup(id){
    const existingGroup = await prisma.group.findUnique({
        where: { id }
    })
    if(!existingGroup){
        throw new Error("Group not found")
    }
    const group = await prisma.group.delete({
        where: { id}
    })
    return { message: "Group deleted successfully"}
}
// joined groups
export async function myGroupsServices(id){
    const groups = await prisma.group.findMany({
        where: {
            members: {
                some: {
                    userId: id
                }
            }
        },
        include: {
            members: {
                include: {
                    user: true
                }
            }
        }
    })
    return groups
}
export async function discoverGroupService(userId){
    const groups = await prisma.group.findMany({
        where: {
            AND: [
                {
                    members: {
                        none: {
                            userId: userId
                        }
                    }
                },
                {invitations: {
                    none: {
                        userId: userId
                    }
                }}
            ]
        },
        include: {
            members: {
                include: {
                    user: true
                }
            }
        },
        take: 6
    })
    return groups
}