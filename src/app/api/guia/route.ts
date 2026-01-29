import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const response = await fetch(
            `https://api-test.envia.com/ship/generate/`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.ENVIA_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok || data.meta === "error" || data.error) {
            return NextResponse.json(
                {
                    success: false,
                    error: data.error
                },
                { status: data.error.code }

            );

        }
        return NextResponse.json(
            {
                success: true,
                guia: data
            },
            { status: 200 }
        );


    }
    catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}