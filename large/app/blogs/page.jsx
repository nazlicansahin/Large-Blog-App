"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
export default function Blogs() {
  // const data = [
  //     {
  //       id: 1,
  //       link: 'https://www.example.com/article1',
  //       title: 'Article 1 Title',
  //       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor...',
  //       image: 'https://picsum.photos/200/300',
  //     },
  //     {
  //       id: 2,
  //       link: 'https://www.example.com/article2',
  //       title: 'Article 2 Title',
  //       content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames...',
  //       image: 'https://picsum.photos/200/301',
  //     },
  //     {
  //       id: 3,
  //       link: 'https://www.example.com/article3',
  //       title: 'Article 3 Title',
  //       content: 'Nulla facilisi. Etiam at libero sed nisi ullamcorper pretium. Maecenas...',
  //       image: 'https://picsum.photos/200/302',
  //     },
  //     // ...and so on for 10 articles
  //     {
  //       id: 10,
  //       link: 'https://www.example.com/article10',
  //       title: 'Article 10 Title',
  //       content: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere...',
  //       image: 'https://picsum.photos/200/309',
  //     },
  //   ];

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const resp = await fetch("api/blogs", {
        cache: "no-cache",
        headers: { "Cache-Control": "no-cache" },
      });
      const json = await resp.json();
      setData(json);
      console.log("Veri aldık");
      console.log(data);
    } catch (error) {
      console.error("Veri alınamadı veya işlenirken hata oluştu:", error);
    }
  };
  //title desc image likeCount authorName publishDate
  useEffect(() => {
    getData();
  }, []);
  //saving data

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="fixed top-0 left-0 right-0  z-40">
        <Header />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {!data
            ? "yukleniyor"
            : data.map((post) => (
                <article
                  key={post.id}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  <PostCard
                    title={post.fields.title}
                    desc={post.fields.desc}
                    image={post.fields.image.url}
                    address={post.id}
                  />
                </article>
              ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <Footer />
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
