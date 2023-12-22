export default function PostCard(props) {

return(
<>
    <div className="flex items-center gap-x-4 text-xs">
      {/* <time dateTime={.datetime} className="text-gray-500">
        {post.date}
      </time> */}
      <a
        href={'blogs/'+ props.address}
        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
      >
        {props.title}
      </a>
    </div>
    <div className="group relative">
      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
        <a href={'blogs/'+ props.address}>
          <span className="absolute inset-0" />
          {props.title}
        </a>
      </h3>
      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{props.desc}</p>
    </div>
    <div className="relative mt-8 flex items-center gap-x-4">
      <img src={props.image} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
      <div className="text-sm leading-6">
        <p className="font-semibold text-gray-900">
          <a href={'blogs/'+ props.address}>
            <span className="absolute inset-0" />
            {props.title}
          </a>
        </p>
        <p className="text-gray-600">{props.title}</p>
      </div>
    </div>
    </>
)
}