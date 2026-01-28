import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nombre, telefono, experiencia, atencion, tiempo, nuevamente, envio, comentarios } = body;

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyK3euoLSqmsaCMYUo9Jz_6bYBHzfmUnlEXYnrjCu3xjq6qz8wdGSEkLb5pB7Zse9ih/exec",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombre,
                    telefono: telefono,
                    experiencia: experiencia,
                    atencion: atencion,
                    tiempo: tiempo,
                    nuevamente: nuevamente,
                    envio: envio,
                    comentarios: comentarios
                }),
            }
        );
        return NextResponse.json({ status: 'OK', response })
    } catch (error) {
        console.error('Error al enviar opinion', error);
        return NextResponse.json(
            { error: 'Error al enviar opinión' },
            { status: 500 }
        );
    }
}