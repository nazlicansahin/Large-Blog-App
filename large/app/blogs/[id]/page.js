"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

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
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
      <div className="h-32 rounded-lg bg-white"></div>
      <div className="h-32 rounded-lg bg-white col-span-2">
        <div className="container mx-auto">
          {post && (
            <div className="prose lg:prose-l mx-auto">
              <Image
                src={post.fields.image.url}
                alt={post.fields.title}
                width={300}
                height={300}
              />
              <h1 className="text-3xl font-bold">{post.fields.title}</h1>
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
      </div>
      <div className="h-32 rounded-lg bg-white"></div>

    </div>
    </>
  );
};

export default PostPage;
