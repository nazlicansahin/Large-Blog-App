import BlogPost from "@/app/components/BlogPost";

const personsWithArticles = [
    {
      id: 1,
      name: 'Person 1',
      articles: [
        { id: 101, title: 'Article 1', content: 'Content for Article 1 by Person 1' },
        { id: 102, title: 'Article 2', content: 'Content for Article 2 by Person 1' },
        { id: 103, title: 'Article 3', content: 'Content for Article 3 by Person 1' }
      ]
    },
    {
      id: 2,
      name: 'Person 2',
      articles: [
        { id: 104, title: 'Article 1', content: 'Content for Article 1 by Person 2' },
        { id: 105, title: 'Article 2', content: 'Content for Article 2 by Person 2' },
        { id: 106, title: 'Article 3', content: 'Content for Article 3 by Person 2' }
      ]
    },
    {
      id: 3,
      name: 'Person 3',
      articles: [
        { id: 107, title: 'Article 1', content: 'Content for Article 1 by Person 3' },
        { id: 108, title: 'Article 2', content: 'Content for Article 2 by Person 3' },
        { id: 109, title: 'Article 3', content: 'Content for Article 3 by Person 3' }
      ]
    },
    {
      id: 4,
      name: 'Person 4',
      articles: [
        { id: 110, title: 'Article 1', content: 'Content for Article 1 by Person 4' },
        { id: 111, title: 'Article 2', content: 'Content for Article 2 by Person 4' },
        { id: 112, title: 'Article 3', content: 'Content for Article 3 by Person 4' }
      ]
    },
    {
      id: 5,
      name: 'Person 5',
      articles: [
        { id: 113, title: 'Article 1', content: 'Content for Article 1 by Person 5' },
        { id: 114, title: 'Article 2', content: 'Content for Article 2 by Person 5' },
        { id: 115, title: 'Article 3', content: 'Content for Article 3 by Person 5' }
      ]
    }
  ];


export default function Stories() {
    // function getDataById(id) {
    //     // URL of the API endpoint (replace with your API endpoint)
    //     const apiUrl = `https://your-api-endpoint.com/data/${id}`;
      
    //     return fetch(apiUrl)
    //       .then(response => {
    //         if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //       })
    //       .then(data => {
    //         return data; // Return the fetched data
    //       })
    //       .catch(error => {
    //         console.error('There was a problem fetching data:', error);
    //       });
    //   }
      
    //   // Usage example
    //   getDataById(1)
    //     .then(data => {
    //       console.log(data); // Output the fetched data
    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
      // Sample data collection

  
  // Function to retrieve data based on ID
  function getDataById(id) {
    // Find the object in the data collection that matches the given ID
    const foundItem = personsWithArticles.find(item => item.id === id);
  
    // Check if an item with the provided ID exists
    if (foundItem) {
      return foundItem; // Return the item if found
    } else {
      return 'Data not found'; // Return a message if no item found with the given ID
    }
  }
  

return (
    <div>
        <div className="grid gap-4"> 
            <div className="grid grid-cols-6 gap-6">
                {getDataById(2).articles.map(post => (
                    <article key={post.id}>
                        <BlogPost  title ={post.title} desc = {post.content} />
                    </article>
                ))}
            </div>
        </div>
    </div>
  );


}