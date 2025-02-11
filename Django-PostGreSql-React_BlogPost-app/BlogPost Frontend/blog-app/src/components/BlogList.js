import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "",
  });

  const loggedInUser = 1;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/blog/api/posts/")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleSubmit = () => {
    const postWithAuthor = { ...newPost, author: loggedInUser };
    console.log(postWithAuthor, "test");
    axios
      .post("http://127.0.0.1:8000/blog/api/posts/", postWithAuthor)
      .then((response) => {
        setPosts([...posts, response.data]);
        setNewPost({ title: "", content: "", author: "" });
      })
      .catch((error) => console.error("Error adding post:", error));
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>

      <h2>Add a New Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
          />
        </div>

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default BlogList;
