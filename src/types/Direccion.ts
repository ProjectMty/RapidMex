  export interface Direccion {
    additional_info?: {
      street?: string | null;
    };
    coordinates?: {
      latitude?: string;
      longitude?: string;
    };
    country?: {
      name?: string;
      code?: string;
    };
    info?: {
      stat?: string;
      stat_8digit?: string;
      time_zone?: string;
      utc?: string;
    };
    locality?: string;
    regions?: {
      region_1?: string;
      region_2?: string;
      region_3?: string;
      region_4?: string;
    };
    state?: {
      name?: string;
      iso_code?: string;
    };
    suburbs?: string[];
    zip_code?: string;
  }
