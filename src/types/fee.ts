export interface BaseFee {
  id: string;
  name: string;
  unit: string;
  amount: number;
  code: string;
}

export type EditFeeValues = OmitFrom<BaseFee, 'code'>;
export type FeeFormValues = OmitFrom<BaseFee, 'id' | 'code'>;
export type CreateFeeValues = FeeFormValues;

export type Fee = BaseFee;

export interface FeeResponse {
  fees: Fee[];
}
