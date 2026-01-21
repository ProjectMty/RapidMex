import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {

        const response = await fetch(
            `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${process.env.CURRENCY_API_KEY}&symbols=EUR, CAD, MXN`
        )

        if (!response.ok) {
            return NextResponse.json(
                { error: "Api error", status: response.status },
                { status: response.status })
        }
        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}