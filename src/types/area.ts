export interface Area {
  id: string;
  building: string;
  location: string;
}

export interface AreaResponse {
  areas: Area[];
}
