import { Head, Body, Container, Heading, Html, Img, Preview, Section, Tailwind, Text } from '@react-email/components';

interface EmailProps {
    price?: string;
    token?: string;
}

const EmailUser = ({
    price = '',
    token = '',

}: EmailProps) => {
    const previewText = `Reclama tu premio RapidMex!`;


    return (
        <Html>
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Head></Head>
                <Body className=" text-[#1a1a1a] font-sans py-10">
                    <Container className="bg-white shadow-lg rounded-2xl mx-auto mt-10 mb-10 p-8 max-w-[520px] border border-gray-200 text-center content-center">
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
                            Reclamo de premio <span className='text-green-700'>RapidMex</span>.
                        </Heading>
                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Te compartimos tu clave para reclamar tu premio, mediante{" "}
                            <span className="font-bold text-green-700">RapidMex.com</span>.
                        </Text>

                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Premio:{" "}
                            <span className="font-bold text-green-700">{price}</span>.
                        </Text>
                        <Text className="text-gray-700 text-base leading-relaxed mb-4">
                            Token:{" "}
                            <span className="font-bold text-green-700">{token}</span>.
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

export default EmailUser;

