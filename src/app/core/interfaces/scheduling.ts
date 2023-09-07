export interface IScheduling {
  id: number;
  startDate: Date;
  endDate: Date;
  procedures: string[];
  agreement: string;
  company: string;
}

export interface ICreateScheduleDTO {
  procedureId: number;
  agreementId: number;
  paymentId: number;
  date: string;
  time: string;
  timezone: string;
  reason?: string;
}
