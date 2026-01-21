import Image from "next/image"

export default function Pagos() {
    return (
        <section className="bg-[#127704] h-screen w-screen">
            <div className="bg-white h-30 flex justify-start px-24 ">
                <Image
                    width={300}
                    height={300}
                    alt="logo"
                    src={"/favicon.svg"} />
            </div>
            <div className="grid grid-cols-3 px-24 py-20 gap-30">
                <div className="col-span-2 bg-white px-22 py-16 grid gap-y-10 rounded-2xl shadow-xl/30 ">
                    <h1 className="text-[30px] font-black">Forma de Pago</h1>
                    <div className="bg-[#EEEEEE] py-8 rounded-md border-1 border-[#9F9F9F] px-10 flex ">
                        <button className="h-6 w-6 bg-[#127704] rounded-full"></button>
                        <p className="text-[18px] font-medium px-5">Tarjeta de credito (ejemplo)</p>
                    </div>
                    <div className="bg-[#EEEEEE] py-8 rounded-md border-1 border-[#9F9F9F] px-10 flex ">
                        <button className="h-6 w-6 bg-[#127704] rounded-full"></button>
                        <p className="text-[18px] font-medium px-5">Shopify (ejemplo)</p>
                    </div>
                    <div className="bg-[#EEEEEE] py-8 rounded-md border-1 border-[#9F9F9F] px-10 flex ">
                        <button className="h-6 w-6 bg-[#127704] rounded-full"></button>
                        <p className="text-[18px] font-medium px-5">Pago en efectivo (ejemplo)</p>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-[#136808] w-60 h-12 rounded-md text-white text-2xl font-bold ">Pagar</button>
                    </div>

                </div>
                <div className="bg-white px-16 py-16 grid gap-y-10 rounded-2xl shadow-xl/30">
                    <h1 className="text-[30px] font-black">Información de paquete</h1>
                    <div>
                        <p className="text-[20px] font-black"> Origen</p>
                        <div className="px-5">
                            <p>Información personal</p>
                            <p>Dirección origen</p>

                        </div>
                    </div>
                    <div>
                        <p className="text-[20px] font-black"> Destino</p>
                        <div className="px-5">
                            <p>Información personal</p>
                            <p>Dirección origen</p>

                        </div>
                    </div>
                    <div>
                        <p className="text-[20px] font-black"> Paquete</p>
                        <div className="px-5">
                            <p>Contenedor</p>
                            <p>Cantidad</p>
                            <p>Contenido</p>
                            <p>Medidas</p>
                            <p>Valor</p>

                        </div>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-[25px] font-black">Total:</h1>
                        <h1 className="text-[40px] font-black">$100.00 USD</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}