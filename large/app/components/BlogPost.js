import Image from "next/image"
import Link from "next/link"
const BlogPost = (props) => {

    return (

<article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
  <Image
    alt={props.title}
    src={props.image} width={300} height={300}
    className="h-56 w-full object-cover"
  />

  <div className="p-4 sm:p-6">
    <a href="#">
      <h3 className="text-lg font-medium text-gray-900">
        {props.title}
      </h3>
    </a>

    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
      {props.desc}
    </p>

    <Link href={'blogs/'+ props.address} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
      Read more

      <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
        &rarr;
      </span>
    </Link>
  </div>
</article>
    )
}
export default BlogPost