import { Envio } from "@/types/Envio";

export const buildRequestBody = (form: Envio, paqueteria: any) => ({
    origin: form.origin,
    destination: form.destination,
    packages: form.packages.map(pkg => ({
        ...pkg,
        dimensions: { ...pkg.dimensions }
    })),
    settings: {
        currency: form.settings.currency,
    },
    shipment: {
        type: form.shipment.type,
        carrier: paqueteria.code === form.destination.country ? paqueteria.name : ""
    },
});
