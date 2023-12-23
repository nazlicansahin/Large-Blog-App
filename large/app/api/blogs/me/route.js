import { NextResponse, NextRequest } from "next/server";

export async function GET(NextRequest) {
    let authorID = await NextRequest.url;
    authorID = authorID.split("=")[1];
    console.log(authorID);
    const apiKey = process.env.AIRTABLE_API_KEY;
    //
    const url = `https://api.airtable.com/v0/appiLuHfb6BruKbXQ/tblCI5ex2JEkyknsQ?filterByFormula=IF(AND(%7BauthorID%7D+%3D+%22${authorID}%22%2C+NOT(%7Bstatus%7D+%3D+%22deleted%22))%2C1%2C0)`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Airtable");
    }

    let data = await response.json();
    data = data.records;
    data = data.map((record) => {
      if (record.fields) {
        if (record.fields.image) {
          record.fields.image = record.fields.image[0];
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