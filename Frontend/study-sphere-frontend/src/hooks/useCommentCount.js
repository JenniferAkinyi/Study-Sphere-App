import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../backend/firebase";

const useCommentCount = (postId) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!postId) return;

    const ref = collection(db, "posts", postId, "comments");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      setCount(snapshot.size);
    });

    return () => unsubscribe();
  }, [postId]);

  return count;
};

export default useCommentCount;
