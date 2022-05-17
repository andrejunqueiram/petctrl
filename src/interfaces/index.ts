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
  type: string;
  breed: string;
  //   attendance: Services[]
  // reports: Reports[]
}

export interface CreateReportValidation {
  pet_id: string;
  report: string;
}

export interface CreateServiceValidation {
  name: string;
  price: number;
  category: string;
}
