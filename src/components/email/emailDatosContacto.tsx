import { Head, Body, Container, Heading, Html, Img, Preview, Section, Tailwind, Text } from '@react-email/components';

interface EmailProps {
    name?: string;
    phone?: string;
    email?: string;
    subject?: string;
    message?: string;
    largo?: string;
    ancho?: string;
    alto?: string;
    peso?: string;
    cpOrigen?: string;
    cpDestino?: string;
}

const EmailTemplate = ({
    name = '',
    phone = '',
    email = '',
    subject = '',
    message = '',
    largo = '',
    ancho = '',
    alto = '',
    peso = '',
    cpOrigen = '',
    cpDestino = '',

}: EmailProps) => {
    const previewText = `Datos de contacto para cotizacion, de ${name}!`;


    return (
        <Html>
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Head></Head>
                <Body className="bg-[#f5f7fa] text-[#1a1a1a] font-sans py-10">
                    <Container className="bg-white shadow-lg rounded-2xl mx-auto mt-10 mb-10 p-8 max-w-[520px] border border-gray-200">
                        {/* logo */}
                        <Section className=" text-center mb-6">
                            <Img
                                src="https://rapidmex.com/img/logo.svg"
                                width="200"
                                height="60"
                                alt="RapidMex logo"
                                className="my-0 mx-auto"
                            />
                        </Section>

                        <Heading className="text-xl font-bold text-center text-[#0f172a] my-8">
                            Datos de contacto para <span className='text-green-700'>{name}</span>.
                        </Heading>
                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Te compartimos los datos de contacto para una cotización personalizada, mediante{" "}
                            <span className="font-bold text-green-700">RapidMex.com</span>.

                        </Text>
                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Nombre:{" "}
                            <span className="font-bold text-green-700">{name}</span>.
                        </Text>
                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Teléfono:{" "}
                            <span className="font-bold text-green-700">{phone}</span>.
                        </Text>
                           <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Email:{" "}
                            <span className="font-bold text-green-700">{email}</span>.
                        </Text>
                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Asunto:{" "}
                            <span className="font-bold text-green-700">{subject}</span>.
                        </Text>
                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Largo X Ancho X Alto:{" "}
                            <span className="font-bold text-green-700">
                                {largo}cm X {ancho}cm X {alto}cm
                            </span>.

                        </Text>
                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Peso:{" "}
                            <span className="font-bold text-green-700">{peso}</span>.
                        </Text>
                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Codigo Postal Origen:{" "}
                            <span className="font-bold text-green-700">{cpOrigen}</span>.
                        </Text>
                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Codigo Postal Destino:{" "}
                            <span className="font-bold text-green-700">{cpDestino}</span>.
                        </Text>

                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Detalles Extra:{" "}
                            <span className="font-bold text-green-700">{message}</span>.
                        </Text>


                        {/* Footer */}
                        <Text className="text-sm text-gray-500 text-center">
                            Saludos cordiales,
                            <br />
                            <span className="font-semibold text-green-700">El equipo de RapidMex Web</span>
                        </Text>

                        <Text className="text-xs text-gray-400 text-center mt-4">
                            © {new Date().getFullYear()} RapidMex. Todos los derechos reservados.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default EmailTemplate;

