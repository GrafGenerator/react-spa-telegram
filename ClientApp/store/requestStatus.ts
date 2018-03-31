export const enum RequestStatus {
  Undefined,
  InProgress,
  Successful,
  Failed
}

export interface IRequestStatus {
  status: RequestStatus,
  error: IRequestError | null
}

export interface IRequestError {
  status: number,
  statusText: string,
  requestModel: any
}

export const requestFailure = (status: number,  statusText: string = "Error occured", model: any = null): IRequestError =>
  ({
    status: status,
    statusText: statusText,
    requestModel: model
  });
