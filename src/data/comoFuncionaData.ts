// src/data/comoFuncionaData.ts

export interface PasoItem {
  text: string;
  icon: string;
}

export const pasos: PasoItem[] = [
  {
    text: "Visita nuestra sucursal más cercana a ti.",
    icon: "cf 1.png",
  },
  {
    text: "Elige el plan de envío que más te convenga.Puedes enviar cajas por precio fijo o si tu envio supera las 30lbs, te cotizamos el envio por peso y dimensiones. ",
    icon: "cf 2.png",
  },
  {
    text: "Nosotros empaquetamos, preparamos tu caja y preparamos la guia de envio",
    icon: "cf 3.png",
  },
  {
    text: "Realiza tu pago con Zelle, tarjeta o efectivo.",
    icon: "cf 4.png",
  },
  {
    text: "Te entregamos copia de tu bill of lading y recibo de pago",
    icon: "cf 5.png",
  },
  {
    text: "Rastrea tu envío mientras viaja en FastMex.com/tracking",
    icon: "cf 6.png",
  },
];
