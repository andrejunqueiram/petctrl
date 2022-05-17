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

export interface CreatePetValidation {
  owner_id: string;
  name: string;
  birthday: Date;
  //   attendance: Services[]
  // reports: Reports[]
}
