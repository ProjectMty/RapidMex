export interface  typePaqueteria {
    id: number;
    name: string;
    country_code: string;
    "track_url": string;
    "logo": string;
    "box_weight_limit": number;
    "pallet_weight_limit": number;
    "pickup_sameday": number;
    "pickup_start_time": number;
    "pickup_end_time": number;
    "pickup_span_time": number;
    "pickup_sameday_limit_time": number;
};