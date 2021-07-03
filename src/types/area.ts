export interface Area {
  id: string;
  building: string;
  location: string;
}

export interface AreaResponse {
  areas: Area[];
}

export type EditAreaValues = Area;
export type AreaFormValues = OmitFrom<Area, 'id'>;
export type CreateAreaValues = AreaFormValues;
