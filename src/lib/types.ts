export interface IApiResponse {
  succcess: boolean;
  statusCode: number;
  message: string;
  data: any;
  error: any;
}

export interface INewUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
}
