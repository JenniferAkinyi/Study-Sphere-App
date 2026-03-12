import { useEffect, useState } from "react";

const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        likes: [],
        ...doc.data(),
      }));
      const parents = list.filter((c) => !c.parentId);
      const replies = list.filter((c) => c.parentId);

      const threaded = parents.map((p) => ({
        ...p,
        replies: replies.filter((r) => r.parentId === p.id),
      }));

      setComments(threaded);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  return { comments, loading };
};

export default useComments;
