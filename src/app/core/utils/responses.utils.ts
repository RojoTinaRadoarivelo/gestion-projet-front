export interface reponsesDTO<T> {
  statusCode: number;
  message: string;
  data?: T | null;
}
