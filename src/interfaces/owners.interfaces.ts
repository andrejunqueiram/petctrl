export interface IOwner {
  id: string;
  name: string;
  email: string;
  address: string;
  phone_number: string;
}

export interface IOwnerCreate {
  name: string;
  email: string;
  address: string;
  phone_number: string;
}
