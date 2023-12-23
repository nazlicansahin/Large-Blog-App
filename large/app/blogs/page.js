"use client";
import { Skeleton } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
export default function Blogs() {
  const [scrollDirection, setScrollDirection] = useState("none");
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [scrollDelayTimer, setScrollDelayTimer] = useState(null);
  const scrollDelayDuration = 200; // Adjust this value as needed
  const [isLoading, setIsLoading] = useState(true);

const router = useRouter();
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setScrollDirection(prevScrollPos > currentScrollPos ? "up" : "down");
    setPrevScrollPos(currentScrollPos);

    clearTimeout(scrollDelayTimer);

    // Set a delay before toggling header visibility
    setScrollDelayTimer(
      setTimeout(() => {
        if (scrollDirection === "down") {
          setHeaderVisible(false);
        } else if (scrollDirection === "up") {
          setHeaderVisible(true);
        }
      }, scrollDelayDuration)
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollDelayTimer);
    };
  }, [prevScrollPos, scrollDirection, scrollDelayTimer]);

  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch("api/blogs", {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await response.json(); // Parse the response as JSON
      setBlogs(data); // Update the state with the parsed data
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setIsLoading(false); // Stop loading once the data is fetched
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
const SkeletonLoader = () => (
    <div className="animate-pulse grid space-y-4  md:w-screen grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col md:flex-row md:w-10/12 items-center p-4 border rounded-md">
          <div className="w-full md:w-1/4 h-32 bg-gray-300 rounded-md"></div>
          <div className="flex-1 space-y-3 px-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="bg-white">
      {
        // <Header isVisible={headerVisible} />
      }
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {isLoading ? (
            <SkeletonLoader />
          ) : !blogs.length ? (
            <p className="text-gray-600">There are no blogs.</p>
          ) : (
            blogs.map((blog) => (
              <article
                key={blog.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <PostCard
                  title={blog.fields.title}
                  desc={blog.fields.desc ?? "No description provided."}
                  image={blog.fields.image.url}
                  address={blog.id}
                  F
                  author={blog.fields.authorName ?? "Author"}
                  tags={blog.fields.tags ?? "#tag"}
                />
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="flex flex-col min-h-screen">
  //     <div className="fixed top-0 left-0 right-0 ">
  //       <Header />
  //     </div>
  //     <article className="mt-32 grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-8">
  //       <div className="h-32 rounded-lg bg-gray-200"></div>
  //       <div className="h-32 rounded-lg bg-gray-200 lg:col-span-3">
  //         <div className="grid grid-cols-1 gap-4  lg:gap-8 sm:grid-cols-3">
  //           {!data
  //             ? "yukleniyor"
  //             : data.map((post) => (
  //                 <article key={post.id}>
  //                   <BlogPost
  //                     title={post.fields.title}
  //                     desc={post.fields.desc}
  //                     image={post.fields.image.url}
  //                     address={post.id}
  //                   />
  //                 </article>
  //               ))}
  //         </div>
  //       </div>
  //       <div className="h-32 rounded-lg bg-gray-200 lg:col-span-1 ">
  //         <div className="flex h-screen flex-col justify-between border-e bg-white">
  //           <div className="px-4 py-6">

  //             <ul className="mt-6 space-y-1">
  //               <li>
  //                 <a
  //                   href=""
  //                   className="block rounded-lg  px-4 py-2 text-sm font-medium text-gray-500"
  //                 >
  //                   Who to follow
  //                 </a>
  //               </li>
  //               <li>
  //                 <a
  //                   href=""
  //                   className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
  //                 >
  //                   Recently Saved
  //                 </a>
  //               </li>
  //             </ul>
  //           </div>

  //           <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
  //             <a
  //               href="#"
  //               className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
  //             >
  //               <img
  //                 alt="Man"
  //                 src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  //                 className="h-10 w-10 rounded-full object-cover"
  //               />

  //               <div>
  //                 <p className="text-xs">
  //                   <strong className="block font-medium">
  //                     Eric Frusciante
  //                   </strong>

  //                   <span> eric@frusciante.com </span>
  //                 </p>
  //               </div>
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </article>
  //     <div className="fixed bottom-0 left-0 right-0">
  //       <Footer />
  //     </div>
  //   </div>
  // );
}
