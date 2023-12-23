"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyBlogs() {
  const router = useRouter();

  const [keys, setKeys] = useState([]);
  const [userId, setUserId] = useState("");
  const [blogs, setblogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStory, setNewStory] = useState({ title: "", description: "" });
  const [step, setStep] = useState(1); // To track the step in the modal
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
    setNewStory({ title: "", description: "" }); // Reset the story state
    setStep(1); // Reset to the first step
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextStep = () => {
    if (step < 2) {
      setStep((prevStep) => prevStep + 1);
    } else {
      // Save the new story here
      handleNewStory(newStory);
      closeModal();
      // Reset steps for the next opening
      setStep(1);
    }
  };

  const skipStep = () => {
    if (step === 1) {
      setNewStory((prevStory) => ({ ...prevStory, title: "Untitled Story" }));
    } else if (step === 2) {
      setNewStory((prevStory) => ({
        ...prevStory,
        description: "No description provided.",
      }));
    }
    nextStep();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStory((prevStory) => ({ ...prevStory, [name]: value }));
  };
  const fetchblogs = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(`/api/blogs/me?authorID=${localStorage.getItem("userId")}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json(); // Parse the response as JSON
      setblogs(data); // Update the state with the parsed data
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
    setIsLoading(false); // Stop loading once the data is fetched
  };
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        router.push("/");
      }
      let keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
      }
      setUserId(userId)
      setKeys(keys);
    }
      fetchblogs();
  }, []);

  const handleNewStory = async (newStory) => {
    const response = await fetch("/api/blogs/", {
      method: "POST",
      body: JSON.stringify({
        fields: {
          title: newStory.title ?? "Untitled",
          description: newStory.description ?? "No description provided.",
          text: "# Hello world",
          author: userId,
        },
      }),
    });
    const data = await response.json();
    if (data.error) {
      localStorage.removeItem("userId");
    } else {
      router.push(`/me/${data.id}`);
    }
  };

  const handleEdit = (storyId) => {
    // Logic to edit story with storyId
  };

  const handleDelete = async (storyId) => {
    try {
      const response = await fetch(`/api/blogs/${storyId}`, {
        method: "DELETE",
      });
      setblogs(blogs.filter((item) => item.id !== storyId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-4 border rounded-md"
        >
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              {step === 1 && (
                <>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Title of your story
                  </h3>
                  <div className="mt-2 px-7 py-3">
                    <input
                      name="title"
                      type="text"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      value={newStory.title}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Description of your story
                  </h3>
                  <div className="mt-2 px-7 py-3">
                    <textarea
                      name="description"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      value={newStory.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              <div className="items-center px-4 py-3">
                <button
                  id="cancel-btn"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  id="skip-btn"
                  onClick={skipStep}
                  className="px-4 py-2 mx-3 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500"
                >
                  Skip
                </button>
                <button
                  id="next-btn"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {step === 2 ? "Save" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto p-4">
        <div className="mb-4 flex justify-end">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            New Story
          </button>
        </div>
        {isLoading ? (
          <SkeletonLoader />
        ) : !blogs.length ? (
          <p className="text-gray-600">There are no blogs.</p>
        ) : (
          blogs.map((post) => (
            <Link
              href={`/blogs/${post.id}`}
              key={post.id}
              className="mb-2 p-4 border rounded-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{post.fields.title}</h2>
                <p className="text-gray-600">{post.fields.desc}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/me/${post.id}`}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Edit
                </Link>
                <Link
                  href={""}
                  onClick={() => handleDelete(post.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Delete
                </Link>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
