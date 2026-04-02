import { readingTime } from "reading-time-estimator";

export const getReadingTime = (text) => {
  return readingTime(text, 200).text;
};