

export const CambioContraseña = async (id: string, password: string, token: string) => {
    const res = await fetch("/api/actualizar?action=contraseña",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id, pass: password, token: token })
        }
    );

    const data = await res.json();
    return {
        ok: res.ok,
        data
    };


}

export const EmailCambioContra = async (correo: string) => {
    const envio = await fetch("/api/actualizar?action=envioCorreo",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo: correo })
        }
    );

    const data = await envio.json();
    return {
        ok: envio.ok,
        data
    };

}
