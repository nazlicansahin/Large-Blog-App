"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { marked } from "marked";

const PostPage = ({ params }) => {
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };
  const { id } = params;
  const [post, setPost] = useState();

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json(); // Parse the response as JSON
      setPost(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="container mx-auto">
      {post && (
        <div className="prose lg:prose-xl mx-auto">
          <h1 className="text-2xl font-bold">{post.fields.title}</h1>
          <Image
            src={post.fields.image.url}
            alt={post.fields.title}
            width={500}
            height={300}
          />
          <div
          className="markdown mt-4"
            dangerouslySetInnerHTML={createMarkup(marked(post.fields.text))}
          />
          <div className="flex justify-between mt-4">
            <span className="text-gray-500">
              Likes: {post.fields.likeCount}
            </span>
            <span className="text-gray-500">Comments:</span>
          </div>
          <div className="mt-4">{/* Comment section */}</div>
        </div>
      )}
    </div>
  );
};

export default PostPage;