export interface ICredentials {
  email: string;
  password: string;
}

export interface IAuthCredentials extends ICredentials {
  name: string;
  lastName: string;
}

export interface IUser extends Omit<IAuthCredentials, "password"> {
  id: string;
}

export interface IUpdateCredentials extends Omit<IAuthCredentials, "email"> {}

export type IMessage = {
  authorName: string;
  authorLastName: string;
  authorId: string;
  text: string;
};
