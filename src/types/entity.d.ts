export interface IEntity {
  entityId: number;
  name: string;
  identificationNumber: string;
  expirationDate: string;
  contactName: string;
  contactMail: string;
  logo: string;
}

export interface IEntityResponse {
  code: string;
  message: string;
  type: string;
  data: IEntity;
  traceId: string;
}
