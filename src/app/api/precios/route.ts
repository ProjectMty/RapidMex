import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {  // ORIGIN
            OrNumber,
            OrPostalCode,
            OrType,
            OrStreet,
            OrDistrict,
            OrCity,
            OrState,
            OrReference,
            OrName,
            OrCompany,
            OrEmail,
            OrPhone,
            OrCountry,
            OrPhoneCode,
            OrAddressId,
            OrCategory,
            // DESTINATION
            DeNumber,
            DePostalCode,
            DeType,
            DeStreet,
            DeDistrict,
            DeCity,
            DeState,
            DeReference,
            DeName,
            DeCompany,
            DeEmail,
            DePhone,
            DeCountry,
            DePhoneCode,
            DeAddressId,
            DeIfentificationNumber,
            DeCategory,
            // PACKAGES
            PaType,
            PaContent,
            PaAmount,
            PaName,
            PaDeclaredValue,
            PaLengthUnit,
            PaWeightUnit,
            PaWeight,
            PaLenght,
            PaWidth,
            PaHeight,
            Currency,
            ShType,
            ShCarrier } = body;

        const response = await fetch(
            `https://api-test.envia.com/ship/rate/`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.ENVIA_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: "API error", status: response.status },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    }
    catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}