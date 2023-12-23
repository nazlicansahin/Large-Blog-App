import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { cache } from "react";

export async function GET(req, { params }) {
  const { id } = params;
  const apiKey = process.env.AIRTABLE_API_KEY;
  const url = `https://api.airtable.com/v0/appiLuHfb6BruKbXQ/tblCI5ex2JEkyknsQ/${id}`;

  try {
    const response = await fetch(
      url,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
      {
        status: 200,
        cache: "no-cache",
        next: { revalidate: 60, fetchCache: "force-no-store" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from Airtable");
    }

    let data = await response.json();
    if (data.fields?.image) {
      data.fields.image = data.fields.image[0];
    } else {
      data.fields.image = {
        url: "https://via.placeholder.com/150",
      };
    }
    if (data.fields?.author) {
      data.fields.author = data.fields.author[0];
    }

    return NextResponse.json(data, {
      status: 200,
      cache: "no-cache",
      next: { revalidate: 60 },
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(Request, { params }) {
  const data = await Request.json();
  const { id } = params;
  if (!data) {
    return NextResponse.error("No data provided", { status: 400 });
  }
  if (!data.fields) {
    return NextResponse.error("No fields provided", { status: 400 });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const url = `https://api.airtable.com/v0/appiLuHfb6BruKbXQ/tblCI5ex2JEkyknsQ/`;

  const body = {
    records: [
      {
        id: id,
        fields: {
          description: data.fields.description ?? "",
          title: data.fields.title ?? "new draft",
          text: data.fields.text ?? "",
          status: data.fields.status ?? "draft",
        },
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json", // Fix: Use "Content-Type" instead of "ContentType"
      },
      body: JSON.stringify(body), // Fix: Convert body to JSON string
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Airtable");
    }

    let data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const apiKey = process.env.AIRTABLE_API_KEY;
  const url = `https://api.airtable.com/v0/appiLuHfb6BruKbXQ/tblCI5ex2JEkyknsQ/`;

  const body = {
    records: [
      {
        id: id,
        fields: {
          status: "deleted",
        },
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json", // Fix: Use "Content-Type" instead of "ContentType"
      },
      body: JSON.stringify(body), // Fix: Convert body to JSON string
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Airtable");
    }

    let data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}