import React, { useState } from "react";
import { MdClose, MdImage, MdLink } from "react-icons/md";
import Avatar from "../Authentication/Avatar";
import { useUser } from "../../context/userContext";
import { db } from "../../../../backend/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PostModal = ({ onClose }) => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [postLink, setPostLink] = useState("");
  const { userData } = useUser();
  const [loading, setLoading] = useState(false);
  const storage = getStorage();
  const [error, setError] = useState("")

  const handlePost = async () => {
    if (!postText.trim() && !postImage && !postLink){
        setError("Post cannot be empty")
        return
    } 
    setLoading(true);

    try {
      let imageUrl = "";
      if (postImage) {
        const imageRef = ref(storage, `posts/${Date.now()}_${postImage.name}`);
        await uploadBytes(imageRef, postImage);
        imageUrl = await getDownloadURL(imageRef);
      }
      await addDoc(collection(db, "posts"), {
        uid: userData.uid,
        content: postText,
        username: userData?.username || "Guest User",
        profileImage: userData?.profileImage || "",
        likes: [],
        shares: 0,
        image: imageUrl || "",
        link: postLink || "",
        createdAt: serverTimestamp(),
      });
      setPostText("");
      setPostImage(null);
      setPostLink("");
      onClose();
    } catch (error) {
      setError("Failed to post.")
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-lg p-5 bg-white border border-gray-300 rounded-2xl">
        <button
          className="absolute text-gray-600 top-3 right-3 hover:text-gray-900"
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <Avatar
            username={userData?.username || "Guest user"}
            profileImage={userData?.profileImage}
            size={32}
          />
          <h3 className="font-semibold text-gray-800">
            {userData?.username || "Guest user"}
          </h3>
        </div>
        <textarea
          className="w-full min-h-[120px] resize-none border-none focus:outline-none text-gray-700"
          placeholder="Share your thoughts"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
        <input
          type="url"
          placeholder="Add a link (optional)"
          value={postLink}
          onChange={(e) => setPostLink(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded-md"
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-3 text-gray-600">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="post-image"
              onChange={(e) => setPostImage(e.target.files[0])}
            />
            <button
              className="hover:text-indigo-600"
              onClick={() => document.getElementById("post-image").click()}
            >
              <MdImage size={22} />
            </button>
            {postImage && (
              <img
                src={URL.createObjectURL(postImage)}
                alt="Preview"
                className="mt-2 rounded-lg max-h-60"
              />
            )}
          </div>
          <button
            onClick={handlePost}
            disabled={loading}
            className="px-5 text-white bg-indigo-600 py-1.5 rounded-full font-medium hover:bg-indigo-700 transition"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
