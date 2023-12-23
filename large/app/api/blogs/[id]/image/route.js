import { request } from "http";
import { NextResponse } from "next/server";

export async function GET(Request, { params }) {
  const { id } = params;
  return NextResponse.json(id);
}

export async function PUT(Request, { params }) {
  try {
    const { id } = params;
    const formdata = await Request.formData();
    const imageData = await formdata.get("file");

    //const imageData = await Request.blob();
    const tinifyUrl = "https://api.tinify.com/shrink";
    const tinifyResponse = await fetch(tinifyUrl, {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(process.env.TINIFY_API),
        "Content-Type": "multipart/form-data",
      },
      body: imageData,
    });
    const tinifyBody = await tinifyResponse.json();
    // Wait until tinifyBody is ready
    await Promise.resolve(tinifyBody);
    // Continue with the rest of the code
    const airtableUrl =
    process.env.AIRTABLE_HOOK;
    const airtableData = {
        recordID: id,
        url: tinifyBody.output.url,
    };
    
    const airtableResponse = await fetch(airtableUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(airtableData),
    });
    
    const data = await airtableResponse.json();
    // reload page to show new image
    return NextResponse.json(data, {
        status: 200,
        cache: "no-cache",
        headers: {
            "Cache-Control": "no-store",
        },
        });
} catch (error) {
  console.error(error);
  return NextResponse.json({ error: error.message }, { status: 500 });
}
}