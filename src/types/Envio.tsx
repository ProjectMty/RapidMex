export interface Envio {

    origin: {
        number: string;
        postalCode: string;
        type: string;
        street: string;
        district: string;
        city: string;
        state: string;
        references: string;
        name: string;
        company: string;
        email: string;
        phone: string;
        country: string;
        phone_code: string;
        address_id: number;
        category: number;
    };

    destination: {
        number: string;
        postalCode: string;
        type: string;
        street: string;
        district: string;
        city: string;
        state: string;
        reference: string;
        name: string;
        company: string;
        email: string;
        phone: string;
        country: string;
        phone_code: string;
        address_id: number;
        identificationNumber: string;
        category: number;
    };

    packages:
    {
        type: string;
        content: string;
        amount: number;
        name: string;
        declaredValue: number;
        lengthUnit: string;
        weightUnit: string;
        weight: number;
        dimensions: {
            length: number;
            width: number;
            height: number;
        }
    }[];

    settings: {
        currency: string;
    };

    shipment: {
        type: number;
        carrier: string;
    };

}