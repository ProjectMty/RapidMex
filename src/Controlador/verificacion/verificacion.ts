
export const nuevoToken = async (idUser: string) => {
    const res = await fetch("/api/newToken",
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: idUser })
        }
    );
    try {
        const data = await res.json();

        return data;
    } catch (error) {
        console.error("El backend no devolvió JSON válido");
    }
}

export const verificarToken = async (token: string, id: string) => {

    try {
        const res = await fetch(`/api/verify?token=${token}&id=${id}`);
        const data = await res.json();
        return data;

    } catch (error) {
        console.error(error);
    }
};

