
export default function Reenvio() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">

                <div className="text-red-500 text-6xl mb-4">
                    ✕
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Error de verificación
                </h1>

                <p className="text-gray-600">
                    El enlace es inválido o ya fue utilizado.
                </p>

                <a
                    href="/login"
                    className="inline-block mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Reenviar Codigo
                </a>

            </div>
        </div>
    )
}