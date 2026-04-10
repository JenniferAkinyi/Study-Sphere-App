import { logStudyMinutesService, getWeeklyStudyDataService } from "../services/studyServices.js";

export const logStudyMinutes = async (req, res) => {
  try {
    const {userId, minutes } = req.body;

    if (!minutes || minutes <= 0) {
      return res.status(400).json({ message: "Invalid minutes value" });
    }
    const {session, updatedUser} = await logStudyMinutesService(userId, minutes);
    res
      .status(200)
      .json({ message: "Study minutes logged successfully", session, user: updatedUser });
  } catch (error) {
    console.error("Error logging study minutes:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getWeeklyStudyData = async(req, res) => {
    try {
        const {userId} = req.params
        const session = await getWeeklyStudyDataService(userId)
        res.status(200).json(session)
    } catch (error) {
        console.error("Error fetching the data", error)
        res.status(500).json({message: 'Server error'})
    }
}

