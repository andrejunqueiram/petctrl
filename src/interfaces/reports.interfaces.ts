export interface IReportCreate {
  reports: string;
  pet_id: string;
}
export interface IReport extends IReportCreate {
  id: string;
}
export interface IReportId {
  id: string;
}
