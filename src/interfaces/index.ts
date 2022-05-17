export interface CreateUserValidation {
  name: string;
  password: string;
  isAdm: boolean;
}

export interface CreateOwnerValidation {
  name: string;
  email: string;
  address: string;
  phone_number: string;
  // pets: Pets[]
}
