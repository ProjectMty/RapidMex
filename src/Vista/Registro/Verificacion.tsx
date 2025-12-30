'use client';

import { nuevoToken, verificarToken } from '@/Controlador/verificacion/verificacion';
import React, { useEffect, useState } from 'react';


export default function Verificacion() {
    const [validacionExitosa, setValidacionExitosa] = useState<boolean | null>(null);
    const [mensaje, setMensaje] = useState<string>('');
    const [titulo, setTitulo] = useState<string>('');
    

    useEffect(() => {
        async function validar() {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            const id = urlParams.get('id');

            if (!token || !id) {
                setValidacionExitosa(false);
                setMensaje('Faltan parámetros necesarios (token o id)');
                return;
            }

            const data = await verificarToken(token, id);

            if (data.status === 'success') {
                setValidacionExitosa(true);
                setMensaje(data.message);
                setTitulo('USUARIO VERIFICADO');
            } else {
                setValidacionExitosa(false);
                setMensaje(data.message);
            }
        }
        validar();

    }, []);

    const handleNewToken = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id) {
            setValidacionExitosa(false);
            setMensaje('Faltan parámetros necesarios (token o id)');
            return;
        }
        try {

            const data = await nuevoToken(id);

            if (data.status === 'success') {
                setValidacionExitosa(true);
                setMensaje(data.message);
                setTitulo('TOKEN');
            } else {
                setValidacionExitosa(false);
                setMensaje(data.message);
                setTitulo('REINTENTAR NUEVO TOKEN')
            }
        } catch (error) {
            console.error(error);
            setValidacionExitosa(false);
            setMensaje('Error al generar token');
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
                {validacionExitosa === null ? (
                    <div className="text-gray-500">Verificando...</div> // Mensaje de carga
                ) : validacionExitosa ? (
                    // Vista cuando la verificación es exitosa
                    <>
                        <div className="text-green-500 text-6xl mb-4">✓</div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{titulo}</h1>
                        <p className="text-gray-600">{mensaje}</p>
                        <a
                            href="/login"
                            className="inline-block mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Ir a iniciar sesión
                        </a>
                    </>
                ) : (
                    // Vista cuando la verificación falla
                    <>
                        <div className="text-red-500 text-6xl mb-4">✕

                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Error de verificación</h1>
                        <p className="text-gray-600">{mensaje}</p>
                        <button onClick={handleNewToken}
                            className="text-white rounded-2xl transition hover:bg-red-700 bg-red-500 p-3 mt-3">
                            Reenviar el código de verificación
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}