export const buscarUsuario = async () => {
    try {
        const usuario = await fetch(`/api/obtener?action=usuario`, {
            credentials: "include",
        });
        const data = await usuario.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarDestinatarios = async (idCliente: string) => {
    try {
        const dest = await fetch(`/api/obtener?action=destinatarios&id=${encodeURIComponent(idCliente)}`, {
            credentials: "include",
        });
        const data = await dest.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}