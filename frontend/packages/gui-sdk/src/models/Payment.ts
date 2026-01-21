export enum PaymentStatus {
  Pending = 'pending',
  Done = 'done',
  Failed = 'failded',
}

export interface Payment {
  personId: string;
  surveyId?: string;
  answerId?: string;
  status?: PaymentStatus;
  billCCode?: string;
  taxCCode?: string;
  taxAmount?: number;
  totalAmount?: number;
  amount?: number;
  invoiceNumber?: string;
  currencyCode?: string;
  dedTAmount?: number;
  invoiceUrl?: string;
  message?: string;
  packageId?: string;
}
