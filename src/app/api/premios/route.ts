import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import EmailPremio from '@/components/email/emailPremioInfo';
import EmailUser from '@/components/email/emailPremioUsuario';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: Request) {
    try {
        const destinatarios = [
              "info+rapidmexRuleta@rapidmex.com",
              "issac+rapidmexRuleta@cargomty.com"
            // "it03+rapidmexRuleta@cargomty.com"
        ];
        const body = await req.json();
        const { name, phone, email, price, place } = body;


        const data = await resend.emails.send({
            from: 'RapidMex <no-reply@rapidmex.com>',
            to: destinatarios,

            subject: `Cupon para ${name}`,
            react: EmailPremio({
                name: name,
                phone: phone,
                email: email,
                price: price,
                place: place
            }),
        });

        const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        const bytes = randomBytes(10);

        const cupon = Array.from(bytes)
            .map(b => caracteres[b % caracteres.length])
            .join('');


        const user = await resend.emails.send({
            from: 'RapidMex <no-reply@rapidmex.com>',
            to: email,
            subject: `Reclama tu premio RapidMex`,
            react: EmailUser({
                price: price,
                token: cupon,
            }),
        });

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzO7ZnbbsgV9htdonI2TQbbZRFDVgFsiR9DWiL2_0zf9F0p5tgi_5ATFCP3TXfDzEXznQ/exec",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: name,
                    correo: email,
                    telefono: phone,
                    premio: price,
                    token: cupon,
                    super: place
                }),
            }
        );

        return NextResponse.json({ status: 'OK', data, user, response });
    } catch (error) {
        console.error('Error al enviar correo:', error);
        return NextResponse.json(
            { error: 'Error al enviar correo' },
            { status: 500 }
        );
    }
}
