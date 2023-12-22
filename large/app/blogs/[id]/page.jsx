"use client"
import CommentForm from "@/app/components/CommentForm"
import React from 'react';
import { useEffect,useState } from "react";

// export default function Blog({params} ) {
//     const id = params.id
    // return (
    //   <>{id}
    //   <CommentForm />
    //   </>
    // )
  

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
//     }

export default function Blog({params}){
const {id} = params;
  
const [data, setData] = useState();

const getData = async () => {
  try {
    const resp = await fetch(`/api/blogs/${id}`, 
              {cache: "no-cache",
              headers: {"Cache-Control": "no-cache",}});
    const json = await resp.json();
    setData(json);
    console.log('Veri aldık');
    console.log(data)
  } catch (error) {
    console.error('Veri alınamadı veya işlenirken hata oluştu:', error);
  }
};
//title desc image likeCount authorName publishDate 
useEffect(() => {
  getData();
}, []);

return(
  <main>
    { !data ? "yukleniyor" : 
      <>
           <h1>{data.fields.title}</h1>
     <p>{data.fields.text}</p>
      </>

    
     }
  </main>
)

}

