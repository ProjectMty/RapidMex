import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '@/components/email/emailDatosContacto';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: Request) {
  try {
    const destinatarios = [
      // "info@rapidmex.com",
      // "issac@cargomty.com"
      "it03@cargomty.com"
    ];
    const body = await req.json();
    const { name, phone, email, subject, message, largo, ancho, alto, peso, cpOrigen, cpDestino } = body;

    if (!name || !email || !message || !phone || !subject || !message || !largo || !ancho || !alto || !peso || !cpOrigen || !cpDestino) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'RapidMex <no-reply@rapidmex.com>',
      to: destinatarios,
      replyTo: email,

      subject: `Nuevo mensaje de contacto de ${name}`,
      react: EmailTemplate({
        name: name,
        phone: phone,
        email: email,
        subject: subject,
        message: message,
        largo: largo,
        ancho: ancho,
        alto: alto,
        peso: peso,
        cpOrigen: cpOrigen,
        cpDestino: cpDestino,

      }),
    });

    return NextResponse.json({ status: 'OK', data });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return NextResponse.json(
      { error: 'Error al enviar correo' },
      { status: 500 }
    );
  }
}
