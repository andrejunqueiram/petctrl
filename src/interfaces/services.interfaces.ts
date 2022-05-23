export interface IServiceCreate {
  name: string;
  price: number;
  category: string;
}

export interface IService extends IServiceCreate {
  id: string;
}

export interface IServiceId {
  id: string;
}
