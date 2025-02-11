export const FETCH_REQUEST = "FETCH_REQUEST";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

export type ActionTypes =
  | typeof FETCH_REQUEST
  | typeof FETCH_SUCCESS
  | typeof FETCH_FAILURE;
