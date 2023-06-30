import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddPost = ({ popUp, setPopUp }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //add new posts
  const addPost = (e) => {
    e.preventDefault();
    try {
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: content,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setContent("");
          setTitle("");
          alert();
          console.log(json);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const alert = () => {
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
      title: "Added Post Successfully",
    });
  };

  return (
    <section className={popUp ? "pop-up" : ""}>
      <div className="close" onClick={() => setPopUp(!popUp)}>
        x
      </div>
      <section className="add" id="posting">
        <form className="add-form" onSubmit={addPost}>
          <div className="input-wrapper">
            <input
              type="text"
              value={title}
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <textarea
              value={content}
              placeholder="content..."
              style={{ height: "200px" }}
              required
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <button className="btn btn-secondary add-button">
            <span className="span">Add post</span>
          </button>
        </form>
      </section>
    </section>
  );
};

export default AddPost;
