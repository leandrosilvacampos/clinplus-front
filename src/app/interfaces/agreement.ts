export interface IAgreement {
  id: number;
  name: string;
  discountType: 'absolute' | 'percentage';
  discountValue: number;
}
