import { NextResponse } from "next/server";

export async function GET(Request) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const url = "https://api.airtable.com/v0/appiLuHfb6BruKbXQ/tblCI5ex2JEkyknsQ";
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let data = await response.json();
    data = data.records;
    data = data.map((record) => {
      if (record.fields) {
        if (record.fields.image) {
          record.fields.image = record.fields.image[0];
        } else {
          record.fields.image = {
            url: "https://via.placeholder.com/150",
          };
        }
      }
      return record;
    });

    return NextResponse.json(data, {
      status: 200,
      cache: "no-store",
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

export async function POST(Request) {
  let data = null;
  try {
    data = await Request.json();
  } catch (error) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }
  if (!data.fields) {
    return NextResponse.json({ error: "No fields provided" }, { status: 400 });
  } else if (!data.fields?.author) {
    console.log("author is defined");
    return NextResponse.json(
      { error: "Unauthorized request" },
      { status: 400 }
    );
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const url = `https://api.airtable.com/v0/appiLuHfb6BruKbXQ/tblCI5ex2JEkyknsQ/`;
  const body = {
    fields: {
      description: data.fields.description ?? "",
      title: data.fields.title ?? "new draft",
      text: data.fields.text ?? "",
      status: "draft",
      author: [data.fields.author],
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Airtable");
    }

    let responseData = await response.json();

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}