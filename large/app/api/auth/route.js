import { NextResponse } from "next/server";

export async function POST(Request) {
  const request = await Request.json();
  const apiKey = process.env.AIRTABLE_API_KEY;
  const url = `https://api.airtable.com/v0/appiLuHfb6BruKbXQ/tbl9nnaQQHYRL7Ea3?filterByFormula=IF(%7Bfld3bdI4BIClMVzqG%7D%3D+%22${request.email}%22%2C1%2C0)`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Airtable");
    }

    let data = await response.json();
    data = data.records;
    if (data.length > 0) {
      data = data[0];
    } else {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }
    console.log(data);

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
