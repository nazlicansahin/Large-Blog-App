
const BlogPost = (props) => {
const desc = (content) => {
  const description = content.split(' ').slice(0, 20).join(' ');
  return description;
}
    return (

<article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
  <img
    alt={props.title}
    src={props.image}
    className="h-56 w-full object-cover"
  />

  <div className="p-4 sm:p-6">
    <a href="#">
      <h3 className="text-lg font-medium text-gray-900">
        {props.title}
      </h3>
    </a>

    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
      {desc(props.desc)}
    </p>

    <a href={props.address} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
      Read more

      <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
        &rarr;
      </span>
    </a>
  </div>
</article>
    )
}
export default BlogPost