import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE } from "./actionTypes";

export interface FetchRequestAction {
  type: typeof FETCH_REQUEST;
}

export interface FetchSuccessAction {
  type: typeof FETCH_SUCCESS;
  payload: any; 
}

export interface FetchFailureAction {
  type: typeof FETCH_FAILURE;
  error: string;
}

export type PostActions = FetchRequestAction | FetchSuccessAction | FetchFailureAction;

export const fetchRequest = (): FetchRequestAction => ({
  type: FETCH_REQUEST,
});

export const fetchSuccess = (payload: any): FetchSuccessAction => ({
  type: FETCH_SUCCESS,
  payload,
});

export const fetchError = (error: string): FetchFailureAction => ({
  type: FETCH_FAILURE,
  error,
});
