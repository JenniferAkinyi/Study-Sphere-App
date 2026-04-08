import prisma from "../config/db.js";

export async function postEssayService(title, content, authorId, groupId) {
  try {
    const isMember = await prisma.groupMember.findFirst({
      where: {
        groupId,
        userId: authorId,
      },
    });

    if (!isMember) {
      throw new Error("You must be a member to post in this group");
    }
    const essay = await prisma.essay.create({
      data: {
        title,
        content,
        authorId,
        groupId,
      },
      include: {
        author: true,
      },
    });
    return essay;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getGroupEssaysService(groupId) {
  const essays = await prisma.essay.findMany({
    where: { groupId },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return essays;
}
export async function updateEssayService(title, content, id) {
  const existingEssay = await prisma.essay.findUnique({
    where: { id },
  });
  if (!existingEssay) {
    throw new Error("Essay not found");
  }
  const update = await prisma.essay.update({
    where: { id },
    data: { title, content },
  });
  return update;
}
export async function fetchEssayById(id) {
  const essay = await prisma.essay.findUnique({
    where: { id },
    include: {
      author: true
    }
  });
  if (!essay) {
    throw new Error("Essay not found");
  }
  return essay;
}
export async function deleteEssayService(id) {
  const existingEssay = await prisma.essay.findUnique({
    where: { id },
  });
  if (!existingEssay) {
    throw new Error("Essay not found");
  }
  const essay = await prisma.essay.delete({
    where: { id },
  });
  return { message: "Essay deleted successfully" };
}
