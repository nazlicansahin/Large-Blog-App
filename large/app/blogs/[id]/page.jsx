"use client"
import CommentForm from "@/app/components/CommentForm"

export default function Blog({params} ) {
    const id = params.id
    return (
      <>{id}
      <CommentForm />
      </>
    )
  }

//   async function getBlog(id) {
//     const res = await fetch('http://localhost:3000/blogs/'+id, {
//       next: {
//         revalidate:60
//       }
//     })

//     const json = await res.json();
//     return json;
//   }

// export default async function Blog({params} ) {
//     const blog = await getBlog(params.id);
//     return (
//       <main>
//         <h1>{blog.title}</h1>
//         <p>{blog.content}</p>
//       </main>
//     )
//   }