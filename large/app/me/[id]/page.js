"use client";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; 

export default function MarkdownEditor({ params }) {
  const router = useRouter();
  const { id } = params;
  const [userId, setUser] = useState("");
  const [keys, setKeys] = useState([]);
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("# hello world");
  const [description, setDescription] = useState("");
  const [headerImage, setHeaderImage] = useState(null);
  const [headerImageUrl, setHeaderImageUrl] = useState("");
  const [post, setPost] = useState();
  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputChange = (e) => setMarkdown(e.target.value);

  const handlePublish = async () => {
    if (window.confirm("Are you sure you want to publish this blog post?")) {
      await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          fields: {
            title: title ?? "Untitled",
            text: markdown ?? "# hello world",
            description: description ?? "No description provided.",
            status: "published",
          },
        }),
      });

      // Implement your publishing logic here
    }
  };

  const handleSaveDraft = async () => {
    await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        fields: {
          title: title ?? "Untitled",
          text: markdown ?? "# hello world",
          description: description ?? "No description provided.",
          status: "draft",
        },
      }),
    });

    console.log("Saving draft...");
    // Add your save draft logic here
  };
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
      setTitle(data.fields.title ?? "Untitled");
      setMarkdown(data.fields.text ?? "# hello world");
      setDescription(data.fields.description ?? "No description provided.");
    } catch (error) {
      console.error("Error fetching blogs:", error);
      router.push("/me/blogs");
    }
  };

  const handleImageUpload = (e) => {
    const formData = new FormData();
    formData.append(
      "file",
      document.querySelector('input[type="file"]').files[0]
    );
    fetch(`/api/blogs/${post.id}/image`, {
      method: "PUT",
      body: formData,
    });
  };
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        router.push("/");
      } else setUser(userId);
      let keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
        setKeys(keys);
      }
      fetchPost();
    }
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2  space-y-4">
          <div className="flex gap-5 justify-center items-center w-full">
            <label className=" w-2/3 gap-1 flex">
              <input
                type="file"
                name="file"
                accept="image/*"
                className="block w-1/2  w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                "
              />
              <button
                className="px-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={handleImageUpload}
              >
                Upload
              </button>
            </label>
            <div className=" w-1/3 ">
              <div className="relative min-w-full inline-block text-left">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="px-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Options
                </button>
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  >
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        onClick={handlePublish}
                      >
                        Publish Blog
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                        onClick={handleSaveDraft}
                      >
                        Save as Draft
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!post ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <input
                type="text"
                value={title}
                placeholder="Title of your blog post"
                onChange={handleTitleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="text"
                value={description}
                placeholder="Description of your blog post"
                onChange={handleDescriptionChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />

              <textarea
                placeholder="Write your markdown content here..."
                value={markdown}
                onChange={handleInputChange}
                className="w-full h-96 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                style={{ minHeight: "50vh" }}
              />
            </>
          )}
        </div>
        <div className="lg:col-span-1 flex-col prose space-y-4 ">
          <div className="preview markdown sticky top-8 bg-white border rounded-lg shadow-sm p-4 overflow-auto h-full">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}