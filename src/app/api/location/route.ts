
import { NextResponse } from 'next/server';


export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { latitud, longitud, fecha } = body;

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzwJuP4cALcS2YFLBbdopVgdVXSv0PuiFAbf97NGvGvmilQAAf_QD-5jOV2JdUS6-vb/exec",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    latitud,
                    longitud,
                    fecha
                }),
            }
        );

        return NextResponse.json({ ok: true, response })

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { ok: false, error: "Error enviando datos a Google Apps Script" },
            { status: 500 }
        );
    }
}