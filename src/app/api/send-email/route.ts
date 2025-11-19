import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: Request) {
  try {
    const destinatarios = [
      // "info@rapidmex.com",
      // "issac@cargomty.com"
      "it03@cargomty.com"
    ];
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
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
      html: `
        <div>
          <h2>Formulario de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong><br>${message.replace(/\n/g, '<br/>')}</p>
        </div>
      `,
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
