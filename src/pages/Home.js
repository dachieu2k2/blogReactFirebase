import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";
const Home = ({ isAuth }) => {
  const [postLists, setPostLists] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [postLists]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };
  // console.log(postLists);
  return (
    <div className="homePage">
      {postLists.map((post) => (
        <div className="post" key={post.id}>
          <div className="postHeader">
            <div className="title">
              <h1>{post.titlePost}</h1>
            </div>
            <div className="deletePost">
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button onClick={() => deletePost(post.id)}>&#128465;</button>
              )}
            </div>
          </div>
          <div className="postTextContainer">{post.contentPost}</div>
          <h3>@{post.author.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Home;
