export interface Position {
  id: string;
  name: string;
  department_id: string;
}

export interface PositionResponseData {
  positions: Position[];
}
