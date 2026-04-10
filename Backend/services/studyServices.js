import prisma from "../config/db.js";

export const logStudyMinutesService = async (userId, minutes) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const existing = await prisma.studySession.findUnique({
    where: {
      userId_date: {
        userId,
        date: today,
      },
    },
  });
  let session;
  if (existing) {
    session = await prisma.studySession.update({
      where: { id: existing.id },
      data: {
        minutes: existing.minutes + minutes,
      },
    });
  } else {
    session = await prisma.studySession.create({
      data: {
        userId,
        minutes,
        date: today,
      },
    });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId}
  })
  const lastUpdated = new Date(user.updatedAt);
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const lastUpdatedDate = new Date(lastUpdated);
  lastUpdatedDate.setHours(0, 0, 0, 0);

  let updatedUser;

  if (lastUpdatedDate.getTime() !== todayDate.getTime()) {
    updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        dailyStudyMinutes: minutes,
      },
    });
  } else {
    updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        dailyStudyMinutes: {
          increment: minutes,
        },
      },
    });
  }
  return { session, updatedUser };
};
export const getWeeklyStudyDataService = async (userId) => {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 6);
  const session = await prisma.studySession.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: today,
      },
    },
    select: {
      minutes: true,
      date: true,
    },
  });
  return session;
};
