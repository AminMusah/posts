import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AddPost from "./AddPost";
import Loading from "./Loading";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [loading, setLoading] = useState(true);

  //get all posts
  useEffect(() => {
    try {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setPosts(json);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  //delete post
  const handleDelete = (event) => {
    const id = event.target.parentElement.parentElement.firstChild.textContent;

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        const newList = posts.filter((item) => item.id !== parseInt(id));
        setPosts(newList);
        removeItem();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeItem = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Post removed",
    });
  };

  return (
    <div>
      {popUp ? <AddPost popUp={popUp} setPopUp={setPopUp} /> : ""}
      {loading ? (
        <Loading />
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="row">Posts</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a href="#">
                  <h4>id</h4>
                </a>
              </td>
              <td>
                <a href="#">
                  <h4>Title</h4>
                </a>
              </td>
              <td>
                <a href="#">
                  <h4>Content</h4>
                </a>
              </td>
              <td>
                <button onClick={() => setPopUp(!popUp)}>Add post</button>
              </td>
            </tr>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <a href="#">
                    <h4>{post.id}</h4>
                  </a>
                </td>
                <td>
                  <a href="#">
                    <h4>{post.title}</h4>
                  </a>
                </td>
                <td>
                  <a href="#">
                    <h4>{post.body}</h4>
                  </a>
                </td>
                <td>
                  <button onClick={(e) => handleDelete(e)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Posts;
