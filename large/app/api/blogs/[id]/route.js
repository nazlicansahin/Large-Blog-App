import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  const url = `https://blog-app-smoky-six.vercel.app/api/posts/${id}`;

  try {
    const response = await fetch(url, {
      cache: "no-cache",
    });

    let data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error("Failed to fetch data from Airtable");
    }

    return NextResponse.json(data, {
      status: 200,
      cache: "no-cache",
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}



// export async function GET(req, {params}) {
//     const {id} = params;
//     console.log(id)
//     const resp = await fetch(`https://blog-app-smoky-six.vercel.app/api/posts${id}`);
//     const data = await resp.json();
//     console.log(data);
//     return NextResponse.json(data, {cache: "no-store",
//     headers: {
//       "Cache-Control": "no-store",
//     },});
// }