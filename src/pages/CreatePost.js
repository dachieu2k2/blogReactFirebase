import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  let Navigate = useNavigate();

  const [newPost, setNewPost] = useState({
    titlePost: "",
    contentPost: "",
  });
  const { titlePost, contentPost } = newPost;

  const onChangeInput = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };
  const postsCollectionRef = collection(db, "posts");
  const createPost = async () => {
    if (titlePost !== "" && contentPost !== "") {
      await addDoc(postsCollectionRef, {
        ...newPost,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      console.log(newPost);

      setNewPost({
        titlePost: "",
        contentPost: "",
      });
      Navigate("/");
    }
  };

  useEffect(() => {
    if (!isAuth) {
      Navigate("/login");
    }
  }, [isAuth]);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label>Title: </label>
          <input
            type="text"
            placeholder="Title..."
            name="titlePost"
            value={titlePost}
            onChange={onChangeInput}
          />
        </div>
        <div className="inputGp">
          <label>Post: </label>
          <textarea
            type="text"
            placeholder="Post..."
            name="contentPost"
            value={contentPost}
            onChange={onChangeInput}
          />
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
