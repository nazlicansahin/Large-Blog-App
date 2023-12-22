'use client'
import BlogPost from "../components/BlogPost";
import { useState, useEffect } from "react";
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
    const resp = await fetch('https://blog-app-smoky-six.vercel.app/api/posts', {mode: 'no-cors'
  });
    const json = await resp.json();
    setData(json);
    console.log('Veri aldık');
    console.log(json)
  } catch (error) {
    console.error('Veri alınamadı veya işlenirken hata oluştu:', error);
  }
};
//title desc image likeCount authorName publishDate 
useEffect(() => {
  getData();
}, []);

return (
    <div>
        <div className="grid gap-4"> 
            <div className="grid grid-cols-6 gap-6">
                {data.map(post => (
                    <article key={post.id}>
                        <BlogPost  title ={post.title} desc = {post.content} image ={post.image} address={'http://localhost:3000/blogs/'+post.id} />
                    </article>
                ))}
            </div>
        </div>
    </div>
  );

}