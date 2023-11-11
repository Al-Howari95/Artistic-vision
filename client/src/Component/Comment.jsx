import React, { useState, useEffect } from "react";
import axios from "axios";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    // استرجاع البيانات عند تحميل المكون
    axios
      .get("http://localhost:4000/message")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        author: "Your Name", // يمكنك تغيير 'Your Name' إلى اسم المستخدم الفعلي
        date: new Date().toLocaleDateString(),
        content: newComment,
      };

      // إضافة التعليق إلى الخادم
      axios
        .post("http://localhost:4000/message", newCommentObj)
        .then((response) => {
          setComments([...comments, response.data]);
          setNewComment("");
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    }
  };

  const handleEditComment = () => {
    if (selectedComment && editComment.trim() !== "") {
      const updatedComment = {
        ...selectedComment,
        content: editComment,
      };

      // تحديث التعليق في الخادم
      axios
        .put(
          `http://localhost:4000/message/${selectedComment.id}`,
          updatedComment
        )
        .then(() => {
          const updatedComments = comments.map((comment) =>
            comment.id === selectedComment.id ? updatedComment : comment
          );
          setComments(updatedComments);
          setSelectedComment(null);
          setEditComment("");
        })
        .catch((error) => {
          console.error("Error updating comment:", error);
        });
    }
  };

  const handleDeleteComment = (comment) => {
    // حذف التعليق من الخادم
    axios
      .delete(`http://localhost:4000/message/${comment.id}`)
      .then(() => {
        const updatedComments = comments.filter((c) => c.id !== comment.id);
        setComments(updatedComments);
        setSelectedComment(null);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion ({comments.length})
            </h2>
          </div>
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required=""
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={handleAddComment}
              class="bn632-hover bn28"
              id="button"
            >
              Post comment
            </button>
          </form>

          {comments.map((comment) => (
            <article
              key={comment.id}
              className="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedComment(comment)}
                  className="absolute top-1 right-1 text-gray-500 focus:outline-none"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {selectedComment === comment ? (
                  <div>
                    <textarea
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />
                    {/* <button
                      type="button"
                      onClick={handleEditComment}
                      className="text-xs text-primary-700 hover:text-primary-800 cursor-pointer"
                    >
                      Save
                    </button> */}
                    <button
                      type="button"
                      onClick={handleEditComment}
                      class="bn632-hover bn28"
                      id="button"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-700 font-bold">
                      Author: {comment.author}
                    </div>
                    <div className="text-gray-700">Date: {comment.date}</div>
                    {comment.content}
                  </div>
                )}
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  onClick={() => handleDeleteComment(comment)}
                  class="bn632-hover bn28"
                  id="button"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Comment;
