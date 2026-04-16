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
      author: true,
    },
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
export async function essayLikeService(userId, essayId) {
  const existingEssay = await prisma.essayLike.findUnique({
    where: {
      essayId_userId: {
        userId,
        essayId,
      },
    },
  });
  if (existingEssay) {
    await prisma.essayLike.delete({
      where: { id: existingEssay.id },
    });
    return { liked: false };
  }
  await prisma.essayLike.create({
    data: {
      userId,
      essayId,
    },
  });
  return { liked: true };
}
export async function essayBookmarkService(userId, essayId) {
  const existingEssay = await prisma.bookmark.findUnique({
    where: {
      userId_essayId: {
        userId,
        essayId,
      },
    },
  });
  if (existingEssay) {
    await prisma.bookmark.delete({
      where: { id: existingEssay.id },
    });
    return { bookmarked: false };
  }
  await prisma.bookmark.create({
    data: {
      userId, essayId
    }
  })
  return { bookmarked: true}
}
export const getEssayEngagementService = async (userId, essayId) => {
  const essay = await prisma.essay.findUnique({
    where: { id: essayId },
    include: {
      likes: true,
      bookmarks: true,
      _count: {
        select: {
          likes: true,
          bookmarks: true,
        },
      },
    },
  });

  const liked = essay.likes.some((l) => l.userId === userId);
  const bookmarked = essay.bookmarks.some((b) => b.userId === userId);

  return {
    liked,
    bookmarked,
    likesCount: essay._count.likes,
    bookmarksCount: essay._count.bookmarks,
  };
};