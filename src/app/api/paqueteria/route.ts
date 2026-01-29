import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country_code") ?? "MX";

    const response = await fetch(
      `https://queries-test.envia.com/carrier?country_code=${country}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ENVIA_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "API error", status: response.status },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
