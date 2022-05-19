export interface IService {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface IServiceCreate {
  name: string;
  price: number;
  category: string;
}

export interface IServiceId {
  id: string;
}
