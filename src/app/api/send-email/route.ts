import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import EmailTemplate from '@/Vista/email/emailDatosContacto';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function GET(){
   try {
        if (!process.env.RESEND_API_KEY) {
            console.error(" Falta RESEND_API_KEY");
            return new Response(JSON.stringify({ error: "Missing API key" }), { status: 500 });
        }

        const { data, error } = await resend.emails.send({
            from: 'RapidMex <no-reply@rapidmex.com>',
            to: ['it03@cargomty.com'],
            subject: 'Cotización Prueba 2',
             html: `
        <div>
          <h2>Formulario de contacto</h2>
          <p><strong>Prueba de envio</strong></p>
        </div>
      `,
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);

    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
export async function POST(req: Request) {
  try {
    const destinatarios = [
      "info@rapidmex.com",
      "issac@cargomty.com"
      // "it03@cargomty.com"
    ];
    const body = await req.json();
    const { name, phone, email, subject, message, largo, ancho, alto, peso, cpOrigen, cpDestino } = body;


    const data = await resend.emails.send({
      from: 'RapidMex <no-reply@rapidmex.com>',
      to: destinatarios,

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
