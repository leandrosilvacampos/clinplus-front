export interface IScheduling {
  id: number | string;
  startDate: string;
  endDate: string;
  status: string;
  procedures: string[];
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
