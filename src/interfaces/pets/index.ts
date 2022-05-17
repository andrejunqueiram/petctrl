export interface IPet {
  id: string;
  owner_id: string;
  name: string;
  birthday: Date;
  breed: string;
  attendance: Array<object>;
  reports: Array<object>;
}

export interface IPetCreate {
    owner_id: string;
    name: string;
    type: string;
    breed: string;
    birthday: Date; 
}
