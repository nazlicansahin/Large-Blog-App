'use client'
import BlogPost from "../components/BlogPost";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
    const resp = await fetch('api/blogs', 
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
//saving data


return (
    <div>
      <div  className= "fixed top-0 left-0 right-0 ">
      <Header  />
      </div>
        <div className="grid grid-cols-3 gap-2 ml-8 flex "> 
            <div className="justify-center grid grid-cols-3 gap-4">
                { !data ?"yukleniyor" : 
                
                data.map(post => (
                    <article key={post.id}>
                        <BlogPost  title ={post.fields.title} desc = {post.fields.desc} image ={post.fields.image.url} address={post.id} />
                    </article>
                ))}
                
            </div>
            <div className="grid grid-cols-6 gap-1">
       </div>
        </div>
        <div  className= "bottom-0 left-0 right-0">

        <Footer />
        </div>
    </div>
  );

}