export interface IUserSession {
  name: string;
  password: string;
}

export interface IUserCreate extends IUserSession {
  isAdm: boolean;
}

export interface IUser extends IUserCreate {
  id: string;
}

export interface IUserID {
  id: string;
}
