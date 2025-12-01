export interface Rate {
  carrierId: number;
  carrier: string;
  carrierDescription: string;
  serviceId: number;
  service: string;
  serviceDescription: string;
  dropOff: number;
  zone: number;
  deliveryEstimate: string;
  quantity: number;
  basePrice: number; 
  basePriceTaxes:number;
  extendedFare: number;
  insurance: number;
  additionalServices: number;
  additionalServicesTaxes: number;
  additionalCharges: number;
  additionalChargesTaxes: number;
  importFee: number;
  taxes: number;
  totalPrice: number;
  currency: string;
  deliveryDate: {
    date: string;
    dateDifference: number;
    timeUnit: string;
    time: string;
  };
}

export interface RespuestaAPI {
  meta: string;
  data: Rate[];
}