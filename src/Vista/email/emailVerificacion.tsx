import { Head, Body, Container, Heading, Html, Img, Preview, Section, Tailwind, Text } from '@react-email/components';

interface EmailProps {
    url?: string;
}

const EmailTemplate = ({
    url = ''
}: EmailProps) => {
    const previewText = `Verificación de cuenta RapidMex`;

    return (
        <Html>
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Head></Head>
                <Body className=" text-[#1a1a1a] font-sans py-10">
                    <Container className="bg-white shadow-lg rounded-2xl mx-auto mt-10 mb-10 p-8 max-w-[520px] border border-gray-200 text-center">
                        {/* logo */}
                        <Section className=" mb-6">
                            <Img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFtuk5cGqQh4QwmBIdrAWyg9OHlOOO5YyAmw&s"
                                width="200"
                                height="200"
                                alt="RapidMex logo"
                                className="my-0 mx-auto"
                            />
                        </Section>

                        <Heading className="text-[45px] font-bold text-center text-[#0f172a] my-8">
                           ¡Gracias por registrarte!
                        </Heading>
                        <Text className="text-gray-700 text-base leading-relaxed mb-4 text-center">
                            Para completar el proceso de registro y verificar tu cuenta, por favor haz clic en el siguiente enlace: 
                            <span className="font-bold text-green-700"> <a href={url}>Enlace</a></span>.
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

