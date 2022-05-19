export interface IOwner {
  id: string;
  name: string;
  email: string;
  address: string;
  phone_number: string;
  // pets: Array<object>;
  pets: string;
}

export interface IOwnerCreate {
  name: string;
  email: string;
  address: string;
  phone_number: string;
  // pets: Array<object>;
  pets: string;
}

//pets precisa ser passado como array. Estou passando como string no momento
