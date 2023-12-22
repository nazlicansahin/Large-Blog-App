import { NextResponse } from "next/server";

export async function GET() {
    const resp = await fetch('https://blog-app-smoky-six.vercel.app/api/posts');
    const data = await resp.json();
    console.log(data);
    return NextResponse.json(data, {cache: "no-store",
    headers: {
      "Cache-Control": "no-store",
    },});
}