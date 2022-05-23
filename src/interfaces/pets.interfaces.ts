export interface IPet {
  id: string;
  owner_id: string;
  name: string;
  birthday: Date;
  breed: string;
  pet_services: Array<object>;
  reports: Array<object>;
}

export interface IPetCreate {
  owner_id: string;
  name: string;
  type: string;
  breed: string;
  birthday: Date;
}

export interface IPetUpdate {
  id: string;
  name: string;
  breed: string;
  birthday: Date;
}
