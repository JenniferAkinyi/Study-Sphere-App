import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import { db } from '../../../../../backend/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const PostFeed = () => {
  const [posts, setPosts] = useState([])
  useEffect(() =>{
    const postsRef = collection(db, 'posts')
    const q = query(postsRef, orderBy('createdAt', 'desc'))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedPosts = []
      snapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data()})
      })
      setPosts(fetchedPosts)
    })
    return () => unsubscribe()
  }, [])
  return (
    <div className="flex-col items-center">
      {posts.length === 0 ? (
        <p className='text-center text-gray-500'>No posts yet</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post}/>)
      )}
    </div>
  );
};

export default PostFeed;
